<template>
  <div class="widget-form-container">
    <div v-if="widgetList.length == 0" class="form-empty">从左侧拖拽来添加表单</div>
    <el-form
      :label-width="config.labelWidth+'px'"
      :label-position="config.labelPosition"
      :size="config.size"
    >
      <draggable
        v-model="widgetList"
        v-bind="{
        group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'
      }"
        @add="onAdd"
      >
        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in widgetList">
            <!-- -------------------------------------------------------------------------栅格布局------------------------------------------------------------------------- -->
            <template v-if="element.type == 'grid'">
              <grid-container
                v-if="element && element.key"
                :key="element.key"
                :index="index"
                :element="element"
                :data="widgetList"
              ></grid-container>
            </template>
            <!-- -------------------------------------------------------------------------子表单容器------------------------------------------------------------------------- -->
            <template v-else-if="element.type == 'sonForm'">
              <son-form-container
                v-if="element && element.key"
                :key="element.key"
                :index="index"
                :element="element"
                :data="widgetList"
              ></son-form-container>
            </template>
            <!-- -------------------------------------------------------------------------自定义容器------------------------------------------------------------------------- -->
            <template v-else-if="element.type == 'blank'">
              <custom-container
                v-if="element && element.key"
                :key="element.key"
                :index="index"
                :element="element"
                :data="widgetList"
                ></custom-container>
            </template>
            <!-- -------------------------------------------------------------------------标签页容器------------------------------------------------------------------------- -->
            <template v-else-if="element.type == 'tabs'">
              <tabs-container
                v-if="element && element.key"
                :key="element.key"
                :index="index"
                :element="element"
                :data="widgetList"
              ></tabs-container>
            </template>
            <!-- -------------------------------------------------------------------------表格布局容器------------------------------------------------------------------------- -->
            <template v-else-if="element.type == 'form'">
              <form-container
                v-if="element && element.key"
                :key="element.key"
                :index="index"
                :element="element"
                :data="widgetList"
              ></form-container>
            </template>
            <!-- -------------------------------------------------------------------------正常组件------------------------------------------------------------------------- -->
            <template v-else>
              <!-- 渲染用组件 -->
              <widget-list-item
                v-if="element && element.key"
                :key="element.key"
                :index="index"
                :element="element"
                :data="widgetList"
              ></widget-list-item>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import WidgetListItem from "../components/WidgetListItem";
import GridContainer from "../components/containerComponent/GridContainer";
import TabsContainer from "../components/containerComponent/TabsContainer";
import FormContainer from "../components/containerComponent/FormContainer";
import SonFormContainer from "../components/containerComponent/SonFormContainer";
import CustomContainer from "../components/containerComponent/CustomContainer";
export default {
  components: {
    Draggable,
    WidgetListItem,
    GridContainer,
    TabsContainer,
    FormContainer,
    SonFormContainer,
    CustomContainer,
  },
  data() {
    return {
      widgetList: [],
      config: this.$store.state.formConfig,
    };
  },

  computed: {
    handleClear() {
      return this.$store.state.widgetForm.list;
    },
  },
  watch: {
    widgetList: {
      handler(val) {
        this.commonApi.updateWidgetJson(this, val);
      },
      deep: true,
    },
    handleClear(val) {
      if (val.length === 0) {
        this.widgetList = val;
      }
    },
  },
  methods: {
    onAdd(evt) {
      //oldIndex：number/undefined--在列表容器中的原序号     newIndex：number/undefined--在列表容器中的新序号
      let that = this,
        newIndex = evt.newIndex;
      //这里添加 key 值，让编辑区的列表元素具有唯一性
      let key = new Date().getTime();
      //将拖拽进来的对象，添加key
      that.$set(that.widgetList, newIndex, {
        ...that.widgetList[newIndex],
        options: {
          ...that.widgetList[newIndex].options,
          remoteFunc: "func_" + key,
        },
        key,
        // model: that.widgetList[newIndex].type + "_" + key,
      });

      if (this.widgetList[newIndex].type === "grid") {
        this.$set(this.widgetList, newIndex, {
          ...this.widgetList[newIndex],
          columns: this.widgetList[newIndex].columns.map((item) => ({
            ...item,
          })),
        });
      }
      if (this.widgetList[newIndex].type === "tabs") {
        this.$set(this.widgetList, newIndex, {
          ...this.widgetList[newIndex],
          data: this.widgetList[newIndex].data.map((item) => ({ ...item })),
        });
      }
      if (this.widgetList[newIndex].type === "form") {
        let rowCopy = JSON.parse(JSON.stringify(this.widgetList[newIndex].row));
        this.$set(this.widgetList, newIndex, {
          ...this.widgetList[newIndex],
          row: rowCopy,
        });
      }
      if (this.widgetList[newIndex].type === "sonForms") {
        let tableColumnsCopy = JSON.parse(
          JSON.stringify(this.widgetList[newIndex].tableColumns)
        );
        this.$set(this.widgetList, newIndex, {
          ...this.widgetList[newIndex],
          tableColumns: tableColumnsCopy,
        });
      }

      this.commonApi.selectWidgetModify(this, newIndex, that.widgetList);
    },
  },
};
</script>
