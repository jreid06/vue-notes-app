import Helpers from './helper'

const Marked = require('marked');

export default class {
 

  constructor(title, brief, categoryID) {
    this.title = title;
    this.brief = brief;
    this.categoryID = categoryID;
    this.status = this.returnDraft();
    this.icon = "far fa-file-alt";
    this.noteHTML = '';
    this.noteMarkdown = '';
    this.bookmarked = false;
    this.key = this.key = Helpers.randomString();
    this.createdAt = Date.now();
  }

  returnDraft() {
    return 'draft';
  }

  toggleBookmark(status) {
	this.bookmarked = status;
  }

  // setters

  set setNoteStatus(status) {
    this.status = status;
  }

  set updateBookmark(status){
	  this.toggleBookmark(status);
  }

  // getters

  get noteStatus() {
    return this.status;
  }
}
