import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { routes } from './routes'
import store from './store'
import VueRouter from 'vue-router'
import Storage from './classes/LocalForageClass'

require('bootstrap');
// require('localforage');

const router = new VueRouter({
  routes
});


Vue.use(Vuex);
Vue.use(VueRouter);

/////

Vue.filter('removeHash', (value) => {
  let arr = hashword.split('');
  for (let i = 0; i < arr.length; i++) {
    if (arr[0] === '#') {
      arr.splice(0, 1);
    }
  }
  return arr.join('');
});

////

function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}

router.beforeEach((to, from, next)=>{
  if (storageAvailable('localStorage')) {
    Storage.initCategoriesStorage();
    Storage.initNotesStorage();

    
    
    // Storage.allCategories();
  
    next();
  } else {
    // Too bad, no localStorage for us
    alert('no local storage access');
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
