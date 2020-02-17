import {
    userApi,
    systemMenuApi

} from '@/api'
import {
    asyncRouterMap,
    resetRouter
} from "@/router"
const state = {
    // 用户菜单信息
    menuInfo: [],
    // 系统管理->系统资源->菜单管理->菜单树
    allMenuInfo: []
}

const mutations = {
    setMenuInfo: (state, menuInfo) => {
        console.log(menuInfo)
        state.menuInfo = menuInfo
    },
    setAllMenuInfo: (state, allMenuInfo) => {
        state.allMenuInfo = allMenuInfo
    }
}

const getters = {
    menuInfo(state) {
        return state.menuInfo
    },
    allMenuInfo(state) {
        return state.allMenuInfo
    }


}

// 控制台报错 Cannot read property 'range' of null 降级babel-eslint


function constructRoute(menu) {
    // alert()
    let dynamicComponent
    let {
        openMode,
        menuLevel,
        menuPath
    } = menu
    try {
        console.log(menuLevel)
        if (menuLevel === 1) {
            // 第一级菜单component置为layout
            dynamicComponent = () =>
                import ('@/views/layout')
            menu.component = dynamicComponent

        }
        if (openMode === 'in_self' || openMode === 'in_blank') {
            if (process.env.NODE_ENV == "development") {
                dynamicComponent = require(`@/views/${menuPath.slice(1)}/index.vue`).default;

                console.log(dynamicComponent)
            } else {
                dynamicComponent = () =>
                    import (`@/views/${menuPath.slice(1)}/index.vue`)
            }


        } else if (openMode === 'out_self') {
            dynamicComponent = {
                template: `<iframe style="padding: 0px" src="http://${menuPath}"></iframe>`
            }
        }
    } catch (e) {
        dynamicComponent = require('@/views/error-page/404.vue').default
    }
    menu.component = dynamicComponent

}
const blankRouter = [];

/**
 *
 * @description 整合从后台返回的菜单数据，并挂载至router
 * @param {*} menu 后台返回的菜单数据
 */
function transformRouter(menus) {
    for (var i in menus) {
        menus[i].meta = {
            title: menus[i].menuName,
            icon: menus[i].menuIcon
        }
        menus[i].path = menus[i].menuPath;
        menus[i].name = menus[i].menuId;
        constructRoute(menus[i]);
        // console.log(route)
        if (menus[i].children) {
            transformRouter(menus[i].children);

        }
    }
    return menus
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions: {
        /**
         *
         * @description 加载整合动态菜单
         * @param {*} {commit}
         * @param {*} vm vue实例对象
         * @param {*} id 标识具体用户
         * @returnsn Promise对象
         */
        load({
            commit
        }, vm, id) {
            console.log(vm)
            return new Promise(async resolve => {
                userApi.getUserMenus({
                    pathParams: {
                        id: id
                    }
                }).then(res => {
                    asyncRouterMap.length = 0; //置空 防止多次登陆累加
                    let menuList = transformRouter(res.data);
                    asyncRouterMap.push(...menuList)
                    console.log(asyncRouterMap)
                    commit('setMenuInfo', menuList)
                    resetRouter(vm.$router, asyncRouterMap.concat(blankRouter));
                }).catch(err => {
                    // console.log(err)
                })
            })
        },

        /**
         *
         * @description 系统管理->系统资源->菜单管理->获取所有菜单树
         * @param {*} {commit}
         * @returns Promise对象
         */
        getAllMenuInfo({
            commit
        }) {
            return new Promise(async resolve => {
                systemMenuApi.getSystemMenu().then(res => {
                    commit("setAllMenuInfo", res.data)
                }).catch(err => {

                })
            })
        }
    }
}