<template>
  <div style="border-bottom: 1px solid #ccc; padding: 5px; height: 45px">
    <el-button
      type="text"
      size="small"
      @click="handlePreview"
      icon="el-icon-view"
      >预览</el-button
    >
    <el-button
      type="text"
      size="small"
      @click="handleClear"
      icon="el-icon-document-remove"
      >清空</el-button
    >
    <el-button type="text" size="small" @click="handleJson" icon="el-icon-edit"
      >生成JSON</el-button
    >
    <el-button type="text" size="small" @click="testReq" icon="el-icon-edit"
      >测试请求</el-button
    >

    <!-- -------------------------------------------------------------------------预览------------------------------------------------------------------------- -->
    <el-dialog
      title="预览"
      :visible.sync="previewVisible"
      width="100%"
      height="100%"
      center
      :fullscreen="isFullScreen"
    >
      <generate-list ref="generateForm" :data="widgetForm"></generate-list>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleGetData">获取数据</el-button>
        <el-button @click="handleReset">重置</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="获取数据"
      :visible.sync="dataVisible"
      width="30%"
      center
      @close="closedialog"
    >
      <MakeJson :jsonData="showData"></MakeJson>
      <!-- <div id="dataId" style="height: 500px;width: 100%;">{{showData}}</div> -->
    </el-dialog>

    <!-- -------------------------------------------------------------------------JSON------------------------------------------------------------------------- -->
    <el-dialog
      title="生成JSON"
      :visible.sync="jsonVisible"
      width="30%"
      center
      @close="closeJsonDialog"
    >
      <MakeJson :jsonData="jsonTemplate"></MakeJson>
      <div style="text-align: center" ref="b">
        <el-button
          type="primary"
          class="json-btn"
          :data-clipboard-text="jsonCopyValue"
          >复制数据</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import GenerateList from "../components/generate/GenerateList";
import MakeJson from "./MakeJson";
// import api from "@/api/api"
import api from "../api/api"

export default {
  components: {
    GenerateList,
    MakeJson,
  },
  data() {
    return {
      previewVisible: false,
      jsonVisible: false,
      dataVisible: false,
      jsonTemplate: "",
      jsonCopyValue: "",
      showData: {},
      jsonClipboard: null,
      isFullScreen: true,
      widgetForm: this.$store.state.widgetForm,
    };
  },
  methods: {
    testReq() {
      api.getTest().then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    handlePreview() {
      this.previewVisible = true;
    },
    handleClear() {
      this.commonApi.updateWidgetJson(this, []);
      this.commonApi.selectWidgetModify(this, null, null);
    },
    handleGetData() {
      this.dataVisible = true;
      this.showData = this.$store.state.models;
      // this.$nextTick(() => {
      //   const editor = ace.edit("dataId");
      //   editor.session.setMode("ace/mode/json");
      // });
    },
    closedialog() {
      this.showData = {};
    },
    closeJsonDialog() {},
    handleReset() {},
    handleJson() {
      this.jsonVisible = true;
      this.getAceEditor();
      this.jsonCopyValue = JSON.stringify(this.jsonTemplate);
    },
    getAceEditor() {
      let that = this;
      this.jsonVisible = true;
      this.$nextTick(() => {
        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard(".json-btn");
          this.jsonClipboard.on("success", function (e) {
            that.$message({
              message: "复制成功",
              type: "success",
            });
          });
        }
      });
    },
  },
  computed: {
    widgetFormModify() {
      return this.$store.state.widgetForm;
    },
  },
  watch: {
    widgetFormModify: {
      deep: true,
      handler(val) {
        this.jsonTemplate = val;
        this.widgetForm = val;
      },
    },
  },
};
</script>