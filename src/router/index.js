import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout'
// import Admin from './modules/coframe'



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
    },
    {
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
    }
]

export const asyncRouterMap = [
    // ...Admin
]


export function resetRouter($router, newRouters) {
    console.log($router)
    console.log(newRouters)
    $router.addRoutes(newRouters);
    console.log($router)
}

export const router = new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap.concat(asyncRouterMap)
})