<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center border-0">
          <h5 class="modal-title">
            Are you sure you want to delete {{deleteItem.type}}
            <span
              class="text-success"
            >{{deleteItem.hasOwnProperty('category')? deleteItem.category : deleteItem.title}}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- <div class="modal-body"></div> -->
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
    ...mapGetters(["getItemToDelete"])
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
    ...mapMutations(["deleteCategory", "deleteRelatedNotes", "deleteNote", "deleteCategoryNote"]),
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

    console.log(this.id);

    $(`#${this.id}`).on("hidden.bs.modal", e => {
      console.log("MODAL HIDDEN");

      vm.resetDelete();
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
