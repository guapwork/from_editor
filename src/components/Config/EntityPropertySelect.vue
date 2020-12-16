<template>
  <div>
    <el-form-item v-if="selectWidget.options.fatherEntity === undefined" label="数据表">
      <el-select v-model="entity" placeholder="请选择" :style="{width: '100%'}">
        <el-option
          v-for="(item, index) in entityList"
          :key="index+selectWidget.key"
          :label="item.label"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!selectWidget.isContainer" label="字段">
      <el-select v-model="property" placeholder="请选择" :style="{width: '100%'}">
        <el-option
          v-for="(item, index)  in propertyList"
          :key="'p'+index+selectWidget.key"
          :label="item.label"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
      entity: {},
      entityList: this.commonApi.getEntityList(this),
      property: {},
      propertyList: [],
    };
  },
  created() {},
  methods: {},
  //通过计算属性监听store中selectWidget的变化
  computed: {
    selectWidgetWatch() {
      return this.$store.state.selectWidget;
    },
  },

  watch: {
    entity(val) {
      if (this.selectWidget.isContainer === undefined) {
        let widgetList =
          this.selectWidget.options.fatherEntity !== undefined
            ? this.$store.state.currentContainer
            : this.$store.state.widgetForm.list;
        this.commonApi.getPropertyList(this, val, widgetList);
      } else if (this.selectWidget.isContainer) {
        if (
          this.selectWidget.tableColumns !== undefined &&
          this.selectWidget.tableColumns.length > 0
        ) {
          this.selectWidget.tableColumns = [];
        } else if (
          this.selectWidget.list !== undefined &&
          this.selectWidget.list.length > 0
        ) {
          this.selectWidget.list = [];
        }

        this.selectWidget.options.entity =
          this.entity.value !== undefined ? this.entity.value : "";
        this.selectWidget.options.entityDescription =
          this.entity.label !== undefined ? this.entity.label : "";

        this.selectWidget.model = this.selectWidget.options.entity;
      }
    },
    property(val) {
      this.selectWidget.options.entity =
        this.entity.value !== undefined ? this.entity.value : "";
      this.selectWidget.options.entityDescription =
        this.entity.label !== undefined ? this.entity.label : "";
      if (this.selectWidget.type !== "sonForm") {
        this.selectWidget.options.property =
          val.value !== undefined ? val.value : "";
        this.selectWidget.options.propertyDescription =
          val.label !== undefined ? val.label : "";
      }

      if (this.selectWidget.options.propertyDescription !== "") {
        this.selectWidget.name = this.selectWidget.options.propertyDescription;
        this.selectWidget.model =
          this.selectWidget.options.entity +
          "_" +
          this.selectWidget.options.property;
      }
    },
    selectWidgetWatch(val) {
      this.selectWidget = val;
      if (val.type === "tabs") {
        this.tabsId = val.data.length;
      }

      if (val.options.fatherEntity !== undefined) {
        this.entity = {
          label: val.options.fatherEntityDescription,
          value: val.options.fatherEntity,
        };
      } else {
        this.entity = {
          label: val.options.entityDescription,
          value: val.options.entity,
        };
      }
    },
  },
};
</script>