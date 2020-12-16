<template>
  <div>
    <el-form-item label="栅格间隔">
      <el-input type="number" v-model.number="selectWidget.options.gutter"></el-input>
    </el-form-item>
    <el-form-item label="列配置项">
      <draggable
        tag="ul"
        :list="selectWidget.columns"
        v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
        handle=".drag-item"
      >
        <li v-for="(item, index) in selectWidget.columns" :key="index">
          <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;">
            <i class="iconfont icon-icon_bars"></i>
          </i>
          <el-input size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input>

          <el-button
            @click="handleOptionsRemove(index)"
            circle
            plain
            type="danger"
            size="mini"
            icon="el-icon-minus"
            style="padding: 4px;margin-left: 5px;"
          ></el-button>
        </li>
      </draggable>
      <div style="margin-left: 22px;">
        <el-button type="text" @click="handleAddColumn">添加列</el-button>
      </div>
    </el-form-item>
    <el-form-item label="水平排列方式">
      <el-select v-model="selectWidget.options.justify">
        <el-option value="start" label="左对齐"></el-option>
        <el-option value="end" label="右对齐"></el-option>
        <el-option value="center" label="居中"></el-option>
        <el-option value="space-around" label="两侧间隔相等"></el-option>
        <el-option value="space-between" label="两端对齐"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="垂直排列方式">
      <el-select v-model="selectWidget.options.align">
        <el-option value="top" label="顶部对齐"></el-option>
        <el-option value="middle" label="居中"></el-option>
        <el-option value="bottom" label="底部对齐"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
export default {
  components: {
    Draggable,
  },
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
    };
  },
  created() {},
  methods: {
    handleAddColumn() {
      this.selectWidget.columns.push({
        span: "",
        list: [],
      });
    },
    handleOptionsRemove(index) {
      this.selectWidget.columns.splice(index, 1);
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
  },
};
</script>