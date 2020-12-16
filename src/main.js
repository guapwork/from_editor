import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './assets/icon/iconfont.css'
import Mock from "@/mock"
import VueEditor from 'vue2-editor'
import './styles/cover.scss'
import './styles/index.scss'

import commonApi from './commonApi'
Vue.prototype.commonApi = commonApi;

// 添加elementUI的组件与样式
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.use(VueEditor)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')