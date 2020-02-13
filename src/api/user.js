import service from './serviceModule'

const user = [{
  name: 'getUserInfo',
  url: `/user/me`
}, {
  name: 'getUserMenus',
  url: `${service.coframe}/user-accounts/granted-menus`
}]
export default user
