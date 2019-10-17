/* eslint-disable no-empty-label */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permit from './modules/permit'
import user from './modules/user'
import tag from './modules/tag'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permit,
    tag
  },
  getters
})

export default store
