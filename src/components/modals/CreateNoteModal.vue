<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">
            <span v-if="action === 'edit'">Edit</span>
            <span v-else>Create</span>
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
                    <option value="" selected>Choose...</option>
                    <option
                      :value="category.key"
                      v-for="(category, i) in allCategories"
                      :key="i"
                    >{{category.title}}</option>
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
           <button
            type="button"
            class="btn text-success"
            @click="createNote"
            v-if="action === 'create'"
          >
            <i class="fas fa-check"></i>
          </button>
          
          <button type="button" class="btn text-success" @click="updateNote" v-else>
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import Note from "./../../classes/note.js";
import Storage from "./../../classes/LocalForageClass.js";
import HelperMixin from "./../../mixins/helpers.js";

const $ = require("jquery");
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
    ...mapGetters([
      "allCategories",
      "modalID",
      "getCategory",
      "editStatus",
      "getItemToEdit"
    ]),
    noteDetails() {
      return this.note;
    }
  },
  data() {
    return {
      action: "create",
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
    ...mapMutations(["updateEditItem", "updateNoteInCategory"]),
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
      // manual check to see if user has actually selected a category or ch
      let valid = this.validateNote(),
        note = "";

      if (valid.error !== null) {
        vm.error = true;
        vm.updateErrorMessage(valid.error.details[0].path[0]);
        return;
      }

      // get the corresponding category
      let category = vm.getCategory(vm.noteDetails.catID);
      let catJSON = JSON.stringify(category.cat);
      // instantiate a new note
      note = new Note(
        vm.noteDetails.title,
        vm.noteDetails.brief,
        vm.noteDetails.catID,
        vm.randomString(),
      );

      // update category array with new category
      // save in local storage
      this.$store.commit("updateAllNotes", note);
      this.$store.commit("updateSelectedNote", {payload: note});

      // add note to correct category
      this.$store.dispatch("addNoteToCategory", note);

      // // emit result to redirect via route
      this.$emit("change-route", `/dashboard/notes/${note.key}`);

      // close modal
      $(`#${this.modalID("note")}`).modal("hide");
    },
    updateNote() {
      const vm = this;
      
      let { title, brief, catID } = this.noteDetails;
      // update edited item first
      this.updateEditItem({ title, brief, categoryID: catID });

      // when modal disappears view gets data
      this.updateSelectedNote({payload: vm.getItemToEdit, changeCategory: true});

      // // emit result to update the selected note in the view
      this.$emit("update-selected", `reload`);

      // close modal
      $(`#${this.modalID("note")}`).modal("hide");
    },
    toggleError() {
      this.error = false;
    },
    resetData() {
      const vm = this;
      for (const key in vm.noteDetails) {
        if (vm.noteDetails.hasOwnProperty(key)) {
          vm.note[key] = "";
        }
      }

      this.toggleError();

    },
    resetEdit() {
      this.action = "create";
      this.$store.dispatch("resetEditObjAction");
    }
  },
  mounted() {
    const vm = this;

    $(`#${this.modalID("note")}`).on("show.bs.modal", function(e) {
      if (vm.editStatus) {
        vm.action = "edit";
        var { title, brief, categoryID } = vm.getItemToEdit;

        vm.note.title = title;
        vm.note.brief = brief;
        vm.note.catID = categoryID;
      }
    });

    $(`#${this.modalID("note")}`).on("hidden.bs.modal", function(e) {
      vm.resetData();

      if (vm.editStatus) {
        vm.resetEdit();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
