<template>
  <el-form-item
    class="widget-view"
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
    :label="locName"
    :label-width="contentStyle"
    @click.native.stop="handleSelectWidget(index)"
  >
    <template v-if="element.type == 'input'">
      <el-input
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
      ></el-input>
    </template>

    <template v-if="element.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
        :placeholder="element.options.placeholder"
      ></el-input>
    </template>

    <template v-if="element.type == 'number'">
      <el-input-number
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :controls-position="element.options.controlsPosition"
        :style="{width: element.options.width}"
      ></el-input-number>
    </template>

    <template v-if="element.type == 'radio'">
      <el-radio-group
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-radio
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item.value + index"
        >{{element.options.showLabel ? item.label : item.value}}</el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type == 'checkbox'">
      <el-checkbox-group
        v-model="element.options.defaultValue"
        :style="{width: element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-checkbox
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item.value + index"
        >{{element.options.showLabel ? item.label : item.value}}</el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="element.type == 'time'">
      <el-time-picker
        v-model="element.options.defaultValue"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :arrowControl="element.options.arrowControl"
        :style="{width: element.options.width}"
      ></el-time-picker>
    </template>

    <template v-if="element.type == 'date'">
      <el-date-picker
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{width: element.options.width}"
      ></el-date-picker>
    </template>

    <template v-if="element.type == 'rate'">
      <el-rate
        v-model="element.options.defaultValue"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :allow-half="element.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="element.type == 'color'">
      <el-color-picker
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-alpha="element.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="element.type == 'select'">
      <el-select
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="element.options.multiple"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :filterable="element.options.filterable"
        :style="{width: element.options.width}"
      >
        <el-option
          v-for="item in element.options.options"
          :key="item.value"
          :value="item.value"
          :label="element.options.showLabel?item.label:item.value"
        ></el-option>
      </el-select>
    </template>

    <template v-if="element.type=='switch'">
      <el-switch v-model="element.options.defaultValue" :disabled="element.options.disabled"></el-switch>
    </template>

    <template v-if="element.type=='slider'">
      <el-slider
        v-model="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :step="element.options.step"
        :show-input="element.options.showInput"
        :range="element.options.range"
        :style="{width: element.options.width}"
      ></el-slider>
    </template>

    <template v-if="element.type=='imgupload'">
      <el-upload
        :action="element.options.action"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="element.options.dialogVisible">
        <img width="100%" :src="element.options.dialogImageUrl" alt />
      </el-dialog>
      <!-- <fm-upload
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :style="{'width': element.options.width}"
        :width="element.options.size.width"
        :height="element.options.size.height"
        token="xxx"
        domain="xxx"
      ></fm-upload>-->
    </template>

    <template v-if="element.type == 'cascader'">
      <el-cascader
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: element.options.width}"
        :options="element.options.remoteOptions"
      ></el-cascader>
    </template>

    <template v-if="element.type == 'editor'">
      <vue-editor v-model="element.options.defaultValue" :style="{width: element.options.width}"></vue-editor>
    </template>

    <template v-if="element.type == 'text'">
      <span>{{element.options.defaultValue}}</span>
    </template>

    <div class="widget-view-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-clone" @click.stop="handleWidgetClone(index)"></i>
      <i class="iconfont icon-jx-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-drag drag-widget"></i>
    </div>

    <template v-if="element.type == 'table'">
      <el-table style="width: 100%">
        <el-table-column type="index"></el-table-column>
      </el-table>
    </template>

    <template v-if="element.type == 'html'">
      <div v-html="element.options.defaultValue"></div>
    </template>
    <template v-if="element.type == 'line'">
      <el-divider :content-position="element.options.justify">{{element.options.defaultValue}}</el-divider>
    </template>
    <template v-if="element.type == 'file'">
      <el-upload
        class="upload-demo"
        :action="element.options.action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </template>
  </el-form-item>
</template>

  </el-form-item>
</template>

<script>
export default {
  props: ["data", "index", "element", "showLabel"],
  components: {},
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
      locName: this.element.name,
      contentStyle: "100px",
    };
  },
  created() {
    if (this.element.options.hideLabel) {
      this.element.name = "";
      this.contentStyle = "0px";
    }
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {},
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleWidgetClone(index) {
      let cloneData = {
        ...this.data[index],
        options: { ...this.data[index].options },
        key: Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999),
      };

      if (
        this.data[index].type === "radio" ||
        this.data[index].type === "checkbox" ||
        this.data[index].type === "select"
      ) {
        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map((item) => ({ ...item })),
          },
        };
      }

      this.data.splice(index, 0, cloneData);

      this.$nextTick(() => {
        this.selectWidget = this.commonApi.selectWidgetModify(
          this,
          index + 1,
          this.data
        );
      });
    },
    handleWidgetDelete(index) {
      this.commonApi.widgetListItemDelete(this, index);
    },
    handleSelectWidget(index) {
      let data = this.data.span !== undefined || this.data.label!==undefined? this.data.list : this.data;
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        this.index,
        data
      );
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.selectWidget.options.dialogImageUrl = file.url;
      this.selectWidget.options.dialogVisible = true;
    },
  },
  computed: {
    selectWidgetModify() {
      return this.$store.state.selectWidget;
    },
    hideLabelModify() {
      if (this.$store.state.selectWidget.options !== undefined) {
        return this.$store.state.selectWidget.options.hideLabel;
      }
    },
    elementNameModify() {
      return this.$store.state.selectWidget.name;
    },
  },
  watch: {
    selectWidgetModify(val) {
      this.selectWidget = val;
    },
    hideLabelModify(val) {
      if (this.selectWidget.key === this.element.key) {
        this.locName = val ? "" : this.element.name;
        this.contentStyle = val ? "0px" : "100px";
      }
    },
    elementNameModify(val) {
      if (this.selectWidget.key === this.element.key) {
        this.locName = val;
      }
    },
    element: {
      deep: true,
      handler(val) {
        // console.log("element发生Change");
      },
    },
  },
};
</script>
