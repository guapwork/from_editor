<template>
  <el-container class="container">
    <!-- -------------------------------------------------------------------------组件区------------------------------------------------------------------------- -->

    <el-aside width="300px" class="left-aside">
      <component-list></component-list>
    </el-aside>

    <!-- -------------------------------------------------------------------------编辑区------------------------------------------------------------------------- -->

    <el-main class="main">
      <main-header></main-header>
      <widget-list></widget-list>
    </el-main>

    <!-- -------------------------------------------------------------------------配置区------------------------------------------------------------------------- -->

    <el-aside width="320px" class="right-aside">
      <config></config>
    </el-aside>
  </el-container>
</template>

<script>
import ComponentList from "./ComponentList";
import MainHeader from "./MainHeader";
import WidgetList from "./WidgetList";
import Config from "./Config";
export default {
  components: {
    ComponentList,
    MainHeader,
    WidgetList,
    Config,
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
.container {
  text-align: center;
  .main {
    padding: 0;
    position: relative;
  }
  .left-aside {
    border-right: 1px solid #ccc;
  }
  .right-aside {
    border-left: 1px solid #ccc;
  }
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  list-style: none;
  min-height: 500px;
}
.list-group-item {
  cursor: move;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
}
.list-form-item {
  border: 1px dashed blue;
  padding: 5px;
  &.el-form-item {
    margin: 2px;
  }
}
</style>