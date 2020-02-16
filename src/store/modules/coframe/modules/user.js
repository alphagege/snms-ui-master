import {
    userApi
} from '@/api'
import util from '@/libs/util.js'
const state = {
    // 用户信息
    userInfo: {},
    // token信息
    token: util.cookies.get('token') || ''
}

const mutations = {
    setUserInfo: (state, userInfo) => {
        state.userInfo = userInfo
    },
    setToken: (state, token) => {
        state.token = token
    }
}

const getters = {
    userInfo(state) {
        return state.userInfo
    },
    token(state) {
        return state.token
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
                commit('setUserInfo', res.data) //vuex中存储用户信息(将来也可以存入token)
                util.cookies.set('uuid', res.data.username) // 将用户名存入cookie中(将来也可以存入token)
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