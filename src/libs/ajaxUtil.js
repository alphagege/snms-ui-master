import axios from 'axios'
import _ from 'lodash'
import Vue from 'vue'
import * as auth from '@/utils/auth.js'
// 上面这个语法就是把导出的方法整合称一个大对象 并以auth命名，使用就是auth.getUser()这么用

const ajaxUtil = {}
ajaxUtil.title = function (title) {}

const ajaxUrl = '/auditing'

ajaxUtil.config = {
  baseURL: ajaxUrl, // 基础url
  timeout: 30000, // 超时时间
  responseType: 'json' // responseType 属性是一个枚举类型的属性，返回响应数据的类型。它允许我们手动的设置返回数据的类型
}
// 如果是本地联调环境则配置超市时间为30s
if (process.env.NODE_ENV === 'development') {
  ajaxUtil.config.timeout = 30000
}
// 将axios生成实例的方法 赋值给ajaxUtil的create属性
ajaxUtil.create = axios.create

// 设置创建实例的方法写入header字段中会合并传入的header
ajaxUtil.headers = headers => {
  return {
    ajax: axios.create({
      ...ajaxUtil.config,
      headers: headers
    })
  }
}
// 创建axios默认实例，不会自定义headers
ajaxUtil.ajax = axios.create(ajaxUtil.config)

// 将参数整合成？a=111&b=222的形式
ajaxUtil.stitchingParams = (url, payload, all) => {
  // console.log(url) // /api/dimensions/search
  // console.log(payload) // {limit: 10, offset: 1}
  // console.log(all) // true
  if (!all) { // 如果all为false  conframe ajax好像不会进这个方法
    // alert()
    if (payload && payload.params) { // 并且payload和payload.params都有值
      return ajaxUtil.stitchingParams(url, payload.params, true) // 递归调用这个方法
    } else {
      return url + '?_timestamp=' + Math.random(10) // 加上一个随机数
    }
  }
  const params = _.keys(payload) // 取出payload中的key形成一个数组[limit,offset]
    .map(k => {
      // console.log(k)
      if (_.isNull(payload[k]) || _.isUndefined(payload[k]) || _.isEqual(payload[k], '')) {
        return null // 将数组value值为空的返回null
      } else { // 如果不为空
        if (ajaxUtil.isMock(url)) { // 如果url包含mock路径的
          // console.log(k + '=' + payload[k])
          return k + '=' + payload[k]
        } else { // dev环境一般不包含mock路径所以一般进这里
          if (_.isArray(payload[k])) {
            // console.log(_.reduce(
            //         payload[k],
            //         (k1, k2) => {
            //             return `${k1}&${k}=${encodeURI(k2)}`
            //         },
            //         '',
            //     ))
            return _.reduce(
              payload[k],
              (k1, k2) => {
                return `${k1}&${k}=${encodeURI(k2)}`
              },
              ''
            )
          } else if (k === 'offset') {
            return Vue.config.pagination.offsetAlias + '=' + (payload[k] - 1) // 这里的-1就是获取第一页数据传0  获取第二页数据传1 以此类推 转换成pageNum
          } else if (k === 'limit') {
            return Vue.config.pagination.limitAlias + '=' + payload[k] // 设置每页有多少条
          } else if (k === 'sortField') {
            if (payload.sortOrder === 'normal') return null
            else return `sort_by=${payload.sortField}:${payload.sortOrder}`
          } else if (k === 'sortOrder') {
            return null
          } else return k + '=' + encodeURI(payload[k])
        }
      }
    })
    .filter(m => m !== null)
    .join('&')
  // console.log(params) // 最终将params整合成url拼接的形式
  // dimensionId=27000099&mainDimension=false&listRoot=true
  // pageSize=10&pageNum=0&dimensionId=27000099&mainDimension=false&listRoot=true
  const s = url + (params === '' ? '?' : '?' + params + '&') + '_timestamp=' + Math.random(10)
  // 如果params为空字符串，则只在后面跟'?_timestamp='加随机数
  if (process.env.NODE_ENV === 'development') {
    // console.log(s)
  }
  return s
}

// 传一个res返回 响应
ajaxUtil.mockHandler = res => {
  return {
    source: 'mock',
    loading: false,
    error: res.errorMsg,
    data: res.data.content || 'data format error!'
  }
}

// const tokenExpires = 1 / 24 / 60 * 25
ajaxUtil.myRequest = (action, payload) => {
  // console.log(action); // 接口描述对象
  // console.log(payload) // 参数
  let url = action.url(payload) || '/'
  // console.log(url);/api/dimensions/search
  const refreshToken = _.get(payload, 'refreshToken', true)
  // console.log(refreshToken)
  // true
  // console.log(refreshToken);
  // console.log(payload)
  if (action.method === 'get') url = ajaxUtil.stitchingParams(url, payload, true)
  else url = ajaxUtil.stitchingParams(url, payload, false)
  // console.log(url)
  // 此处代码原本为防止短时间没发送重复的请求而设置，但是为了employee-select-text控件会短时间内查询两次同一个id的情况去掉这个限制
  // if (Vue.config.last_request && url === Vue.config.last_request.url) {
  //   return;
  // }
  // Vue.config.last_request = {
  //   url: url,
  //   payload: payload,
  // }
  // setTimeout(() => {
  //   Vue.config.last_request = null;
  // }, 300);
  const token = auth.getToken() // 获取token
  // console.log(token)
  // const params = {expires: tokenExpires};
  // if (!!token && refreshToken) {
  //   auth.setToken(token);
  // }
  // else if (url.includes('/api/uc/users/login')  && url.includes('/api/sso/users/tologin') && refreshToken) {
  //   return new Promise((resolve, reject) => {
  //     resolve('AUTH_TOKEN_EXPIRED')
  //   })
  // }

  return new Promise((resolve, reject) => {
    // console.log(Vue.config)
    // console.log(ajaxUtil.payloadWrapper(action, url, payload))
    ajaxUtil
      .headers({
        Authorization: token,
        Locale: Vue.config.lang,
        Channel: 'website',
        overflow: false
      })
      .ajax({
        url: url,
        method: action.method || 'get',
        data: ajaxUtil.payloadWrapper(action, url, payload) // 整合api
      })
      .then(response => {
        console.log('refreshToken')
        console.log(refreshToken)
        if (refreshToken) {
          if (response.headers.Authorization) {
            console.log('设置token')
            auth.setToken(response.headers.Authorization)
          } else if (response.headers.authorization) {
            console.log('设置token')
            auth.setToken(response.headers.authorization)
          }
        }
        resolve(response)
      })
      .catch(res => {
        reject(res.response)
      })
  })
}

ajaxUtil.apiHandler = ({
  data
}) => {
  let error = null
  const keys = _.keys(data)
  if (_.includes(keys, 'offset') && _.includes(keys, 'limit')) {
    _.forEach(keys, key => {
      if (key === 'offset') {
        data[key] = data[key] + 1
      } else if (key === 'limit' || key === 'more' || key === 'total') {
        data[key] = data[key]
      } else if (key === 'errorCode') {
        error = data[key]
      } else if (key === 'error') {
        error = data.error.code
      } else {
        data.list = data[key]
        delete data[key]
      }
    })
  }
  // 整合后台的响应
  return {
    source: 'api',
    loading: false,
    error: error,
    data: data
  }
}

ajaxUtil.isMock = url => {
  return /^\/mock/.test(url)
}

ajaxUtil.payloadWrapper = (action, url, payload) => {
  if (payload) {
    if (payload.payload) {
      return payload.payload
    } else return payload
  }
}
// console.log(ajaxUtil)
export default ajaxUtil
