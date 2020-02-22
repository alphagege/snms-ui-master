/*
 * @Author: dongwenjie 
 * @Date: 2020-02-16 17:28:29 
 * @Description 系统管理->系统资源->菜单管理api
 * @Last Modified by: dongwenjie
 * @Last Modified time: 2020-02-18 19:37:01
 */
import service from '../serviceModule'

const systemMenu = [{
        // 拉取菜单树api
        name: 'getSystemMenu',
        url: `${service.coframe}/menus`
    },
    //添加菜单
    {
        name: "createSystemMenu",
        url: `${service.coframe}/menus`
    },
    //删除菜单信息
    {
        name: "deleteSystemMenu",
        url: `${service.coframe}/menus/{menuId}`
    },
    //编辑菜单信息
    {
        name: "updateSystemMenu",
        url: `${service.coframe}/menus/{menuId}`
    },
]
export default systemMenu