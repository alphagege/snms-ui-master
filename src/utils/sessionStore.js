import localStore from 'store' // 从store中引入封装好的localstorge
import storages from 'store/storages/sessionStorage' // 从store引入封装好的sessionStorage
// 关闭浏览器 sessionstorge 被清空了  localstorage还在
export {
  localStore
}

console.log(localStore.createStore(storages, []))
export default localStore.createStore(storages, [])
