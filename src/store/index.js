import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userInfo: {},
      token: "",
      yuntuYear: 2023,
      entCreditCode: '',
      entList: []
    };
  },
  mutations: {
    getUserInfo: function(state, data) {
      state.token = data.token;
      state.userInfo = data.userInfo;
    },
    getYuntuYear: function(state, data) {
      state.yuntuYear = data.yuntuYear
    },
    getEntCode: function(state, data) {
      state.entCreditCode = data.creditCode
    },
    getEntData: function(state, data) {
      state.entList = data.entList
    }
  },
  actions: {
  },
});

export default store;
