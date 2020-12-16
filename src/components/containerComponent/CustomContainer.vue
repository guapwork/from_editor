<template v-if="element.type=='blank'">
  <el-form
    class="widget-view"
    :class="{active: selectWidget.key == element.key}"
    @click.native="handleSelectWidget"
  >
    <el-form-item label="自定义区域" label-width="100px" label-position="right">
      <draggable
        tag="div"
        class="custom-container"
        v-model="element.list"
        v-bind="{animation: 200,group: 'people',disabled: false,ghostClass: 'ghost',handle: '.drag-widget'}"
        @add="handleSonFormAdd($event, element)"
        @click="handleClick"
      >
        <widget-list-item
            :key="el.key"
            v-for="(el, i) in element.list"
            :index="i"
            :element="el"
            :data="element"
          ></widget-list-item>
      </draggable>
    </el-form-item>
    <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-drag drag-widget"></i>
    </div>
  </el-form>
</template>


<script>
import Draggable from "vuedraggable";
import WidgetListItem from "../WidgetListItem";
export default {
  components: {
    Draggable,
    WidgetListItem,
  },
  props: ["data", "index", "element"],
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
      width: "",
    };
  },
  methods: {
    handleClick() {
      console.log("点击了");
    },
    handleSelectWidget(index) {
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        this.index,
        this.data
      );
    },
    handleWidgetDelete(index) {
      this.commonApi.widgetListItemDelete(this, index);
    },

    handleSonFormAdd($event) {
      let that = this;
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      that.$set(that.element.list, newIndex, {
        ...that.element.list[newIndex],
        options: {
          ...that.element.list[newIndex].options,
          fatherEntity: that.element.options.entity,
          fatherEntityDescription: that.element.options.entityDescription,
          remoteFunc: "func_" + key,
        },
        key,
      });

      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        newIndex,
        this.element.list
      );
      this.commonApi.currentContainer(this, this.element.list);
    },
  },
  computed: {
    selectWidgetModify() {
      return this.$store.state.selectWidget;
    },
  },
  watch: {
    selectWidgetModify(val) {
      this.selectWidget = val;
    },
  },
};
</script>

<style>
.custom-container {
  min-height: 300px;
  border: 1px dashed;
  background: #fff;
  z-index:999;
}
</style>