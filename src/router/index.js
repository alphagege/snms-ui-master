import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout'
import Admin from './modules/coframe'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {
    userApi
} from '@/api'
Vue.use(Router)

export const constantRouterMap = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404.vue'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401.vue'),
        hidden: true
    }
]

export const asyncRouterMap = [{
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index.vue'),
            name: 'dashboard',
            meta: {
                title: '工作台',
                icon: 'dashboard'
            }
        }]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    ...Admin
]

const router = new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap.concat(asyncRouterMap)
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        userApi.getUserInfo().then(() => {})
    }

    // 进度条
    NProgress.start()
    next()
})

router.afterEach(() => {
    // 进度条
    NProgress.done()
})

export default router