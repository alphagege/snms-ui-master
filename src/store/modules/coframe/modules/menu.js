import {
    userApi
} from '@/api'
import {
    asyncRouterMap,
    resetRouter
} from "@/router"
// console.log(asyncRouterMap)
const state = {
    // 菜单信息
    menuInfo: []
}

const mutations = {
    setMenuInfo: (state, menuInfo) => {
        state.menuInfo = menuInfo
    }
}

const getters = {
    menuInfo(state) {
        return state.menuInfo
    }

}

// const actions = 
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
         * @description 从数据库取用户菜单
         * @param {Object} context
         */
        load({
            commit
        }, vm) {
            console.log(vm)
            return new Promise(async resolve => {
                const resUser = await userApi.getUserInfo()
                if (resUser.status === 200) {
                    userApi.getUserMenus({
                        pathParams: {
                            id: resUser.data.id
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
                }
            })
        }
    }
}