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
          // Storage.allCategories().then((res) => {

          //   console.log('SYNC DATABASE CATEGORIES');
            
          //   console.log(res);

          //   // update the store with a fresh load
          //   state.category.categories.all = res;
          // }).catch((err) => {
          //   console.log('NO DATA');
          //   console.log(err);
          //   state.category.categories.all = [];
          // })

          categories = Storage.allCategories();
          console.log('categories return');
          
          console.log(categories);
          if(categories.length > 0){
            state.category.categories.all = categories;
          }
          
          break;
        case 'notes':
          // Storage.allNotes().then((res) => {
          //   // update the store with a fresh load
          //   state.note.notes.all = res;
          // }).catch((err) => {
          //   console.log('NO DATA');
          //   console.log(err);

          //    state.note.notes.all = [];

          // })

           notes = Storage.allNotes();

           console.log(typeof notes);
           console.log(notes);
          //  if (notes.length > 0) {
          //    state.note.notes.all = notes;
          //  }
          break;
      }
    },
  }
})
