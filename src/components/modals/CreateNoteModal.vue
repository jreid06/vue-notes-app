<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">
            Create
            <span class="text-success">Note</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="col-12 pb-3" v-if="error">
                <div
                  class="alert alert-danger alert-dismissible fade show text-capitalize"
                  role="alert"
                >
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    @click="toggleError"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <strong id="error-message"></strong>
                </div>
              </div>
              <div class="col-12 pb-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Note title ..."
                  v-model="note.title"
                >
              </div>
              <div class="col-12 pb-2">
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Brief intro to note ..."
                  v-model="note.brief"
                ></textarea>
              </div>
              <div class="col-12 pb-2">
                <div class="input-group mb-3">
                  <select class="custom-select" id="inputGroupSelect02" v-model="note.catID">
                    <option selected>Choose...</option>
                    <option
                      :value="category.key"
                      v-for="(category, i) in allCategories"
                      :key="i"
                    >{{category.category}}</option>
                  </select>
                  <div class="input-group-append">
                    <label class="input-group-text" for="inputGroupSelect02">Options</label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn text-danger" data-dismiss="modal">
            <i class="far fa-times-circle"></i>
          </button>
          <button type="button" class="btn text-success" @click="createNote">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Note from "./../../classes/note.js";
import HelperMixin from "./../../mixins/helpers.js"

const $ = require('jquery');
const Joi = require("joi-browser");

export default {
  mixins: [HelperMixin],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['allCategories', 'modalID']),
    noteDetails() {
      return this.note;
    }
  },
  data() {
    return {
      note: {
        title: "",
        brief: "",
        catID: ""
      },
      categories: [],
      error: false
    };
  },
  methods: {
    noteSchema() {
      const schema = Joi.object().keys({
        title: Joi.string()
          .min(3)
          .max(35),
        brief: Joi.string()
          .min(0)
          .max(255),
        catID: Joi.string()
      });

      return schema;
    },
    validateNote() {
      let schema = this.noteSchema();

     const vm = this;

      return Joi.validate(
        {
          title: vm.noteDetails.title,
          brief: vm.noteDetails.brief ? vm.noteDetails.brief : '...',
          catID: vm.noteDetails.catID
        },
        schema
      );
    },
    updateErrorMessage(key) {
      let message = "";

      switch (key) {
        case "title":
          message = "please enter a title more than 3 characters long";
          setTimeout(() => {
            document.getElementById("error-message").innerHTML = message;
          }, 100);
          break;
        case "brief":
          message = "please enter a brief more than 3 characters long";
          setTimeout(() => {
            document.getElementById("error-message").innerHTML = message;
          }, 100);
          break;
        case "catID":
          message = "please select a 'category' the note belongs to";
          setTimeout(() => {
            document.getElementById("error-message").innerHTML = message;
          }, 100);
          break;

        default:
          break;
      }
    },
    createNote() {
      const vm = this;
      let valid = this.validateNote(),
          note = '';

      if (valid.error !== null) {
        vm.error = true;
        console.log(valid);
        vm.updateErrorMessage(valid.error.details[0].path[0]);
        return;
      }

      // instantiate a new note
      note = new Note(vm.noteDetails.title, vm.noteDetails.brief, vm.noteDetails.catID);

      console.log(note);
      
      // update category array with new category
      // save in local storage
      this.$store.commit('updateAllNotes', note);
      this.$store.commit('updateSelectedNote', note);

      // add note to correct category
      
      // // emit result to redirect via route
      this.$emit('change-route', `/dashboard/notes/${note.key}`);

      // close modal
      $(`#${this.modalID('note')}`).modal('hide');
    },
    toggleError() {
      this.error = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
