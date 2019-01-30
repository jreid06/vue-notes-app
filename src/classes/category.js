import Helpers from './helper'

export default class {
  //

  constructor(title, description, colour, key) {
    this.type = 'categories',
    this.title = title;
    this.description = description;
    this.bookmarked = false,
    this.icon = 'fas fa-folder';
    this.colour = colour;
    this.notes = [];
    this.key = key;
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
