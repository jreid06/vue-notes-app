<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5>viewing note</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn text-danger" data-dismiss="modal">
            <i class="far fa-times-circle"></i>
          </button>
          <!-- <button
            type="button"
            class="btn text-success"
            @click="createNote"
            v-if="action === 'create'"
          >
            <i class="fas fa-check"></i>
          </button>-->
          <button type="button" class="btn text-success">
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
import Notifications from "./../../mixins/toaster.js";

const $ = require("jquery");
const Joi = require("joi-browser");
const marked = require("marked");

export default {
  mixins: [HelperMixin, Notifications],
  props: {
    id: {
      type: String,
      required: true
    },
    note: {
      type: Object
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
		marked: marked,
      action: "create",
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

        // trigger notification
        this.errorToaster(valid.error.details[0].path[0]);
        return;
      }

      // get the corresponding category
      let category = vm.getCategory(vm.noteDetails.catID).cat;

      // instantiate a new note
      note = new Note(
        vm.noteDetails.title,
        vm.noteDetails.brief,
        vm.noteDetails.catID,
        vm.randomString()
      );

      // update category array with new category
      // save in local storage
      this.$store.commit("updateAllNotes", note);
      this.$store.commit("updateSelectedNote", { payload: note });

      // add note to correct category
      this.$store.dispatch("addNoteToCategory", note);

      // // emit result to redirect via route
      this.$emit("change-route", `/dashboard/notes/${note.key}`);

      // trigger notification
      this.successToaster(
        `Note <b>"${
          note.title
        }"</b> has been created successfully & added to category <b>"${
          category.title
        }"</b>`
      );

      // close modal
      $(`#${this.modalID("note")}`).modal("hide");
    },
    updateNote() {
      const vm = this;

      let { title, brief, catID } = this.noteDetails;
      // update edited item first
      this.updateEditItem({ title, brief, categoryID: catID });

      // when modal disappears view gets data
      this.updateSelectedNote({
        payload: vm.getItemToEdit,
        changeCategory: true
      });

      // // emit result to update the selected note in the view
      this.$emit("update-selected", `reload`);

      // trigger notification
      this.successToaster(
        `Note <b>"${title}"</b> has been updated successfully`
      );

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

      if (
        typeof vm.setCat == "object" &&
        vm.setCat.hasOwnProperty("status") &&
        vm.setCat.status
      ) {
        vm.note.catID = vm.setCat.categoryID;
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
