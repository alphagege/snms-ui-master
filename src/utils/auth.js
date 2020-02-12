import Cookies from 'js-cookie'
import {
  localStore
} from '@util/sessionStore'

const TokenKey = 'Admin-Token'

// 从ls中获取用户信息，获取不到则返回{}
export function getUser () {
  if (localStore.get('user')) return localStore.get('user')
  else return {}
}

// 从cookie 中 获取token
export function getToken () {
  return Cookies.get(TokenKey)
}
// 从cookie中设置token
export function setToken (token, params) {
  return Cookies.set(TokenKey, token, params)
}
// 从cookie 中 移除token
export function removeToken () {
  return Cookies.remove(TokenKey)
}
