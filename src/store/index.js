import Vue from 'vue'
import Vuex from 'vuex';

import hub from './app'
import note from './modules/note'
import category from './modules/category'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hub,
    note,
    category
  }
})