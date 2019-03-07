<template>
  <div>
    <div class="row pt-0 bg-light">
      <div class="col-12 p-4 text-left">
        <h3>
          Welcome to
          <span class="text-success">mynotes</span>
        </h3>
        <p class="small">{{appDescription}}</p>
      </div>
    </div>
    <div class="row pr t-30 z-3">
      <div class="col-12 p-2 d-flex flex-row">
        <div
          class="click-box create-category p-3 w-100 shadow-sm mb-3 bg-white hvr-grow"
          v-for="(action, key) in actions[0]"
          :key="key"
          :data-action="key"
          @click="triggerModal"
        >
          <h2 :data-action="key">
            <i :class="action.icon"></i>
          </h2>
          <h4 class="text-capitalize" :data-action="key">{{action.name}}</h4>
          <p class="h3 hvr-grow" :data-action="key">
            <i class="fas fa-plus-circle text-success" :data-action="key"></i>
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 p-2">
        <category-list
          :load="'categories'"
          :limit="5"
          :icon="'fas fa-folder'"
          :mutation-name="'deleteCategory'"
          :items="this.allCategories"
        ></category-list>
      </div>
      <div class="col-12 col-md-6 p-2">
        <note-list
          :load="'notes'"
          :limit="5"
          :icon="'far fa-file-alt'"
          :mutation-name="'deleteNote'"
          :items="this.allNotes"
        ></note-list>
      </div>
    </div>
    <category-modal :id="modalID('category')" v-on:change-route="redirectTo"></category-modal>
    <note-modal :id="modalID('note')" :all-categories-p="allCategories"></note-modal>
  </div>
</template>
<script>
const $ = require("jquery");

import { mapGetters } from "vuex";
import ItemList from "./widgets/ItemList.vue";
import HelperMixin from './../../mixins/helpers.js';
import CategoryModal from './../modals/CreateCategoryModal.vue'
import NoteModal from "./../modals/CreateNoteModal.vue";


export default {
  mixins: [HelperMixin],
  components: {
    "category-list": ItemList,
    "note-list": ItemList,
    "category-modal": CategoryModal,
    "note-modal": NoteModal
  },
  computed: {
    ...mapGetters(["appDescription", "modalID", "allCategories", "allNotes"])
  },
  data() {
    return {
      actions: [
        {
          category: {
            name: "create category",
            icon: "far fa-folder",
            action: "category"
          },
          note: {
            name: "create note",
            icon: "far fa-file-alt",
            action: "note"
          },
          // load: {
          //   name: "load note",
          //   icon: "far fa-hdd",
          //   action: "load"
          // }
        }
      ]
    };
  },
  methods: {
   
  }
};
</script>
<style lang="scss" scoped>
.click-box {
  cursor: pointer;
}

.create-category {
  width: calc(100% / 3) !important;
  @media screen and (max-width: 992px) {
    h2 {
      font-size: 2rem;
    }

    h4 {
      font-size: 0.9em;
    }

    .h3 {
      font-size: 2rem !important;
    }
  }
}
</style>
