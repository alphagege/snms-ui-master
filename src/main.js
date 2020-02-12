import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// flex 布局库
import 'flex.css'
import '@babel/polyfill'

import '@/plugin/element.js'

import 'element-ui/lib/theme-chalk/index.css'

import splitPane from 'vue-splitpane'
import App from './App.vue'
import router from './router'

import store from './store'

import './icons'
// 组件
import '@/components'

Vue.component('split-pane', splitPane)

Vue.config.productionTip = false
    // 当前的 baseUrl
Vue.prototype.$baseUrl = process.env.BASE_URL
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')