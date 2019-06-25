<template>
  <div class="col-12 p-4">
    <div class="row">
      <template v-if="latestcategories.length > 0">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 animated fadeIn"
          v-for="(n,i) in latestcategories"
          :key="i"
        >
          <div class="card hfx-380 cp">
            <div class="p-1 w-100 rounded-top" :style="{backgroundColor: n.colour}"></div>
            <div class="card-body">
              <h4 class="card-title">{{n.title | firstWordCapital}}</h4>
              <p class="font-italic font-weight-light" v-html="formatDate(n.createdAt).ukDate"></p>
              <p class="card-text">{{n.description | truncate(15) }}</p>

              <div class="d-flex flex-row flex-no-wrap delete-controls justify-content-center">
                <div class="bg-success p-2 rounded-left">
                  <router-link
                    :to="'/dashboard/categories/'+n.key"
                    class="card-link text-capitalize text-light"
                  >
                    <i class="far fa-edit hvr-grow"></i>
                  </router-link>
                </div>
                <div
                  class="bg-danger text-light p-2 rounded-right"
                  :data-id="n.key"
                  :data-item="JSON.stringify(n)"
                  :data-type="n.type"
                  data-action="delete"
                  @click="triggerModal"
                >
                  <i class="far fa-trash-alt hvr-grow"></i>
                </div>
              </div>
              <hr>
              <div
                class="rounded border border-light bg-light shadow-sm p-2 d-flex flex-wrap hfx-135 oy-s ox-h"
              >
                <template v-if="n.notes.length > 0">
                  <div
                    v-for="(q,i) in (n.notes.length + 1)"
                    :key="i"
                    class="wn-25 h2 cp hfx-65 oy-s ox-h"
                    :style="{color: n.colour}"
                  >
                    <!-- {{i}} -->
                    <router-link
                      :to="`/dashboard/note/${n.notes[i].id}`"
                      :style="{color: n.colour}"
                      v-if="i < n.notes.length"
                    >
                      <i :class="getNote(n.notes[i].id).note.icon"></i>
                      <p class="h6">
                        <i
                          class="fas fa-info-circle"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          :title="'Title: '+ getNote(n.notes[i].id).note.title"
                        ></i>
                      </p>
                    </router-link>
                    <p v-else class="pt-3 h3">
                      <i
                        class="fas fa-plus-circle"
                        @click="triggerModalLocal"
                        data-action="note"
                        :data-category-id="n.key"
                        :style="{color: '#9b9b9b'}"
                      ></i>
                    </p>
                  </div>
                </template>
                <template v-else>
                  <div class="text-center w-100 justify-content-center align-items-center pt-3 cp">
                    <div @click="triggerModalLocal" data-action="note" :data-category-id="n.key">
                      <h3 data-action="note" :data-category-id="n.key">
                        <i class="fas fa-plus-circle" :style="{color: n.colour}"></i>
                      </h3>
                      <p class="small">Create Note</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- card end -->
        </div>
      </template>
      <template v-else>
        <div class="col-12">
          <div
            class="create-component d-flex flex-column justify-content-center align-items-center hfx-400"
          :data-action="'category'"
          @click="triggerModal">
            <div class="h3" >
              <i class="fas fa-plus-circle hvr-grow" :style="{color: '#9b9b9b'}"></i>
              <p>Create a category</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <category-modal :id="modalID('category')" v-on:change-route="redirectTo"></category-modal>
    <note-modal
      :id="modalID('note')"
      :allCategoriesP="[sCategory]"
      :set-cat="{status: true, categoryID: sCatKey}"
    ></note-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers.js";
import NoteModal from "./../../modals/CreateNoteModal.vue";
import CategoryModal from './../../modals/CreateCategoryModal.vue'

const $ = require("jquery");

export default {
  mixins: [HelperMixin],
  components: {
    "note-modal": NoteModal,
    "category-modal": CategoryModal
  },
  props: ["latestcategories", "total"],
  data() {
    return {
      sCategory: {}
    };
  },
  computed: {
    ...mapGetters(["getNote", "getCategory"]),
    sCatKey() {
      return this.sCategory.key;
    }
  },
  methods: {
    triggerModalLocal(e) {
      let targetId = e.currentTarget.hasAttribute("data-category-id")
        ? e.currentTarget.attributes["data-category-id"].value
        : e.currentTarget.parentElement.attributes["data-category-id"].value;

      this.sCategory = this.getCategory(targetId).cat;

      const vm = this;
      vm.triggerModal(e);
    }
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  }
};
</script>
<style lang="scss" scoped>
</style>
