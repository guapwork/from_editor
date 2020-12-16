<template>
  <table
    width="100%"
    height="100%"
    :border="widget.options.borderWidth"
    cellpadding="1"
    align="center"
    cellspacing="0"
    :bordercolor="widget.options.borderColor"
  >
    <tr v-for="(item, rowIndex) in widget.row" :key="'row'+rowIndex" height="70">
      <td
        v-for="(col, colIndex) in item.columns"
        :key="'col'+colIndex"
        :colspan="col.options.col"
        :rowspan="col.options.row"
      >
        <generate-list-item
          v-for="el in col.list"
          :key="el.key"
          :widget="el" 
          :showLabel="true"
        ></generate-list-item>
      </td>
    </tr>
  </table>
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