import Storage from './../classes/LocalForageClass'

const state = {
  app: {
    name: 'mynotes',
    version: 1.0,
    orientation: '',
    description: 'Your personal note tracker. Keep all your ideas in one place',
    init: false
  },
  modal: {
    note: 'note-modal',
    category: 'category-modal',
    load: 'load-modal'
  },
  settings: {
    profile: {
      name: 'Jason Reid',
      selectedColor: '#30A54A',
      avatar: {
        url: ''
      },
    },
    colorPalette: [{
        styleObj: {
          backgroundColor: '#f2f2f2'
        },
        selected: false,
        selectedStyles: {
			backgroundColor: '#f2f2f2',
          border: '2px solid #f2f2f2',
          boxShadow: '0px 2px 2px #f2f2f2'
        },
        canDelete: true,
      },
      {
        styleObj: {
          backgroundColor: '#fc5555'
        },
        selected: false,
        selectedStyles: {
			backgroundColor: '#fc5555',
          border: '2px solid #fc5555',
          boxShadow: '0px 2px 2px #fc5555'
        },
        canDelete: true
      },
      {
        styleObj: {
          backgroundColor: '#fd9827'
        },
        selected: false,
        selectedStyles: {
			backgroundColor: '#fd9827',
          border: '2px solid #fd9827',
          boxShadow: '0px 2px 2px #fd9827'
        },
        canDelete: true
      },
      {
        styleObj: {
          backgroundColor: '#ccb50c'
        },
        selected: false,
        selectedStyles: {
			    backgroundColor: '#ccb50c',
          border: '2px solid #ccb50c',
          boxShadow: '0px 2px 2px #ccb50c'
        },
        canDelete: true
      },
      {
        styleObj: {
          backgroundColor: '#151db2'
        },
        selected: false,
        selectedStyles: {
			backgroundColor: '#151db2',
          border: '2px solid #151db2',
          boxShadow: '0px 2px 2px #151db2'
        },
        canDelete: true
      },
      {
        styleObj: {
          backgroundColor: '#28a745'
        },
        selected: false,
        selectedStyles: {
			backgroundColor: '#28a745',
          border: '2px solid #28a745',
          boxShadow: '0px 2px 2px #28a745'
        },
        canDelete: true
      },
      {
        styleObj: {
          backgroundColor: '#222'
        },
        selected: false,
        selectedStyles: {
			 backgroundColor: '#222',
          border: '2px solid #222',
          boxShadow: '0px 2px 2px #222'
        },
        canDelete: true
      },
      {
        styleObj: {
          backgroundColor: '#3A9CED'
        },
        selected: false,
        selectedStyles: {
		backgroundColor: '#3A9CED',
          border: '2px solid #3A9CED',
          boxShadow: '0px 2px 2px #3A9CED'
        },
        canDelete: true
      }
    ]
  }
}

const getters = {
  appName: state => {
    return state.app.name;
  },
  appStatus: state=>{
    return state.app.init;
  },
  orientationSet: state => {
    return state.app.orientation ? true : false
  },
  appDescription: state => {
    return state.app.description;
  },
  modalID: (state) => (key) => {
    return state.modal[key];
  },
  colorPalette: state => {
    return state.settings.colorPalette;
  }
}

const actions = {

}

const mutations = {
  initApp(state){
    !state.app.init ? state.app.init = true : '';
  },
  updateOrientation(state, payload) {
    state.app.orientation = payload;
  },
  addColour(state, payload) {
    // validate hex code
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
