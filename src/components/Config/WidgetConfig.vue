<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="标题">
        <el-input v-model="selectWidget.name"></el-input>
      </el-form-item>
      <el-form-item label="内容" v-if="selectWidget.type==='line'">
        <el-input v-model="selectWidget.options.defaultValue"></el-input>
      </el-form-item>
      
      <entity-property-select></entity-property-select>
      <el-form-item label="隐藏标签" v-if="selectWidget.type!='grid' && selectWidget.type!='sonForm'">
        <el-switch
          v-model="selectWidget.options.hideLabel"
          active-color="#1890FF"
          inactive-color="#DCDFE6"
        ></el-switch>
      </el-form-item>
      <el-form-item
        label="占位内容"
        v-if="selectWidget.type!='time'&&selectWidget.type!='sonForm'&&selectWidget.type!='line'&&selectWidget.type!='html'&&selectWidget.type!='text'&&selectWidget.type!='slider'&&selectWidget.type!='switch'
        &&selectWidget.type!='color'&&selectWidget.type!='rate'&&selectWidget.type!='checkbox'&&selectWidget.type!='radio'&&selectWidget.type!='number'"
      >
        <el-input v-model="selectWidget.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="宽度" v-if="Object.keys(selectWidget.options).indexOf('width')>=0">
        <el-input v-model="selectWidget.options.width"></el-input>
      </el-form-item>
      <el-form-item label="高度" v-if="Object.keys(selectWidget.options).indexOf('height')>=0">
        <el-input v-model="selectWidget.options.height"></el-input>
      </el-form-item>

      <grid-config v-if="selectWidget.type == 'grid'"></grid-config>

      <el-form-item label="是否多选" v-if="selectWidget.type=='file'">
        <el-switch v-model="selectWidget.options.multiple"></el-switch>
      </el-form-item>
      <el-form-item label="最大上传数" v-if="selectWidget.type=='file'">
        <el-input v-model="selectWidget.options.limit"></el-input>
      </el-form-item>
      <el-form-item label="上传地址" v-if="selectWidget.type=='file'">
        <el-input v-model="selectWidget.options.action"></el-input>
      </el-form-item>

      <el-form-item label="表格边框宽度" v-if="selectWidget.type=='form'">
        <el-input-number v-model="selectWidget.options.borderWidth"></el-input-number>
      </el-form-item>
      <el-form-item label="表格边框颜色" v-if="selectWidget.type=='form'">
        <el-color-picker v-model="selectWidget.options.borderColor"></el-color-picker>
      </el-form-item>

      <tabs-config v-if="selectWidget.type=='tabs'" ></tabs-config>

      <el-form-item label="文案位置" v-if="selectWidget.type == 'line'">
        <el-select v-model="selectWidget.options.justify">
          <el-option value="left" label="左侧"></el-option>
          <el-option value="right" label="右侧"></el-option>
          <el-option value="center" label="居中"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="默认值"
        v-if="Object.keys(selectWidget.options).indexOf('defaultValue')>=0 && (selectWidget.type == 'textarea' || selectWidget.type == 'input' || selectWidget.type=='rate' || selectWidget.type=='color' || selectWidget.type=='switch' || selectWidget.type=='html' || selectWidget.type=='text'
        || selectWidget.type=='date'|| selectWidget.type=='time')"
      >
        <el-input
          v-if="selectWidget.type=='textarea'"
          type="textarea"
          :rows="5"
          v-model="selectWidget.options.defaultValue"
        ></el-input>
        <el-input v-if="selectWidget.type=='input'" v-model="selectWidget.options.defaultValue"></el-input>
        <el-rate
          v-if="selectWidget.type == 'rate'"
          style="display:inline-block;vertical-align: middle;"
          :max="selectWidget.options.max"
          :allow-half="selectWidget.options.allowHalf"
          v-model="selectWidget.options.defaultValue"
        ></el-rate>
        <el-button
          type="text"
          v-if="selectWidget.type == 'rate'"
          style="display:inline-block;vertical-align: middle;margin-left: 10px;"
          @click="selectWidget.options.defaultValue=0"
        >清空</el-button>
        <el-color-picker
          v-if="selectWidget.type == 'color'"
          v-model="selectWidget.options.defaultValue"
          :show-alpha="selectWidget.options.showAlpha"
        ></el-color-picker>
        <el-switch v-if="selectWidget.type=='switch'" v-model="selectWidget.options.defaultValue"></el-switch>
        <el-input
          v-if="selectWidget.type=='html'"
          type="textarea"
          :rows="5"
          v-model="selectWidget.options.defaultValue"
        ></el-input>
        <el-input v-if="selectWidget.type=='text'" v-model="selectWidget.options.defaultValue"></el-input>
        <el-date-picker
          v-if="selectWidget.type=='date'"
          v-model="selectWidget.options.defaultValue"
          type="date"
        ></el-date-picker>
        <el-time-select
          v-if="selectWidget.type=='time'"
          v-model="selectWidget.options.defaultValue"
          :picker-options="{selectableRange: '00:00:00 - 20:30:00'}"
        ></el-time-select>
      </el-form-item>

      <el-form-item label="远端数据" v-if="selectWidget.type=='cascader'">
        <div>
          <el-input size="mini" style v-model="selectWidget.options.remoteFunc">
            <template slot="prepend">远端方法</template>
          </el-input>
          <el-input size="mini" style v-model="selectWidget.options.props.value">
            <template slot="prepend">值</template>
          </el-input>
          <el-input size="mini" style v-model="selectWidget.options.props.label">
            <template slot="prepend">标签</template>
          </el-input>
          <el-input size="mini" style v-model="selectWidget.options.props.children">
            <template slot="prepend">子选项</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item label="大小" v-if="selectWidget.type=='imgupload'">
        宽度
        <el-input style="width:100px" v-model="selectWidget.options.size.width"></el-input>高度
        <el-input style="width:100px" v-model="selectWidget.options.size.height"></el-input>
      </el-form-item>
      <el-form-item label="最小值" v-if="selectWidget.type=='imgupload'">
        <el-input-number v-model="selectWidget.options.min" label="最小值"></el-input-number>
      </el-form-item>
      <el-form-item
        label="是否多选"
        v-if="selectWidget.type=='select' || selectWidget.type=='imgupload'"
      >
        <el-switch v-model="selectWidget.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <template v-if="selectWidget.type=='imgupload'">
        <el-form-item label="最大上传数">
          <el-input type="number" v-model.number="selectWidget.options.length"></el-input>
        </el-form-item>
        <template>
          <el-form-item label="图片上传地址" :required="true">
            <el-input v-model="selectWidget.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <template v-if="selectWidget.type=='blank'">
        <el-form-item label="绑定数据类型">
          <el-select v-model="selectWidget.options.defaultType">
            <el-option value="String" label="字符串"></el-option>
            <el-option value="Object" label="对象"></el-option>
            <el-option value="Array" label="数组"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="显示输入框" v-if="selectWidget.type=='slider'">
        <el-switch v-model="selectWidget.options.showInput"></el-switch>
      </el-form-item>
      <el-form-item label="最小值" v-if="selectWidget.type=='slider'">
        <el-input-number v-model="selectWidget.options.min" label="最小值"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="selectWidget.type=='slider'">
        <el-input-number v-model="selectWidget.options.max" label="最大值"></el-input-number>
      </el-form-item>
      <el-form-item label="步长" v-if="selectWidget.type=='slider'">
        <el-input-number v-model="selectWidget.options.step" label="步长"></el-input-number>
      </el-form-item>

      <el-form-item label="是否可搜索" v-if="selectWidget.type=='select'">
        <el-switch v-model="selectWidget.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item label="选项" v-if="Object.keys(selectWidget.options).indexOf('options')>=0">
        <el-radio-group
          v-model="selectWidget.options.remote"
          size="mini"
          style="margin-bottom:10px;"
        >
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="selectWidget.options.remote">
          <div>
            <el-input size="mini" style v-model="selectWidget.options.remoteFunc">
              <template slot="prepend">远端方法</template>
            </el-input>
            <el-input size="mini" style v-model="selectWidget.options.props.value">
              <template slot="prepend">值</template>
            </el-input>
            <el-input size="mini" style v-model="selectWidget.options.props.label">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template
            v-if="selectWidget.type=='radio' || (selectWidget.type=='select'&&!selectWidget.options.multiple)"
          >
            <el-radio-group v-model="selectWidget.options.defaultValue">
              <draggable
                tag="ul"
                :list="selectWidget.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in selectWidget.options.options" :key="index">
                  <el-radio :label="item.value" style="margin-right: 5px;">
                    <el-input
                      :style="{'width': selectWidget.options.showLabel? '90px': '180px' }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      style="width:90px;"
                      size="mini"
                      v-if="selectWidget.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;">
                    <i class="iconfont icon-icon_bars"></i>
                  </i>
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
            </el-radio-group>
          </template>

          <template
            v-if="selectWidget.type=='checkbox' || (selectWidget.type=='select' && selectWidget.options.multiple)"
          >
            <el-checkbox-group v-model="selectWidget.options.defaultValue">
              <draggable
                tag="ul"
                :list="selectWidget.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in selectWidget.options.options" :key="index">
                  <el-checkbox :label="item.value" style="margin-right: 5px;">
                    <el-input
                      :style="{'width': selectWidget.options.showLabel? '90px': '180px' }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      style="width:90px;"
                      size="mini"
                      v-if="selectWidget.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;">
                    <i class="iconfont icon-icon_bars"></i>
                  </i>
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
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
          </div>
        </template>
      </el-form-item>

      <el-form-item label="支持透明度选择" v-if="selectWidget.type=='color'">
        <el-switch v-model="selectWidget.options.showAlpha"></el-switch>
      </el-form-item>

      <el-form-item label="最大值" v-if="selectWidget.type=='rate'">
        <el-input-number v-model="selectWidget.options.max" label="最大值"></el-input-number>
      </el-form-item>
      <el-form-item label="允许半选" v-if="selectWidget.type=='rate'">
        <el-switch v-model="selectWidget.options.allowHalf"></el-switch>
      </el-form-item>

      <el-form-item label="显示类型" v-if="selectWidget.type=='date'">
        <el-select v-model="selectWidget.options.type">
          <el-option
            v-for="item in selectWidget.options.options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否为范围选择" v-if="selectWidget.type=='time'">
        <el-switch v-model="selectWidget.options.isRange"></el-switch>
      </el-form-item>
      <el-form-item label="占位内容" v-if="selectWidget.type=='time'&&!selectWidget.options.isRange">
        <el-input v-model="selectWidget.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="开始时间占位内容" v-if="selectWidget.type=='time'&&selectWidget.options.isRange">
        <el-input v-model="selectWidget.options.startPlaceholder"></el-input>
      </el-form-item>
      <el-form-item label="结束时间占位内容" v-if="selectWidget.type=='time'&&selectWidget.options.isRange">
        <el-input v-model="selectWidget.options.endPlaceholder"></el-input>
      </el-form-item>

      <el-form-item label="布局方式" v-if="Object.keys(selectWidget.options).indexOf('inline')>=0">
        <el-radio-group v-model="selectWidget.options.inline">
          <el-radio-button :label="false">块级</el-radio-button>
          <el-radio-button :label="true">行内</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="最小值" v-if="selectWidget.type=='number'">
        <el-input-number v-model="selectWidget.options.min"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="selectWidget.type=='number'">
        <el-input-number v-model="selectWidget.options.max"></el-input-number>
      </el-form-item>
      <el-form-item label="步长" v-if="selectWidget.type=='number'">
        <el-input-number v-model="selectWidget.options.step" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="默认值" v-if="selectWidget.type=='number'">
        <el-input-number v-model="selectWidget.options.defaultValue" :min="0" :max="9"></el-input-number>
      </el-form-item>

      <rule-config v-if="!selectWidget.isContainer"></rule-config>

    </el-form>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import Clipboard from "clipboard";
import EntityPropertySelect from "./EntityPropertySelect";
import TabsConfig from "./TabsConfig";
import GridConfig from "./GridConfig";
import RuleConfig from "./RuleConfig";
export default {
  components: {
    Draggable,
    EntityPropertySelect,
    TabsConfig,
    GridConfig,
    RuleConfig
  },
  data() {
    return {
      selectWidget: this.$store.state.selectWidget,
      
    };
  },
  created() {
    
  },
  methods: {
    handleOptionsRemove(index) {
        this.selectWidget.options.options.splice(index, 1);
    },
    handleSelectMuliple(value) {
      if (value) {
        if (this.selectWidget.options.defaultValue) {
          this.selectWidget.options.defaultValue = [
            this.selectWidget.options.defaultValue,
          ];
        } else {
          this.selectWidget.options.defaultValue = [];
        }
      } else {
        if (this.selectWidget.options.defaultValue.length > 0) {
          this.selectWidget.options.defaultValue = this.selectWidget.options.defaultValue[0];
        } else {
          this.selectWidget.options.defaultValue = "";
        }
      }
    },
    handleAddOption() {
      if (this.selectWidget.options.showLabel) {
        this.selectWidget.options.options.push({
          value: "新选项",
          label: "新选项",
        });
      } else {
        this.selectWidget.options.options.push({
          value: "新选项",
        });
      }
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