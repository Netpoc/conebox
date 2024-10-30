import { createStore } from "vuex";
import VuexPersist from "vuex-persist";
import axios from "axios";

const vuexPersist = new VuexPersist({ 
  storage: localStorage, // or sessionStorage
});

export default createStore({
  plugins: [vuexPersist.plugin],
  state: {
    workbooks: JSON.parse(localStorage.getItem("workbooks")) || [],
    token: localStorage.getItem('authToken') || null,
    user: localStorage.getItem('user') || null,
  },
  getters: {
    allWorkbooks: (state) => state.workbooks,
    isAuthenticated: state => !! state.token,
    getToken: state => state.token,
    getUser: state => state.user
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('authToken', token);
    },
    setUser(state, user) {
      state.user = user;
    },
    logout(state){
      state.token = null;
      state.user = null;      
      localStorage.clear();      
    },
    ADD_WORKBOOK(state, workbook) {
      state.workbooks.push(workbook);
      localStorage.setItem("workbooks", JSON.stringify(state.workbooks));
    },
    DELETE_WORKBOOK(state, index) {
      state.workbooks.splice(index, 1);
      localStorage.setItem("workbooks", JSON.stringify(state.workbooks));
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(`https://conebackend.onrender.com/api/auth/login`, {
          email,
          password
        });
        const { token, user } = response.data;
        commit('setToken', token);
        commit('setUser', user);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    addWorkbook({ commit }, payload) {
      const workbook = payload.jsonObject; // Extract the workbook array
      if (workbook) {
        commit("ADD_WORKBOOK", workbook);
      }
    },
    deleteWorkbook({ commit }, index) {
      commit("DELETE_WORKBOOK", index);
    },
    openWorkbook(state, workbook ) {
      state.workbooks      
    },
    logout({ commit }) {      
      commit('logout');
    }
  },
});
