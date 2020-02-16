import {
    generate
} from '../libs/apiGenerator'
import login from './login'
import user from './user'
import systemMenu from './coframe/system-menu'
const api = {
    login,
    user,
    systemMenu
}
const apiObject = generate(api)
export const loginApi = apiObject.login
export const userApi = apiObject.user
export const systemMenuApi = apiObject.systemMenu