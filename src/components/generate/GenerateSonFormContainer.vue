<template>
  <el-form-item label="子表单" label-width="100px" label-position="right">
    <div class="form-table">
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
      >
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-button
              v-if="hoverIndex == scope.$index"
              type="danger"
              icon="el-icon-error"
              size="mini"
              circle
              @click="handleDeleteRowClick(scope.$index)"
            ></el-button>
            <div v-else>{{scope.$index+1}}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(el,cindex) in element.tableColumns"
          :key="'table'+cindex"
          prop="date"
          :label="el.name"
          width="200"
        >
          <template slot-scope="scope">
            <generate-list-item
              :widget="el"
              :fatherMdoel="element.model"
              :tabelData="tableData"
              :rowIndex="scope.$index"
              :showLabel="false"
              :scopeRow="scope.row"
              :models.sync="sonFormModels"
            ></generate-list-item>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="text"
        icon="el-icon-plus"
        @click="handleAddCloumn(element.tableColumns,element.model)"
      >添加</el-button>
    </div>
  </el-form-item>
</template>

<script>
import GenerateListItem from "./GenerateListItem";
export default {
  components: {
    GenerateListItem,
  },
  props: ["element","models"],
  data() {
    return {
      tableData: [],
      rowSub: -1,
      hoverIndex: null,
      sonFormModels:this.models
    };
  },
  created() {
    this.$store.state.models[this.element.model] = [];
    this.sonFormModels[this.element.model] = [];
  },
  mounted() {},
  methods: {
    handleAddCloumn(column, model) {
      let data = {};
      let dataName = {};
      this.rowSub++;
      for (let i = 0; i < column.length; i++) {
        let obj = JSON.parse(JSON.stringify(column[i]));
        dataName = {};
        obj.model = obj.model + "-" + this.rowSub;
        data[obj.model] = "";
      }
      this.tableData.push(data);
      this.$store.state.models[model].push(dataName);
      this.sonFormModels[model].push(dataName);
    },
    handleDeleteRowClick(rowIndex) {
      this.tableData.splice(rowIndex, 1);
      this.$store.state.models[this.element.model].splice(rowIndex, 1);
      this.sonFormModels[this.element.model].splice(rowIndex, 1);
    },
    
    cellMouseEnter(row, column, cell, event) {
      if(cell.innerText!==""){
        this.hoverIndex = Number(cell.innerText) -1;  
      }
    },
    cellMouseLeave() {
      this.hoverIndex = null;
    },
  },
  watch: {
    sonFormModels: {
      deep: true,
      handler(val) {
        
        this.$emit('update:models', 
           val
        )
      },
    },
  },
};
</script>
