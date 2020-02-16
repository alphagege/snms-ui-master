import axios from 'axios'
import {
    router
} from '@/router'

import {
    Message
} from 'element-ui'
// 显示错误
function errorLog(error) {
    // 显示提示
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
}
// 创建一个 axios 实例
const service = axios.create({
    baseURL: '/auditing',
    // timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // can add common header for all request
        if (!config.headers) {
            config.headers = {
                'Content-Type': 'application/json'
            }
        }
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // can add common handle response
        return response
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    router.push({
                        path: '/login'
                    })
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }
        errorLog(error)
        return Promise.reject(error)
            // if (error.response.status === 401) {
            //     console.log(error)
            //     router.push({
            //         name: 'login'
            //     })
            // } else {
            //     // 显示提示
            //     this.$Message({
            //         message: error.response.data.message,
            //         type: 'error',
            //         duration: 5 * 1000
            //     })
            // }
            // return Promise.reject(error)
    }
)

export default service