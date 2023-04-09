import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userInfo: {},
      token: "",
    };
  },
  mutations: {
    getUserInfo: function(state, data) {
      state.token = data.token;
      state.userInfo = data.userInfo;
    }
  },
  actions: {
  },
});

export default store;
