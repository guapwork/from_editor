<template>
  <div class="fm-style">
    <el-form
      ref="generateForm"
      label-suffix=":"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <!-- -------------------------------------------------------------------------栅格布局------------------------------------------------------------------------- -->
        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list">
                <el-form-item
                  v-if="citem.type=='blank'"
                  :label="citem.name"
                  :prop="citem.model"
                  :key="citem.key"
                >
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <generate-list-item v-else :key="citem.key" :widget="citem" :showLabel="true"></generate-list-item>
              </template>
            </el-col>
          </el-row>
        </template>
        <!-- -------------------------------------------------------------------------子表单容器------------------------------------------------------------------------- -->
        <template v-else-if="item.type == 'sonForm'">
          <generate-son-form-container :key="item.key" :models.sync="models" :element="item"></generate-son-form-container>
        </template>
        <!-- -------------------------------------------------------------------------表格布局容器------------------------------------------------------------------------- -->
        <template v-else-if="item.type == 'form'">
          <generate-form-container v-if="item && item.key" :key="item.key" :widget="item"></generate-form-container>
        </template>
        <!-- -------------------------------------------------------------------------标签页容器------------------------------------------------------------------------- -->
        <template v-else-if="item.type == 'tabs'">
          <generate-tabs-container v-if="item && item.key" :key="item.key" :widget="item"></generate-tabs-container>
        </template>
        <!-- -------------------------------------------------------------------------自定义区域------------------------------------------------------------------------- -->
        <template v-else-if="item.type == 'blank'">
          <generate-list-item
            v-for="(blank,index) in item.list"
            :key="item.key+index"
            :models.sync="models"
            :widget="blank"
            :showLabel="true"
          ></generate-list-item>
        </template>
        <!-- -------------------------------------------------------------------------正常组件------------------------------------------------------------------------- -->
        <template v-else>
          <!-- 预览用组件 -->
          <generate-list-item
            :key="item.key"
            :models.sync="models"
            :widget="item"
            :showLabel="true"
          ></generate-list-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenerateListItem from "./GenerateListItem";
// import { loadJs } from "../util/index.js";
import GenerateSonFormContainer from "./GenerateSonFormContainer";
import GenerateFormContainer from "./GenerateFormContainer";
import GenerateTabsContainer from "./GenerateTabsContainer";

export default {
  name: "fm-generate-form",
  components: {
    GenerateListItem,
    GenerateSonFormContainer,
    GenerateFormContainer,
    GenerateTabsContainer,
  },
  props: ["data", "remote"],
  data() {
    return {
      rules: {},
      models: {},
    };
  },
  created() {
    this.generateModle(this.data.list);
  },
  mounted() {},
  methods: {
    generateModle(dataList) {
      dataList.map((el) => {
        if (el.type === "grid") {
          el.columns.forEach((item) => {
            this.generateModle(item.list);
          });
        } else if (el.type === "sonForm") {
          this.generateModle(el.tableColumns);
        } else if (el.type === "blank") {
          this.generateModle(el.list);
        } else {
          if (el.options.fatherEntity === undefined) {
            // this.$store.state.models[el.model] = el.options.defaultValue;
          }

          this.models[el.model] = el.options.defaultValue;
          if (this.rules[el.model]) {
            this.rules[el.model] = [
              ...this.rules[el.model],
              ...el.rules.map((item) => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  return { ...item };
                }
              }),
            ];
          } else {
            this.rules[el.model] = [
              ...el.rules.map((item) => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  return { ...item };
                }
              }),
            ];
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
.form-table {
  position: relative;
}
</style>
