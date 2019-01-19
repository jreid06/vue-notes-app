import store from './../../store'
import Storage from './../../classes/LocalForageClass';


const state = {
  notes: {
    loaded: false,
    selected: '',
    all: [],
    bookmarked: [],
    toDelete: []
  }
}

const getters = {
  selectedNoteItem: state => {
    return state.notes.selected;
  },
  currentNotes: state => {
    return state.notes.selected;
  },
  allNotes: state => {
    return state.notes.all;
  },
  getNote: (state) => (id) => {
    let note = '',
      index = '';

    state.notes.all.find((element, i) => {
      if (element.key === id) {
        index = i;
        note = element;
      }
    });

    return {
      note,
      index
    };
  }
}

const mutations = {
  deleteNote(state, payload) {
    let note;

    // find the category position in storage
    state.notes.all.find((element, i) => {
      if (element.key === payload) {
        note = i;
        return;
      }
      return;
    });

    // delete the category
    state.notes.all.splice(note, 1);

    // update storage
    Storage.updateNotes(state.notes.all);
  },
  deleteRelatedNotes(state, payload) {
    let itemCount = 0;

    for (let i = 0; i < state.notes.all.length; i++) {
      let el = state.notes.all[i];
      if (el.categoryID === payload) {
        itemCount += 1;
        state.notes.all.splice(i, 1);

        // this accounts for the deleted item
        i -= 1;
      }

    }

    // update storage
    Storage.updateNotes(state.notes.all);

  },
  updateSelectedNote(state, payload) {

    state.notes.selected = payload;
  },
  updateEditedNote(state, payload) {
    let note = store.getters.getNote(payload.key);

    // overwrite old category data with the new data
    state.notes.all[note.index] = payload;

    // // update storage
    Storage.updateNotes(state.notes.all);
  },
  updateAllNotes(state, payload) {
    // push recently created item into the array
    state.notes.all.push(payload);

    // update storage wit full array
    Storage.updateNotes(state.notes.all);
  },
  loadNotes(state, payload) {
    if (!state.notes.loaded) {
      state.notes.loaded = true;
    } else {
      return;
    }

    if (!store.getters.appStatus) {
      store.commit('initApp');
    }


    if (!payload || payload.length < 1) {
      console.log('array is empty. no need to update');
      return;
    }

    state.notes.all = payload;
  },
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
