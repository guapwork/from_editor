<template>
  <el-form-item :label="labelName" :prop="widget.model" :label-width="contentStyle">
    <template v-if="widget.type == 'input'">
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        type="number"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      ></el-input>
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :step="widget.options.step"
        controls-position="right"
        :disabled="widget.options.disabled"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      >
        <el-checkbox
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: widget.options.width}"
      ></el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      ></el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate
        v-model="dataModel"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :filterable="widget.options.filterable"
      >
        <el-option
          v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="item.value"
          :value="item.value"
          :label="widget.options.showLabel || widget.options.remote?item.label:item.value"
        ></el-option>
      </el-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch v-model="dataModel" :disabled="widget.options.disabled"></el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :style="{'width': widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :length="widget.options.length"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
      ></fm-upload>
    </template>

    <template v-if="widget.type == 'editor'">
      <vue-editor v-model="dataModel" :style="{width: widget.options.width}"></vue-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :options="widget.options.remoteOptions"
      ></el-cascader>
    </template>

    <template v-if="widget.type == 'text'">
      <span>{{widget.options.defaultValue}}</span>
    </template>

    <template v-if="widget.type == 'html'">
      <div v-html="widget.options.defaultValue"></div>
    </template>

    <template v-if="widget.type == 'line'">
      <el-divider :content-position="widget.options.justify">{{widget.options.defaultValue}}</el-divider>
    </template>
  </el-form-item>
</template>

<script>
export default {
  props: ["widget", "showLabel", "fatherMdoel", "tabelData", "rowIndex","models"],
  components: {},
  data() {
    return {
      dataModel: {},
      contentStyle: "100px",
      labelName: this.widget.name,
    };
  },
  created() {
    if (this.widget.options.hideLabel || !this.showLabel) {
      this.contentStyle = "0px";
      this.labelName = "";
    }
    if (this.rowIndex !== undefined) {
      this.dataModel = this.tabelData[this.rowIndex][this.widget.model + "-" + this.rowIndex];
    } else {
      this.dataModel = this.$store.state.models[this.widget.model];
    }
  },
  methods: {
    
  },
  watch: {
    dataModel: {
      deep: true,
      handler(val) {
        let widgetModel = this.widget.model;  
        widgetModel = widgetModel.substring(widgetModel.lastIndexOf("_")+1,widgetModel.length);
        if (this.rowIndex !== undefined) {
          this.$store.state.models[this.fatherMdoel][this.rowIndex][widgetModel] = val;
        } else {
          this.$store.state.models[widgetModel] = val;
        }
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
      },
    },
    tabelData(val) {
      this.dataModel = this.$store.state.models[this.fatherMdoel][this.rowIndex][this.widget.model]
    },
    
  },
};
</script>
