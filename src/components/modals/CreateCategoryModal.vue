<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">
            <span v-if="action === 'edit'">Edit</span>
            <span v-else>Create</span>
            <span class="text-success">Category</span>
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
                  id="category-title"
                  type="text"
                  class="form-control"
                  placeholder="Category title ..."
                  v-model="category.title"
                >
              </div>
              <div class="col-12 pb-2">
                <textarea
                  id="category-description"
                  type="text"
                  class="form-control"
                  placeholder="Category description ..."
                  rows="3"
                  v-model="category.description"
                ></textarea>
              </div>
              <div class="col-12 pb-2" id="category-color">
                <p class="small mute">Select a colour for your category</p>
                <div class="colors d-flex flex-row">
                  <div
                    @click="changeColor"
                    class="m-1 color-box"
                    :class="color.selected ? 'selected-color' : ''"
                    v-for="(color, i) in colors"
                    :key="i"
                    :data-pos="i"
                    :style="color.selected ? color.selectedStyles : color.styleObj"
                  ></div>
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
            @click="createCategory"
            v-if="action === 'create'"
          >
            <i class="fas fa-check"></i>
          </button>
          
          <button type="button" class="btn text-success" @click="updateCategory" v-else>
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
import Category from "./../../classes/category";
import Storage from "./../../classes/LocalStorage";
import HelperMixin from "./../../mixins/helpers.js";

const $ = require("jquery");

export default {
  mixins: [HelperMixin],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["colorPalette", "modalID", "editStatus", "getItemToEdit"]),
    categoryDetails() {
      return this.category;
    }
  },
  data() {
    return {
      error: false,
      action: "create",
      category: {
        title: "",
        description: "",
        colour: ""
      },
      colors: this.$store.getters.colorPalette
    };
  },
  methods: {
    ...mapMutations(["resetColourPalette", "updateEditItem"]),
    updateColor(color) {
      this.category.colour = color;
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
        case "description":
          message = "please enter a description more than 3 characters long";
          setTimeout(() => {
            document.getElementById("error-message").innerHTML = message;
          }, 100);
          break;
        case "color":
          message = "please select a 'color' for your category";
          setTimeout(() => {
            document.getElementById("error-message").innerHTML = message;
          }, 100);
          break;

        default:
          break;
      }
    },
    updateSelectedColor(pos) {
      this.colors.forEach((el, i) => {
        if (el.selected) el.selected = false;
      });
      
      this.colors[pos].selected = true;
      this.updateColor(this.colors[pos].styleObj.backgroundColor);
    },
    setEditColor(editColour) {
      let pos;

      this.colors.find((el, i) => {
        if (editColour === el.styleObj.backgroundColor) {
          pos = i;
          return;
        }
      });

      const vm = this;
      if (pos != null || pos != "undefined") {
        vm.updateSelectedColor(pos);
      }
    },
    defaultDescription() {
      this.category.description = "...";
    },
    changeColor(e) {
      let target = e.target,
        pos = target.attributes["data-pos"].value;

      this.updateSelectedColor(pos);
    },
    createCategory() {
      const vm = this;
      let valid = this.validateCategory(),
        category = "";

      if (valid.error !== null) {
        vm.error = true;
        vm.updateErrorMessage(valid.error.details[0].path[0]);
        return;
      }

      // instantiate a new category
      category = new Category(
        vm.categoryDetails.title,
        vm.categoryDetails.description,
        vm.categoryDetails.colour,
        vm.randomString()
      );

      // update category array with new category
      // save in local storage
      this.$store.commit("updateAllCategories", category);
      this.$store.commit("updateSelectedCategory", category);

      // // emit result to redirect via route
      this.$emit("change-route", `/dashboard/categories/${category.key}`);

      // close modal
      $(`#${this.modalID("category")}`).modal("hide");
    },
    updateCategory() {
      let { title, description, colour } = this.categoryDetails;
      this.updateEditItem({ title, description, colour });

       // // emit result to update the selected category
      this.$emit("update-selected", `reload`);

       // close modal
      $(`#${this.modalID("category")}`).modal("hide");
    },
    toggleError() {
      this.error = false;
    },
    resetData() {
      const vm = this;
      for (const key in vm.categoryDetails) {
        if (vm.categoryDetails.hasOwnProperty(key)) {
          vm.category[key] = "";
        }
      }

      this.resetColourPalette();
      this.toggleError();
    },
    resetEdit() {
      this.action = "create";

      this.$store.dispatch("resetEditObjAction");
    }
  },
  mounted() {
    const vm = this;
    $(`#${this.modalID("category")}`).on("show.bs.modal", function(e) {
      if (vm.editStatus) {
        vm.action = "edit";
        var { colour, title, description, key } = vm.getItemToEdit;

        vm.category.title = title;
        vm.category.description = description;
        vm.setEditColor(colour);
      }
    });

    $(`#${this.modalID("category")}`).on("hidden.bs.modal", function(e) {
      vm.resetData();

      if (vm.editStatus) {
        vm.resetEdit();
      }
    });
  },
  beforeDestroy() {
    console.log("CATEGORY MODAL DESTROYED");
  }
};
</script>
<style lang="scss" scoped>
.color-box {
  width: 39px;
  height: 39px;
  @media only screen and (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
  transition: all 0.2s ease-in-out;
}

.selected-color {
  border: 2px solid #eeeeee;
  transform: scale(1.2);
  // box-shadow: 0 2px 2px #f2f2f2;
}
</style>
