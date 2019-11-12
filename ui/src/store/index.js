import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dustbin from './modules/dustbin'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    dustbin: dustbin
  }
})
