import Cookies from 'js-cookie' // 刚进来的时候是undefined
console.log(Cookies.get('sidebarStatus'))

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop' // 标识当前设备
}
const getters = {
  /**
     * @description 返回sidebar展开折叠状态
     * @param {Object} state vuex state
     */
  sidebar (state) {
    return state.sidebar
  },
  /**
     * @description 当前是什么分辨率的设备在登陆 移动orpc
     * @param {Object} state vuex state
     */
  device (state) {
    return state.device
  }
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened // 取反
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      // 展开状态下 cookie存值位1
      Cookies.set('sidebarStatus', 1)
    } else {
      // 闭合状态下 cookie存值位0
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false // 取反
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar ({
    commit
  }) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleDevice ({
    commit
  }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  closeSideBar ({
    commit
  }, {
    withoutAnimation
  }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
