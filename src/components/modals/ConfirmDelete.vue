<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center border-0">
          <h5 class="modal-title w-100">
            Are you sure you want to delete this {{deleteItem.type}} ?
            <br>
            <span
              :style="{color: deleteItem.colour}"
            >{{deleteItem.hasOwnProperty('category')? deleteItem.category : deleteItem.title}}</span>
            <template v-if="deleteItem.type == 'categories'">
              <span>has {{deleteItem.notes.length}} note(s)?</span>
            </template>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body border">
          <template v-if="deleteItem.type == 'categories'">
            <div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex" v-for="(n, i) in deleteItem.notes" :key="i">
                  <div class="p-2 h2">
                    <i :class="getNote(n.id).note.icon"></i>
                  </div>
                  <div class="p-2 pl-5 h2">
                    <p :style="{color: deleteItem.colour}">{{getNote(n.id).note.title}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn text-danger" data-dismiss="modal">
            <i class="far fa-times-circle"></i>
          </button>
          <button type="button" class="btn text-success" @click="removeItem">
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

const $ = require("jquery");

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getItemToDelete", "getNote"])
  },
  data() {
    return {
      deleteItem: ""
    };
  },
  watch: {
    getItemToDelete(item, oldItem) {
      this.deleteItem = item;
    }
  },
  methods: {
    ...mapMutations([
      "deleteCategory",
      "deleteRelatedNotes",
      "deleteNote",
      "deleteCategoryNote"
    ]),
    removeItem() {
      const vm = this;

      console.log("remove item");
      console.log(this.deleteItem.type);

      console.log(this.deleteItem.key);
      //   return;

      switch (this.deleteItem.type) {
        case "categories":
          //delete all notes associated in notes table
          vm.deleteRelatedNotes(vm.deleteItem.key);

          // delete the category
          vm.deleteCategory(vm.deleteItem.key);

          break;
        case "note":
          //delete note from notes table
          vm.deleteNote(vm.deleteItem.key);

          // delete the note from its category category
          vm.deleteCategoryNote(vm.deleteItem);

          break;
      }

      $(`#${this.id}`).modal("hide");
    },
    resetDelete() {
      this.$store.dispatch("resetDeleteObjAction");
    }
  },
  mounted() {
    //   this.deleteItem = this.getItemToDelete;
    const vm = this;

    $(`#${this.id}`).on("hidden.bs.modal", e => {
      console.log("MODAL HIDDEN");

      vm.resetDelete();
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
