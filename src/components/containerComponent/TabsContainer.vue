<template>
  <div
    class="widget-col widget-view"
    type="flex"
    :class="{active: selectWidget.key == element.key}"
    @click="handleSelectWidget(index)"
  >
    <el-tabs
      v-model="element.options.activeName"
      :key="element.key"
      :type="element.options.type"
      :tab-position="element.options.position"
    >
      <el-tab-pane
        v-for="(item,index) in element.data"
        :key="item.name+index"
        :label="item.label"
        :name="item.name"
      >
        <draggable
          v-model="item.list"
          :no-transition-on-drag="true"
          v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
          @add="handleWidgetColAdd($event, element, index)"
        >
          <transition-group name="fade" tag="div" class="widget-col-list">
            <widget-list-item
              v-for="(el, i) in item.list"
              :key="el.key+i"
              :index="i"
              :element="el"
              :data="item"
            ></widget-list-item>
          </transition-group>
        </draggable>
      </el-tab-pane>
    </el-tabs>
    <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>
    <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-drag drag-widget"></i>
    </div>
  </div>
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
      locElement: {},
    };
  },
  created() {
    this.locElement = JSON.parse(JSON.stringify(this.element));
  },
  mounted() {},
  methods: {
    handleWidgetDelete(index) {
      this.commonApi.widgetListItemDelete(this,index);
    },
    handleSelectWidget(index) {
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        index,
        this.data
      );
    },
    handleWidgetColAdd($event, row, colIndex) {
      let that = this;
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;
      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf("data-grid") >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === "DIV" &&
          this.data.list.splice(oldIndex, 0, row.data[colIndex].list[newIndex]);
        row.data[colIndex].list.splice(newIndex, 1);
        return false;
      }
      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
      this.$set(row.data[colIndex].list, newIndex, {
        ...row.data[colIndex].list[newIndex],
        options: {
          ...row.data[colIndex].list[newIndex].options,
          remoteFunc: "func_" + key,
        },
        key,
        // 绑定键值
        model: row.data[colIndex].list[newIndex].type + "_" + key,
        rules: [],
      });
      if (
        row.data[colIndex].list[newIndex].type === "radio" ||
        row.data[colIndex].list[newIndex].type === "checkbox" ||
        row.data[colIndex].list[newIndex].type === "select"
      ) {
        this.$set(row.data[colIndex].list, newIndex, {
          ...row.data[colIndex].list[newIndex],
          options: {
            ...row.data[colIndex].list[newIndex].options,
            options: row.data[colIndex].list[newIndex].options.options.map(
              (item) => ({
                ...item,
              })
            ),
          },
        });
      }
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        newIndex,
        row.data[colIndex].list
      );
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