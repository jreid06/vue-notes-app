// import { stat } from "fs";
import store from './../../store'
import Storage from './../../classes/LocalForageClass'
import Global from './../../Global'
import 'babel-polyfill'

const categoriesKey = Global.categoriesKey;
const notesKey = Global.notesKey;

const state = {
  categories: {
    loaded: false,
    selected: {},
    all: [],
    bookmarked: []
  }
}

const getters = {
  selectedCategory: state => {
    return state.categories.selected;
  },
  allCategories: state => {
    return state.categories.all;
  },
  getCategory: (state) => (id) => {
    let cat = '';
    state.categories.all.find((element, i) => {
      if (element.key === id) {
        //  cat = i;
        cat = element;
      }
    });

    return cat;
  }
}

const mutations = {
  deleteCategory(state, payload) {
    let cat;
    // find the category position in storage
    state.categories.all.find((element, i) => {
      if (element.key === payload) {
        cat = i;
        return;
      }
      return;
    });

    // delete the category
    state.categories.all.splice(cat, 1);

    // update storage
    Storage.updateCategories(state.categories.all);
  },
  updateSelectedCategory(state, payload) {
    state.categories.selected = payload;
  },
  updateAllCategories(state, payload) {
    // push recently created item into the array
    state.categories.all.push(payload);

    // update storage
    Storage.updateCategories(state.categories.all);
  },
  loadCategories(state, payload) {
    if (!state.categories.loaded) {
      state.categories.loaded = true;
    } else {
      return;
    }

    store.commit('initApp');

    if (!payload || payload.length < 1) {
      console.log('array is empty. no need to update');
      return;
    }

    console.log('UPDATE ALL CATEGORIES ARRAY');
    state.categories.all = payload;
  },
  syncDatabaseDeprecated(state) {
    let keys = ['categories', 'notes'];

    console.log(state);

    if (element === 'categories') {
      Storage.allCategories().then((res) => {
        // update the store with a fresh load
        console.log('CATEGORY SYNC');
        console.log(res);
        console.log(state);


        state.categories.all = res;
      }).catch((err) => {
        console.log('NO DATA');
        console.log(err);

      })
    }

    if (element === 'notes') {
      Storage.allNotes().then((res) => {
        // update the store with a fresh load
        console.log('NOTES SYNC');
        console.log(res);

        state.notes.all = res;
      }).catch((err) => {
        console.log('NO DATA');
        console.log(err);

      })
    }

  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
