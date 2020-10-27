import Vue from 'vue'
import Vuex from 'vuex'

import login from "./login";
import my from "./my";
import chat from "./chat";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions:{
  },
  modules: {
    login,
    my,
    chat,
  }
})
