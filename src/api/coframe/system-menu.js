/*
 * @Author: dongwenjie 
 * @Date: 2020-02-16 17:28:29 
 * @Description 系统管理->系统资源->菜单管理api
 * @Last Modified by: dongwenjie
 * @Last Modified time: 2020-02-16 17:33:59
 */
import service from '../serviceModule'

const systemMenu = [{
    // 拉取菜单树api
    name: 'getSystemMenu',
    url: `${service.coframe}/menus`
}]
export default systemMenu