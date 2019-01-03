import Global from '../Global'

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

    // check if categories key exists
    DB.getItem(categoriesKey).then(() => {
      DB.setItem(categoriesKey, categoryArray);
    }).catch((err) => {

      return {
        error: true,
        message: 'item created successfully'
      }
    });

  }

  static deleteMultipleItems() {

  }

  static initCategoriesStorage() {

    let exists = false;

    // init categories local storage key-value
    try {
      DB.getItem(categoriesKey).then((item) => {
              
        if(item == null){
            try {
              DB.setItem(categoriesKey, []).then(() => {
                console.log('category STORAGE SET SUCCESSFULLY');
              }).catch((err) => {
                console.log('error CREATING STORAGE for category');
              })
            } catch (error) {
              console.log('error creating cat storage');
              return;
            }
        }

        console.log('categories STORAGE EXISTS');

        return;
      }).catch((err) => {
        console.log('doesnt exist. create categories');
      });

      return;

    } catch (error) {
      console.log('error with indexed DB');
      return;
    }

  }

  static initNotesStorage() {
    // init notes local storage key-value

    try {
      DB.getItem(notesKey).then((item) => {
        if(item == null){
           try {
             DB.setItem(notesKey, []).then(() => {
               console.log('NOTES STORAGE SET SUCCESSFULLY');
             }).catch((err) => {
               console.log('error CREATING STORAGE for notes');
               return;
             })
           } catch (error) {
             console.log('error creating notes storage');
           }
        }

        console.log('notes STORAGE EXISTS');
        return;

      }).catch((err) => {
        console.log('doesnt exist. create notes');
      })
    } catch (error) {
      console.log('error with indexed DB');
      return;

    }
   
  }

  static allCategories() {
    DB.getItem(categoriesKey, []).then((item) => {
      console.log('categories STORAGE EXISTS');
    }).catch((err) => {
      DB.setItem(categoriesKey).then(() => {
        console.log('category STORAGE SET SUCCESSFULLY');
      }).catch((err) => {
        console.log('error CREATING STORAGE for category');
      })
    })
  }
}
