import Vue from 'vue'
import CoContainer from './ScrollContainer'

Vue.component('co-container', CoContainer)
Vue.component('coframe-icon', () =>
    import('./FontIcon'))
