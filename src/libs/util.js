import cookies from './util.cookies'
import db from './util.db'

const util = {
    cookies,
    db
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function(titleText) {
        const processTitle = process.env.VUE_APP_TITLE || 'coframe'
        window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'coframe-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('coframe-link-temp'))
}

export default util