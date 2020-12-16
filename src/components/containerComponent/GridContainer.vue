<template>
  <el-row
    class="widget-col widget-view"
    type="flex"
    :class="{active: selectWidget.key == element.key}"
    :gutter="element.options.gutter ? element.options.gutter : 0"
    :justify="element.options.justify"
    :align="element.options.align"
    @click.native="handleSelectWidget(index)"
  >
    <el-col
      v-for="(col, colIndex) in element.columns"
      :key="colIndex"
      :span="col.span ? col.span : 0"
    >
      <draggable
        v-model="col.list"
        :no-transition-on-drag="true"
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        @add="handleWidgetColAdd($event, element, colIndex)"
      >
        <transition-group name="fade" tag="div" class="widget-col-list">
          <widget-list-item
            v-if="el && el.key"
            :key="el.key"
            v-for="(el, i) in col.list"
            :index="i"
            :element="el"
            :data="col"
          ></widget-list-item>
        </transition-group>
      </draggable>
    </el-col>
    <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>

    <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-jx-drag drag-widget"></i>
    </div>
  </el-row>
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
    };
  },
  created() {},
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        index,
        this.data
      );
    },
    handleWidgetColAdd($event, row, colIndex) {
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;
      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf("data-grid") >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === "DIV" &&
          this.data.splice(oldIndex, 0, row.columns[colIndex].list[newIndex]);

        row.columns[colIndex].list.splice(newIndex, 1);

        return false;
      }

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...row.columns[colIndex].list[newIndex].options,
          remoteFunc: "func_" + key,
        },
        key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + "_" + key,
        rules: [],
      });

      if (
        row.columns[colIndex].list[newIndex].type === "radio" ||
        row.columns[colIndex].list[newIndex].type === "checkbox" ||
        row.columns[colIndex].list[newIndex].type === "select"
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(
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
        row.columns[colIndex].list
      );
    },
    handleWidgetDelete(index) {
     this.commonApi.widgetListItemDelete(this,index);
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