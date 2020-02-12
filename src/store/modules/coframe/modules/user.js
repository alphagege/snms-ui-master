import {
    userApi
} from '@/api'
const state = {
    // 用户信息
    userInfo: {}
}

const mutations = {
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
    }
}

const getters = {
    userInfo(state) {
        return state.userInfo
    }

}

const actions = {
    /**
     * @description 从数据库取用户数据
     * @param {Object} context
     */
    load({
        commit
    }) {
        return new Promise(async resolve => {
            userApi.getUserInfo().then(res => {
                commit('setUserInfo', res.data)
                resolve(res)
            }).catch(err => {
                console.log(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}