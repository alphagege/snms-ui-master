import ajaxUtil from '@/libs/ajaxUtil'

export function login (user) {
  return ajaxUtil.ajax({
    url: 'login',
    method: 'post',
    data: user,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function logout () {
  return ajaxUtil.ajax({
    url: '/logout',
    method: 'post',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
}
