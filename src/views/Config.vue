<template>
  <el-tabs v-model="activeName" class="config-container">
    <el-tab-pane label="字段配置" name="widget">
      <div v-if="selectWidget.key === undefined" class="empty">请添加字段</div>
      <widget-config v-else></widget-config>
    </el-tab-pane>
    <el-tab-pane label="表单配置" name="form">
      <form-config></form-config>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import FormConfig from "../components/Config/FormConfig";
import WidgetConfig from "../components/Config/WidgetConfig";

export default {
  components: {
    FormConfig,
    WidgetConfig,
  },
  data() {
    return {
      activeName: "widget",
      selectWidget: this.$store.state.selectWidget,
    };
  },
  methods: {},
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


<style lang="scss">
.config-container {
  padding: 0px 10px;
}
</style>