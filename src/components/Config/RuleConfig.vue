<template>
  <div>
    <el-form-item label="操作属性">
      <el-checkbox
        v-model="selectWidget.options.disabled"
        v-if="Object.keys(selectWidget.options).indexOf('disabled')>=0"
      >禁用</el-checkbox>
    </el-form-item>
    <el-form-item label="校验">
      <div v-if="Object.keys(selectWidget.options).indexOf('required')>=0">
        <el-checkbox v-model="selectWidget.options.required">必填</el-checkbox>
      </div>
      <!-- <el-select
        v-if="Object.keys(selectWidget.options).indexOf('dataType')>=0"
        v-model="selectWidget.options.dataType"
        size="mini"
      >
        <el-option value="string" label="字符串"></el-option>
        <el-option value="number" label="数字"></el-option>
        <el-option value="boolean" label="布尔值"></el-option>
        <el-option value="integer" label="整数"></el-option>
        <el-option value="float" label="浮点数"></el-option>
        <el-option value="url" label="URL地址"></el-option>
        <el-option value="email" label="邮箱地址"></el-option>
        <el-option value="hex" label="十六进制"></el-option>
      </el-select> -->

      <div v-if="Object.keys(selectWidget.options).indexOf('pattern')>=0">
        <el-input
          size="mini"
          v-model.lazy="selectWidget.options.pattern"
          style=" width: 240px;"
          placeholder="填写正则表达式"
        ></el-input>
      </div>
    </el-form-item>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null,
      },
    };
  },
  created() {},
  methods: {
    validateRequired(val) {
      if (val) {
        this.validator.required = {
          required: true,
          message: `${this.selectWidget.name}是必须的`,
        };
      } else {
        this.validator.required = null;
      }
      this.$nextTick(() => {
        this.generateRule();
      });
    },
    validateDataType(val) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.type = { type: val, message: this.selectWidget.name+'必须是'+this.selectWidget.options.dataType+'类型'};
      } else {
        this.validator.type = null;
      }

      this.generateRule();
    },
    valiatePattern(val) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.pattern = {
          pattern: val,
          message: this.selectWidget.name,
        };
      } else {
        this.validator.pattern = null;
      }

      this.generateRule();
    },
    generateRule() {
      this.selectWidget.rules = [];
      Object.keys(this.validator).forEach((key) => {
        if (this.validator[key]) {
          this.selectWidget.rules.push(this.validator[key]);
        }
      });
    },
  },
  //通过计算属性监听store中selectWidget的变化
  computed: {
    selectWidgetWatch() {
      return this.$store.state.selectWidget;
    },
  },

  watch: {
    selectWidgetWatch(val) {
      this.selectWidget = val;
    },
    'selectWidget.options.required': function(val) {
      this.validateRequired(val)
    },
    'selectWidget.options.dataType': function (val) {
      this.validateDataType(val)
    },
    'selectWidget.options.pattern': function (val) {
      this.valiatePattern(val)
    },
    'selectWidget.name': function (val) {
      if (this.selectWidget.options) {
        this.validateRequired(this.selectWidget.options.required)
        // this.validateDataType(this.selectWidget.options.dataType)
        this.valiatePattern(this.selectWidget.options.pattern)
      }
    }
  },
};
</script>