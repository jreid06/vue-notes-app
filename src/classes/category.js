import Helpers from './helper'

export default class {
  //

  constructor(category, description, colour) {
    this.category = category;
    this.description = description;
    this.icon = 'fas fa-folder';
    this.colour = colour;
    this.notes = [];
    this.key = Helpers.randomString();
    this.createdAt = Date.now();
  }

  returnColour(col = false) {
    // return default colour
    if (!col) return '#30A54A;';

    return this.colour;
  }

  // setters

  

  // getters
}
