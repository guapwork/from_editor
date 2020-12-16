<template>
  <div>
    <el-form-item label="风格类型" >
      <el-radio-group v-model="selectWidget.options.type" size="medium">
        <el-radio-button label>默认</el-radio-button>
        <el-radio-button label="card">选项卡</el-radio-button>
        <el-radio-button label="border-card">卡片化</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选项卡位置" >
      <el-radio-group v-model="selectWidget.options.position" size="small">
        <el-radio-button label="top">顶部</el-radio-button>
        <el-radio-button label="left">左侧</el-radio-button>
        <el-radio-button label="right">右侧</el-radio-button>
        <el-radio-button label="bottom">底部</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签配置项" >
      <div v-for="(item,index) in selectWidget.data" :key="index" style="margin-bottom:10px">
        <el-input v-model="item.label" style="width:80%;margin-right:10px"></el-input>
        <el-button type="danger" icon="el-icon-delete" circle @click="HandleTabsRemove(index)"></el-button>
      </div>
      <el-button type="text" @click="HandleTabsAdd">添加标签</el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
      tabsId: 1,
    };
  },
  created() {
    this.tabsId = this.selectWidget.data.length;
  },
  methods: {
    HandleTabsAdd() {
      this.tabsId++;
      this.selectWidget.data.push({
        label: "标签" + this.tabsId,
        name: "" + this.tabsId,
        list: [],
      });
    },
    HandleTabsRemove(index){
        this.selectWidget.data.splice(index, 1);
    }
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
        this.tabsId = val.data.length;
    },
  },
};
</script>