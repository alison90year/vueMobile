import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'
import base from './modules/base'
import getters from "./getter";
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    base,
    home,
    user
  },
  getters
})

export default store