import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import getters from './getters'
import tagsView from './modules/tagsView'
import user from './modules/user'
import theme from './modules/theme'
import db from './modules/db'

Vue.use(Vuex)

const store = new Vuex.Store({
  // namespaced: true,
  modules: {
    app,
    settings,
    tagsView,
    user,
    theme,
    db
  },
  getters
})
export default store
