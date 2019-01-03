import Global from './../Global';

const categoriesKey = Global.categoriesKey;
const notesKey = Global.notesKey;

export default class {
  static itemExists(key) {
    if (localStorage.getItem(key)) return true;

    return false;
  }

  static createItem(item) {
    if (localStorage.getItem(item.key)) {
      return {
        error: true,
        message: 'an item with this key already exists. Overwrite?'
      }
    }

    localStorage.setItem(item.key, JSON.stringify(item));
    return {
      error: true,
      message: 'item created successfully'
    }
  }

  static deleteMultipleItems() {

  }

  static initStorage() {

    // init categories local storage key-value
    if (localStorage.getItem(categoriesKey)) {
      console.log('categories array already exists');
    } else {
      // initialize with empty array
      localStorage.setItem(categoriesKey, JSON.stringify([]));
    }

		// init notes local storage key-value
    if (localStorage.getItem(notesKey)) {
      console.log('notes array already exists');
    } else {
      // initialize with empty array
      localStorage.setItem(notesKey, JSON.stringify([]));
    }


  }
}
