import Global from '../Global'
import 'babel-polyfill'

const categoriesKey = Global.categoriesKey;
const notesKey = Global.notesKey;
const DB = require('localforage');

export default class {
  static itemExists(key) {
    if (DB.getItem(key)) return true;

    return false;
  }


  // updates category storage with new category added to all categories array
  static updateCategories(categoryArray) {
      console.log('UPDATE INDEXED DB CATEGORIES RUNS');

    // check if categories key exists
    DB.getItem(categoriesKey).then(() => {
      DB.setItem(categoriesKey, categoryArray);
    }).catch((err) => {

      return {
        error: false,
        message: 'item created successfully'
      }
    });

  }

  static updateNotes(notesArray) {
    console.log('UPDATE INDEXED DB NOTES RUNS');
    
    // check if categories key exists
    DB.getItem(notesKey).then(() => {
      DB.setItem(notesKey, notesArray);
    }).catch((err) => {

      return {
        error: false,
        message: 'item created successfully'
      }
    });

  }

  static deleteMultipleItems() {

  }

  static async initStorage() {
    let $this = this,
      cat,
      note;

    await this.initCategoriesStorage().then((initres) => {
      console.log("category storage exists");
      cat = true;
    }).catch((initerr) => {
      cat = false;
    });

    if (!cat) {
      await $this.setCategoriesStorage().then((setres) => {
        console.log('category storage initialized');
      }).catch((seterr) => {
        console.log('ERROR: category storage NOT initialized');
      })
    }

    console.log('BETWEEN CAT STORAGE AND NOTE');

    await this.initNotesStorage().then((initres) => {
      console.log("note storage exists");
      note = true;
    }).catch((err) => {
      note = false
    })

    if (!note) {
      await $this.setNotesStorage().then((setres) => {
        console.log('note storage initialized');
      }).catch((seterr) => {
        console.log('ERROR: note storage NOT initialized');
      })
    }

    console.log('IM LAST');

  }

  static initCategoriesStorage() {
    return new Promise((resolve, reject) => {
      DB.getItem(categoriesKey).then((item) => {
        // no data exists for storage reject to create in next step
        if (item == null) {
          reject(item);
        }

        // resolve to ignore set function
        resolve(true);
      }).catch((err) => {
        reject(null);
      });
    });
  }

  static setCategoriesStorage() {
    return new Promise((resolve, reject) => {
      DB.setItem(categoriesKey, []).then((item) => {
        resolve(true);
      }).catch((err) => {
        reject(null);
      });
    });
  }

  static initNotesStorage() {
    return new Promise((resolve, reject) => {
      DB.getItem(notesKey).then((item) => {
        // no data exists for storage reject to create in next step
        if (item == null) {
          reject(item);
        }

        // resolve to ignore set function
        resolve(true);
      }).catch((err) => {
        reject(null);
      });
    });
  }

  static setNotesStorage() {
    return new Promise((resolve, reject) => {
      DB.setItem(notesKey, []).then((item) => {
        resolve(true);
      }).catch((err) => {
        reject(null);
      });
    });
  }

  static allCategories() {
    // return 'test';
    let categories;

    return new Promise((resolve, reject) => {
      DB.getItem(categoriesKey).then((item) => {
        // console.log(item);
        if (item === undefined || item.length == 0) {
          categories = false;
           console.log(item);
           
           console.log('DFRTGRGRGBTBTD-----0');
          reject(categories);
          
        } else {
          categories = item;
          resolve(categories);
        }

      }).catch((err) => {
        console.log(err);
        console.log('DFRTGRGRGBTBTD-----');
        
        categories = false;
        reject(err);
      })


    });
    
    
   
    

  }

  static allNotes() {
    // return 'test';
    let notes;

    return new Promise((resolve, reject) => {
      DB.getItem(notesKey).then((item) => {
        // console.log(item);
        if (item === undefined || item.length == 0) {
          notes = false;
          console.log(item);

          console.log('DFRTGRGRGBTBTD NOTES-----0');
          reject(notes);

        } else {
          notes = item;
          resolve(notes);
        }

      }).catch((err) => {
        console.log(err);
        console.log('DFRTGRGRGBTBTD NOTES-----');

        notes = false;
        reject(err);
      })


    });





  }


}
