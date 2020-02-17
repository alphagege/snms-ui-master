import Vue from 'vue'
import Vuex from 'vuex'

import coframe from './modules/coframe'
Vue.use(Vuex)

const store = new Vuex.Store({
    // namespaced: true,
    modules: {
        coframe
    }
})
export default store