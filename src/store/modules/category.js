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
  bookmarkedCategories: state =>{
    return {
      amount: state.categories.bookmarked.length,
      all: state.categories.bookmarked
    }
  },
  getCategory: (state) => (id) => {

    let cat = '',
      index = '';

    state.categories.all.find((element, i) => {
      if (element.key === id) {
        index = i;
        cat = element;
      }
    });

    return {
      cat,
      index
    };
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

    console.log(cat);
    console.log(payload);

    // delete the category
    state.categories.all.splice(cat, 1);

    // update storage
    Storage.updateCategories(state.categories.all);
  },
  deleteCategoryNote(state, payload) {
    let cat = store.getters.getCategory(payload.categoryID),
      noteToDelete;

    
    state.categories.all[cat.index].notes.find((note, i) => {
      if (note.id === payload.key) {
        noteToDelete = i;
        return;
      }
    })

    state.categories.all[cat.index].notes.splice(noteToDelete, 1);

    //
    Storage.updateCategories(state.categories.all);

  },
  addNoteToCategory(state, {
    note,
    getters
  }) {
    let cat = getters.getCategory(note.categoryID);

    // push note.id into the selected categories notes as a reference to the note
    cat.cat.notes.push({id: note.key });

    // // update storage
    Storage.updateCategories(state.categories.all);
  },
  updateSelectedCategory(state, payload) {
    state.categories.selected = payload;
  },
  updateEditedCategory(state, payload) {
    let cat = store.getters.getCategory(payload.key);

    // overwrite old category data with the new data
    state.categories.all[cat.index] = payload;

    // // update storage
    Storage.updateCategories(state.categories.all);
  },
  updateBookmarkedCategories(state, {bookmarked, id}){
    if(bookmarked){
      // add to bookmarked array
      state.categories.bookmarked.push(id);

      return;
    }

    //remove from bookmarked array
    let bookmarkToDelete;
    state.categories.bookmarked.find((el, i)=>{
      if(el == id){
        bookmarkToDelete = i;
        return;
      }
    });

    state.categories.bookmarked.splice(bookmarkToDelete, 1);
    return;

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
      // console.log('array is empty. no need to update');
      return;
    }

    state.categories.all = payload;
  }
}

const actions = {
  addNoteToCategory({
    commit,
    getters
  }, note) {
    commit('addNoteToCategory', {
      note,
      getters
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
