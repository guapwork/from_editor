<template>
  <el-form
    class="widget-view widget-table"
    :class="{active: selectWidget.key == element.key}"
    @click.native="handleSelectWidget"
  >
    <el-form-item label="子表单" label-width="100px" label-position="right">
      <div class="widget-table-wrapper">
        <!-- <el-table class="widget-table-left"></el-table> -->
        <div class="widget-table-content">
          <div>
            <draggable
              tag="div"
              class="widget-table-col"
              :style="tableWidth"
              v-model="element.tableColumns"
              v-bind="{animation: 200,group: 'people',disabled: false,ghostClass: 'ghost',handle: '.drag-widget'}"
              @add="handleSonFormAdd($event, element)"
            >
              <!-- <div class="table-empty" v-if="element.tableColumns.length===0">将字段拖拽到此处</div> -->

              <div
                :style="colWidth"
                class="widget-table-view"
                :class="{active: selectWidget.key == el.key}"
                v-for="(el,i) in element.tableColumns"
                :key="el.key"
                @click.stop="handleSelectSonWidget(i,element.tableColumns)"
              >
                <el-table :data="tableData">
                  <el-table-column prop="date" :label="el.name" width="200">
                    <template slot-scope="scope">
                      <no-label-item :element="el"></no-label-item>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="widget-view-action widget-col-action" v-if="selectWidget.key == el.key">
                  <i
                    class="iconfont icon-jx-trash"
                    @click.stop="handleWidgetSonDelete(index,element)"
                  ></i>
                </div>

                <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == el.key">
                  <i class="iconfont icon-jx-drag drag-widget"></i>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
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
import NoLabelItem from "../NoLabelItem";
export default {
  components: {
    Draggable,
    NoLabelItem,
  },
  props: ["data", "index", "element"],
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
      tableColumns: [],
      width: "",
      tableWidth: {
        width: "200px",
      },
      colWidth: {
        width: "200px",
      },
      tableData: [{}],
    };
  },
  created() {
    // console.log(this.selectWidget);
    // console.log(this.element)
  },
  methods: {
    handleSelectWidget(index) {
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        this.index,
        this.data
      );
    },
    handleWidgetDelete(index) {
      this.commonApi.widgetListItemDelete(this,index);
    },

    handleSonFormAdd($event) {
      let extent = (this.element.tableColumns.length + 1) * 200;
      this.width = extent + "px";
      let that = this;
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;

      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);

      that.$set(that.element.tableColumns, newIndex, {
        ...that.element.tableColumns[newIndex],
        options: {
          ...that.element.tableColumns[newIndex].options,
          fatherEntity:that.element.options.entity,
          fatherEntityDescription:that.element.options.entityDescription,
          hideLabel:true,
          remoteFunc: "func_" + key,
        },
        key,
      });

      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        newIndex,
        this.element.tableColumns
      );
      this.commonApi.currentContainer(this,this.element.tableColumns);
    },

    handleSelectSonWidget(index, list) {
      this.selectWidget = this.commonApi.selectWidgetModify(this, index, list);
    },

    handleWidgetSonDelete(index) {
      this.element.tableColumns.splice(index, 1);
      let extent = (this.element.tableColumns.length + 1) * 200;
      this.width = extent + "px";
    },
  },
  computed: {
    selectWidgetModify() {
      return this.$store.state.selectWidget;
    },
  },
  watch: {
    width(val) {
      this.tableWidth.width = val;
    },
    selectWidgetModify(val) {
      this.selectWidget = val;
    },
  },
};
</script>

<style>
.el-table--scrollable-x .el-table__body-wrapper {
  overflow: hidden !important;
  position: relative;
}
</style>