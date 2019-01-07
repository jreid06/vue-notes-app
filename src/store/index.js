import Vue from 'vue'
import Vuex from 'vuex';

import hub from './app'
import note from './modules/note'
import category from './modules/category'
import Storage from './../classes/LocalForageClass'

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
            // update the store with a fresh load
            console.log('CATEGORY SYNC');
            console.log(res);
            console.log(state);

            state.category.categories.all = res;
          }).catch((err) => {
            console.log('NO DATA');
            console.log(err);

          })
          break;
        case 'notes':
          Storage.allNotes().then((res) => {
            // update the store with a fresh load
            console.log('NOTES SYNC');
            console.log(res);
            console.log(state);

            state.note.notes.all = res;
          }).catch((err) => {
            console.log('NO DATA');
            console.log(err);

          })
          break;

        default:
          break;
      }
    },
  }
})
