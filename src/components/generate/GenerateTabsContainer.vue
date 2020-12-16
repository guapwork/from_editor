<template>
  <el-tabs
    v-model="widget.options.activeName"
    :type="widget.options.type"
    :tab-position="widget.options.position"
  >
    <el-tab-pane
      v-for="(item,index) in widget.data"
      :key="item.name+index"
      :label="item.label"
      :name="item.name"
    >
      <generate-list-item
        v-for="el in item.list"
        :key="el.key"
        :widget="el" 
        :showLabel="true"
      ></generate-list-item>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import GenerateListItem from "./GenerateListItem";

export default {
  components: {
    GenerateListItem,
  },
  props: ["widget"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>