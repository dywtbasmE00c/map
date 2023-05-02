import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      userInfo: {},
      token: "",
      yuntuYear: 2023,
      entName: '',
      entCreditCode: '',
      entList: [],
      entPoint: []
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
    },
    getEntPoint: function(state, data) {
      state.entPoint[0] = data.longitude
      state.entPoint[1] = data.latitude
    },
    getEntName: function(state, data) {
      state.entName = data.entName
    }
  },
  actions: {
  },
});

export default store;
