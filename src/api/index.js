import {
  generate
} from '../libs/apiGenerator'
import login from './login'
import user from './user'
const api = {
  login,
  user
}
const apiObject = generate(api)
export const loginApi = apiObject.login
export const userApi = apiObject.user
