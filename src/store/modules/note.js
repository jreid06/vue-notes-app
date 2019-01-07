import store from './../../store'
import Storage from './../../classes/LocalForageClass';


const state = {
  notes: {
    loaded: false,
    selected: '',
    all: [],
    bookmarked: []
  }
}

const getters = {
  currentNotes: state => {
    return state.notes.selected;
  },
  allNotes: state =>  {
    	return state.notes.all;
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
  updateSelectedNote(state, payload) {
    state.notes.selected = payload;
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

    store.commit('initApp');

    if (!payload || payload.length < 1) {
      console.log('array is empty. no need to update');
      return;
    }

    console.log('UPDATE ALL NOTES ARRAY');
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
