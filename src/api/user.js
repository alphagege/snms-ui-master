/*
 * @Author: dongwenjie 
 * @Date: 2020-02-16 17:27:36 
 * @Description 用户信息和用户菜单等api
 * @Last Modified by: dongwenjie
 * @Last Modified time: 2020-02-16 21:25:49
 */

import service from './serviceModule'

const user = [{
    name: 'getUserInfo',
    url: `/user/me`
}, {
    name: 'getUserMenus',
    url: `${service.coframe}/user-accounts/granted-menus`
}]
export default user