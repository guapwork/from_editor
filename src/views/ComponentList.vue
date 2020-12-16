<template>
  <div class="components-list">
    <template>
      <div class="widget-cate">基础表单</div>
      <draggable
        tag="ul"
        :list="basicComponents"
        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
        :move="handleMove"
      >
        <li
          class="form-edit-widget-label"
          :class="{'no-put': item.type == 'divider'}"
          v-for="(item, index) in basicComponents"
          :key="index"
        >
          <a>
            <i class="icon iconfont" :class="item.icon"></i>
            <span>{{item.name}}</span>
          </a>
        </li>
      </draggable>
    </template>

    <template>
      <div class="widget-cate">高级表单</div>
      <draggable
        tag="ul"
        :list="advanceComponents"
        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
        :move="handleMove"
      >
        <li
          class="form-edit-widget-label"
          :class="{'no-put': item.type == 'table'}"
          v-for="(item, index) in advanceComponents"
          :key="index"
        >
          <a>
            <i class="icon iconfont" :class="item.icon"></i>
            <span>{{item.name}}</span>
          </a>
        </li>
      </draggable>
    </template>

    <template>
      <div class="widget-cate">布局表单</div>
      <draggable
        tag="ul"
        :list="layoutComponents"
        v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
        :move="handleMove"
      >
        <li
          class="form-edit-widget-label no-put"
          v-for="(item, index) in layoutComponents"
          :key="index"
        >
          <a>
            <i class="icon iconfont" :class="item.icon"></i>
            <span>{{item.name}}</span>
          </a>
        </li>
      </draggable>
    </template>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import {
  basicComponents,
  layoutComponents,
  advanceComponents,
} from "../components/Config/componentsConfig.js";

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
    };
  },
  methods: {
    handleMove() {
      return true;
    },
  },
};
</script>


<style lang="scss" >
$primary-color: #409eff;
$primary-background-color: #ecf5ff;
.components-list {
  padding: 8px 0;
  width: 100%;
  .widget-cate {
    padding: 8px 12px;
    font-size: 13px;
  }
  ul {
    position: relative;
    overflow: hidden;
    padding: 0 10px 10px;
    margin: 0;
  }
  .form-edit-widget-label {
    font-size: 12px;
    display: block;
    width: 47%;
    line-height: 26px;
    position: relative;
    float: left;
    left: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1%;
    color: #333;
    border: 1px solid #f4f6fc;
    &:hover {
      color: $primary-color;
      border: 1px dashed $primary-color;
    }
    & > a {
      display: block;
      cursor: move;
      background: #f4f6fc;
      border: 1px solid #f4f6fc;
      .icon {
        margin-right: 6px;
        margin-left: 8px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>