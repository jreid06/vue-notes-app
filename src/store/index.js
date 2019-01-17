import Vue from 'vue'
import Vuex from 'vuex';

import hub from './app'
import note from './modules/note'
import category from './modules/category'
import Storage from './../classes/LocalForageClass'
// import store from './';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hub,
    note,
    category
  },
  mutations: {
    syncDatabase(state, payload) {
      let categories, notes;
      switch (payload.load) {
        case 'categories':
          state.category.categories.all = payload.data;
          // payload.next();
          break;
        case 'notes':
          state.note.notes.all = payload.data;
          // payload.next();
          break;
      }
    },
  },
  actions: {
    async syncDatabaseAction({
      commit
    }, payload) {
      let categories, notes;

      switch (payload.load) {
        case 'categories':
          await Storage.allCategories().then((res) => {
            console.log('SYNC DATABASE CATEGORIES');
            // update the store with a fresh load
            categories = res;
          }).catch((err) => {
            categories = [];
          })

          //  state.category.categories.all = payload.data;
          payload.data = categories;
          commit('syncDatabase', payload);
          break;
        case 'notes':
          await Storage.allNotes().then((res) => {
            console.log('SYNC DATABASE NOTES');
            // update the store with a fresh load
            notes = res;
          }).catch((err) => {
            notes = [];
          })

          payload.data = notes;
          commit('syncDatabase', payload);
          break;
      }
    }
  }
})
