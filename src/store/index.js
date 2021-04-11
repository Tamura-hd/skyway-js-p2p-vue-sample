import Vue from 'vue'
import Vuex from 'vuex'
import { skyway } from './modules/skyway'
import { message } from './modules/message'

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    makeCallingModalShow: false,
    incomingCallModalShow: false,
    makeCallDisabled: false,
  }),

  getters: {
    makeCallingModalShow (state) {
      return state.makeCallingModalShow;
    },
    incomingCallModalShow (state) {
      return state.incomingCallModalShow;
    },
    makeCallDisabled (state) {
      return state.makeCallDisabled;
    }
  },

  mutations: {
    setMakeCallingModalShow (state, payload) {
      state.makeCallingModalShow = payload;
    },
    setIncomingCallModalShow (state, payload) {
      state.incomingCallModalShow = payload;
    },
    setMakeCallDisabled (state, payload) {
      state.makeCallDisabled = payload;
    }
  },

  actions: {    
    async setMakeCallingModalShow ({ commit }, dialog) {
      commit('makeCallingModalShow', dialog);
    },
    async setMakeCallDisabled ({ commit }, disabled) {
      commit('setMakeCallDisabled', disabled);
    }
  },

  modules: {
    skyway,
    message,
  },
  strict: process.env.NODE_ENV !== 'production'
});