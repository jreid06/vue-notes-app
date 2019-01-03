const state = {
	categories:{
		selected: '',
		all: [],
		bookmarked: []
	}
}

const getters = {
	currentCategory: state => {
		return state.categories.selected;
	}
}

const mutations = {
	updateCategory(state, payload){
		state.categories.selected = payload;
	},
	setCategories(state, payload){
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