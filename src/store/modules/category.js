// import { stat } from "fs";
import store from './../../store'
import Storage from './../../classes/LocalForageClass';

const state = {
	categories:{
		loaded: false,
		selected: {},
		all: [],
		bookmarked: []
	}
}

const getters = {
	currentCategory: state => {
		return state.categories.selected;
	},
	allCategories(){		
		return state.categories.all;
	}
}

const mutations = {
	updateSelectedCategory(state, payload){
		state.categories.selected = payload;
	},
	updateAll(state, payload){
		state.categories.all.push(payload);

		// update storage
		Storage.updateCategories(state.categories.all);
	},
	loadCategories(state, payload){
		if(!state.categories.loaded){
			state.categories.loaded = true;
		}else{
			return;
		}
		
		store.commit('initApp');

		console.log(payload);
		
		if(!payload || payload.length < 1){
			console.log('array is empty. no need to update');
			return;
		}

		console.log('UPDATE ALL CATEGORIES ARRAY');
		state.categories.all = payload;
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