import { createStore } from "vuex";
import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
    key: 'my-app', // The key to store the state on in the storage provider.
    storage: localStorage, // or sessionStorage
  });


export default createStore({
    plugins: [vuexPersist.plugin],
    state: {
        workbooks: JSON.parse(localStorage.getItem('workbooks')) || [],
    },
    getters: {
        allWorkbooks: (state) => state.workbooks,
    },
    mutations: {
        ADD_WORKBOOK(state, workbook) {
            state.workbooks.push(workbook);
            localStorage.setItem('workbooks', JSON.stringify(state.workbooks));
          },
          DELETE_WORKBOOK(state, index) {
            state.workbooks.splice(index, 1);
            localStorage.setItem('workbooks', JSON.stringify(state.workbooks));
          },
    },
    actions: {
        addWorkbook({ commit }, payload) {
            const workbook = payload.jsonObject;  // Extract the workbook array
            if (workbook) {
              commit('ADD_WORKBOOK', workbook);
            }
          },
          deleteWorkbook({ commit }, index) {
            commit('DELETE_WORKBOOK', index);
          },
    }
})