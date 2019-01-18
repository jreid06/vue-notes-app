import Global from '../Global'
import store from './../store'
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
            cat = true;
        }).catch((initerr) => {
            cat = false;
        });

        if (!cat) {
            await $this.setCategoriesStorage().then((setres) => {}).catch((seterr) => {})
        }

        await this.initNotesStorage().then((initres) => {
            note = true;
        }).catch((err) => {
            note = false
        })

        if (!note) {
            await $this.setNotesStorage().then((setres) => {}).catch((seterr) => {})
        }

        await this.allCategories().then((res) => {
            store.commit('loadCategories', res);
        }).catch((err) => {
            console.log('error getting all categories');
        });

        await this.allNotes().then((res) => {
            store.commit('loadNotes', res);
        }).catch((err) => {
            console.log('error getting all notes');
        })

        return true;

    }

    static async updateData() {
        // return new Promise((resolve, reject) => {
        await this.allCategories().then((res) => {
            store.commit('syncDatabase', {
                load: "categories",
                data: res
            });
            // resolve();
        }).catch((err) => {
            console.log('no data to set');
            // reject();
        });

        console.log('in betweeen all categories load');


        await this.allNotes().then((res) => {
            store.commit('syncDatabase', {
                load: "notes",
                data: res
            });

            // resolve();
        }).catch((err) => {
            console.log('no data to set');
            // reject();
        });

        console.log('all notes load');

        return true;
        // });
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

    static async allCategories() {
        let categories;

        return new Promise((resolve, reject) => {
            DB.getItem(categoriesKey).then((item) => {
                if (item === undefined || item.length == 0) {
                    categories = false;
                    reject(categories);

                } else {
                    categories = item;
                    resolve(categories)
                }

            }).catch((err) => {
                // console.log(err);

                categories = false;
                reject(categories);
            })

        });

    }

    static async allNotes() {
        let notes;

        return new Promise((resolve, reject) => {
            DB.getItem(notesKey).then((item) => {
                // console.log(item);
                if (item === undefined || item.length == 0) {
                    notes = false;
                    reject(notes);
                } else {
                    notes = item;
                    resolve(notes);
                }

            }).catch((err) => {

                notes = false;
                reject(notes);
            })


        });

    }


}