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

      switch (payload.load) {
        case 'categories':
          Storage.allCategories().then((res) => {

            console.log('SYNC DATABASE CATEGORIES');
            
            console.log(res);

            // update the store with a fresh load
            state.category.categories.all = res;
          }).catch((err) => {
            console.log('NO DATA');
            console.log(err);
            state.category.categories.all = [];
          })
          break;
        case 'notes':
          Storage.allNotes().then((res) => {
            // update the store with a fresh load
            state.note.notes.all = res;
          }).catch((err) => {
            console.log('NO DATA');
            console.log(err);

             state.note.notes.all = [];

          })
          break;

        default:
          break;
      }
    },
  }
})
