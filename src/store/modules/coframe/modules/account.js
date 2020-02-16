import {
    loginApi
} from '@/api'
const state = {

}

const mutations = {

}

const actions = {
    /**
     * @description 登录
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     */
    login({
        dispatch
    }, loginForm) {
        return new Promise((resolve, reject) => {
            loginApi.createLogin({
                    data: loginForm
                })
                .then(async res => {
                    resolve(res)
                })
                .catch(err => {
                    console.log('err: ', err)
                    reject(err)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}