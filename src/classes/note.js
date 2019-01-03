export default class {
 

  constructor(title) {
    this.title = title;
    this.status = this.returnDraft(),
	  this.bookmarked = false;
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
