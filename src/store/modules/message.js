export const message = {
  namespaced: true,
  state: () => ({
    notConnection: ''
  }),

  getters: {    
    notConnection (state) {
      return state.notConnection;
    }
  },

  mutations: {    
    setNotConnection (state, message) {
      state.notConnection = message;
    }
  }
}