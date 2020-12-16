<template>
  <el-row
    class="widget-col widget-view"
    type="flex"
    :class="{active: selectWidget.key == element.key}"
    @click.native="handleSelectWidget(index)"
  >
    <el-col>
      <table
        width="100%"
        height="100%"
        :border="element.options.borderWidth"
        cellpadding="1"
        align="center"
        cellspacing="0"
        :bordercolor="element.options.borderColor"
      >
        <tr v-for="(item, rowIndex) in element.row" :key="'row'+rowIndex" height="70">
          <td
            v-for="(col, colIndex) in item.columns"
            :key="'col'+colIndex"
            @click.stop="iconIsShow(col,colIndex)"
            :colspan="col.options.col"
            :rowspan="col.options.row"
          >
            <el-row class="widget-col widget-view" :key="element.key" 
              type="flex">
              <el-col>
                <draggable
                  v-model="col.list"
                  :no-transition-on-drag="true"
                  v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                  @add="handleWidgetColAdd($event, colIndex, rowIndex)"
                >
                  <transition-group name="fade" tag="div" class="widget-col-list">
                    <widget-list-item
                      v-for="(el, i) in col.list"
                      v-if="el && el.key"
                      :key="el.key"
                      :index="i"
                      :element="el"
                      :data="item"
                    ></widget-list-item>
                  </transition-group>
                </draggable>
              </el-col>
                <div class="widget-view-action widget-col-action" v-if="!element.options.iconShow">
                  <el-tooltip content="向右合并" placement="bottom" effect="light">
                    <i class="iconfont icon-jx-hebinghang" @click.stop="mergeCol(col,colIndex,item,rowIndex)"></i>
                  </el-tooltip>
                  <el-tooltip content="向下合并" placement="bottom" effect="light">
                    <i class="iconfont icon-jx-hebinglie" @click.stop="mergeRow(col,colIndex,item,rowIndex)"></i>
                  </el-tooltip>
                </div> 
            </el-row>
          </td>
        </tr>
      </table>
    </el-col>
    <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key && element.options.iconShow">
      <el-tooltip content="插入行" placement="bottom" effect="light">
        <i class="iconfont icon-jx-Row" @click.stop="handleRowAdd"></i>
      </el-tooltip>
      <el-tooltip content="插入列" placement="bottom" effect="light">
        <i class="iconfont icon-jx-Columns" @click.stop="handleColAdd"></i>
      </el-tooltip>
      <!-- <i class="iconfont icon-jx-clone" @click.stop="handleWidgetClone(index)"></i> -->
      <el-tooltip content="删除" placement="bottom" effect="light">
        <i class="iconfont icon-jx-trash" @click.stop="handleWidgetDelete(index)"></i>
      </el-tooltip>
    </div>
    <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key && element.options.iconShow">
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
      tableId:1
    };
  },
  mounted() {
    // console.log(this.element);
  },
  methods: {
    iconIsShow(item, index) {
      this.element.options.iconShow = false;
    },
    mergeCol(col, colIndex, item, index) {
      if (item.columns[colIndex+1] && col.options.isRow) {
        col.options.isCol = false
        let id = col.options.col;
        if (id < this.element.row.length) {
          let a = item.columns[colIndex+1].options.col
          col.options.col = id + a;
        }
        let data = item.columns[colIndex+1].list
        item.columns[colIndex].list.push(...data)
        item.columns.splice(colIndex+1,1)
        
        if (index != 0) {
          let colId = col.options.col
          for (let i = 0; i < colId; i++) {
            if (this.element.row[index-1].columns[colIndex+i]) {
              this.element.row[index-1].columns[colIndex+i].options.isCol = false
            }
          }
        }
      }
    },
    mergeRow(col, colIndex, item, index) {
      if (this.element.row[index+col.options.active] && col.options.isCol) {
        col.options.isRow = false
        let id = col.options.row;
        if (id < this.element.row.length) {
          let a = this.element.row[index+col.options.active].columns[colIndex].options.row
          col.options.row = id + a;
        }
        let data = this.element.row[index+col.options.active].columns[colIndex].list
        item.columns[colIndex].list.push(...data)
        this.element.row[index+col.options.active].columns.splice(colIndex,1)
        col.options.active++
        if (colIndex != 0) {
          let rowId = col.options.row
          for (let i = 0; i < rowId; i++) {
            this.element.row[index+i].columns[colIndex-1].options.isRow = false
          }
        }
      }
    },
    handleRowAdd() {
      let number = this.tableId
      let newData = { columns: [] };
      for (let index = 0; index < number; index++) {
        newData.columns.push({
          type: "td",
          options: {
            active:1,
            isRow:true,
				    isCol:true,
            iconShow: false,
            col: 1,
            row: 1,
          },
          list: [],
        });
      }
      this.element.row.push(newData);
    },
    handleColAdd() {
      this.tableId++
      for (let index = 0; index < this.element.row.length; index++) {
        this.element.row[index].columns.push({
          type: "td",
          options: {
            active:1,
            isRow:true,
				    isCol:true,
            iconShow: false,
            col: 1,
            row: 1,
          },
          list: [],
        });
      }
    },
    // handleWidgetClone(index){
    //   let cloneData = {
    //     ...this.data.list[index],
    //     options: { ...this.data.list[index].options },
    //     key: Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999),
    //   };
    //   if (
    //     this.data.list[index].type === "radio" ||
    //     this.data.list[index].type === "checkbox" ||
    //     this.data.list[index].type === "select"
    //   ) {
    //     cloneData = {
    //       ...cloneData,
    //       options: {
    //         ...cloneData.options,
    //         options: cloneData.options.options.map((item) => ({ ...item })),
    //       },
    //     };
    //   }
    //   this.data.list.splice(index, 0, cloneData);
    //   this.$nextTick(() => {
    //     this.selectWidget = this.data.list[index + 1];
    //   });
    // },
    handleWidgetDelete(index) {
      this.commonApi.widgetListItemDelete(this,index);
    },
    handleSelectWidget(index) {
      this.element.options.iconShow = true
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        index,
        this.data
      );
    },
    handleWidgetColAdd($event, colIndex, rowIndex) {
      let that = this;
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      const item = $event.item;
      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf("data-grid") >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === "DIV" &&
          this.data.list.splice(
            oldIndex,
            0,
            this.element.row[rowIndex].columns[colIndex].list[newIndex]
          );
        this.element.row[rowIndex].columns[colIndex].list.splice(newIndex, 1);
        return false;
      }
      const key =
        Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
      this.$set(this.element.row[rowIndex].columns[colIndex].list, newIndex, {
        ...this.element.row[rowIndex].columns[colIndex].list[newIndex],
        options: {
          ...this.element.row[rowIndex].columns[colIndex].list[newIndex]
            .options,
          remoteFunc: "func_" + key,
        },
        key,
        // 绑定键值
        model:
          this.element.row[rowIndex].columns[colIndex].list[newIndex].type +
          "_" +
          key,
        rules: [],
      });

      if (
        this.element.row[rowIndex].columns[colIndex].list[newIndex].type ===
          "radio" ||
        this.element.row[rowIndex].columns[colIndex].list[newIndex].type ===
          "checkbox" ||
        this.element.row[rowIndex].columns[colIndex].list[newIndex].type ===
          "select"
      ) {
        this.$set(this.element.row[rowIndex].columns[colIndex].list, newIndex, {
          ...this.element.row[rowIndex].columns[colIndex].list[newIndex],
          options: {
            ...this.element.row[rowIndex].columns[colIndex].list[newIndex]
              .options,
            options: this.element.row[rowIndex].columns[colIndex].list[
              newIndex
            ].options.options.map((item) => ({
              ...item,
            })),
          },
        });
      }
      this.selectWidget = this.commonApi.selectWidgetModify(
        this,
        newIndex,
        this.element.row[rowIndex].columns[colIndex].list
      );
    },
  },
  computed: {
    selectWidgetModify() {
      return this.$store.state.selectWidget;
    }
  },
  watch: {
    selectWidgetModify(val) {
      this.selectWidget = val;
    }
  },
};
</script>