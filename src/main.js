import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// flex 布局库
import 'flex.css'
import '@babel/polyfill'

import '@/plugin/element.js'

import 'element-ui/lib/theme-chalk/index.css'

import splitPane from 'vue-splitpane'
import App from './App.vue'
import {
    router
} from './router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(async(to, from, next) => {
    console.log(to);
    console.log(from)
        // 进度条
    NProgress.start()
    console.log(store.state.coframe.user.token)
    if (store.state.coframe.user.token) { // 判断是否有token

        if (Object.keys(store.state.coframe.user.userInfo).length === 0) { // 判断当前用户是否已拉取完user_info信息
            // 用户登录后拉取user_info信息
            let {
                data,
                status
            } = await store.dispatch('coframe/user/load')
            if (status === 200) {
                // 成功拉取用户信息
                // 用户登录后从本地数据库加载一系列的设置,这里不用异步，先跳转，在加载也可以
                store.dispatch('coframe/theme/load')
                    // 从数据库加载用户菜单信息,登陆页默认不成功,刷新页面重新执行
                store.dispatch('coframe/menu/load', app, data.id)

                next({
                    ...to,
                    replace: true
                })
            }
        } else {
            next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        }
    } else {
        if (to.path === "/login") {
            next()
        } else {
            next('/login')
        }

    }
})

router.afterEach(() => {
    // 进度条
    NProgress.done()
})
import store from './store'

//Vue router 页面 刷新 不会进到router.beforeEach,因为在挂载el之后检查的路由，把路由放前面就好了
router.beforeEach(async(to, from, next) => {
    console.log(to);
    console.log(from)
        // 进度条
    console.log(store.state.coframe.user.token)
    if (store.state.coframe.user.token) { // 判断是否有token
        if (to.path === '/login') {
            next({
                path: '/'
            });
        } else {
            if (Object.keys(store.state.coframe.user.userInfo).length === 0) { // 判断当前用户是否已拉取完user_info信息
                // 用户登录后拉取user_info信息

                NProgress.start()
                let {
                    data,
                    status
                } = await store.dispatch('coframe/user/load')
                if (status === 200) {
                    // 成功拉取用户信息
                    // 用户登录后从本地数据库加载一系列的设置,这里不用异步，先跳转，在加载也可以
                    store.dispatch('coframe/theme/load')
                        // 从数据库加载用户菜单信息,登陆页默认不成功,刷新页面重新执行
                    store.dispatch('coframe/menu/load', app, data.id)

                    next({
                        ...to,
                        replace: true
                    })
                }
            } else {
                NProgress.start()
                next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
            }
        }

    } else {
        if (to.path === "/login") {
            NProgress.start()
            next()
        } else {
            NProgress.start()
            next('/login')
        }

    }
})

router.afterEach(() => {
    // 进度条
    NProgress.done()
})

import './icons'
// 组件
import '@/components'

Vue.component('split-pane', splitPane)

Vue.config.productionTip = false
    // 当前的 baseUrl
Vue.prototype.$baseUrl = process.env.BASE_URL
var app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
export default app;


// // // 从数据库加载用户菜单信息,登陆页默认不成功,刷新页面重新执行
// store.dispatch('coframe/menu/load', app)
//     // console.log(app)