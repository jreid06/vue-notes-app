import Helpers from './helper'

export default class {
  //

  constructor(category, description, colour) {
    this.category = category;
    this.description = description;
    this.colour = colour;
    this.notes = [];
    this.key = Helpers.randomString();
  }

  returnColour(col = false) {
    // return default colour
    if (!col) return '#30A54A;';

    return this.colour;
  }

  // setters

  set initNotes(notes){
    let $this = this;
    notes.forEach(element => {
      $this.notes.push(element);
    });
  }

  // getters
}
