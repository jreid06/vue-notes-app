<template>
  <div>
    <div class="row pt-0 bg-light">
      <div class="col-12 p-4 text-left">
        <div class="float-left">
          <h3>
            <span :style="{color: category.colour}" class="text-capitalize">{{category.title}}</span>
          </h3>
          <p class="small">{{category.description}}</p>
        </div>
        <div class="float-right display-4 pointer">
          <i
            class="far fa-edit"
            :data-item="JSON.stringify(selectedCategory)"
            data-action="edit"
            data-item-type="category"
            @click="triggerModal"
          ></i>
        </div>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-12 col-md-6 text-left">
        <h4 class="p-3 text-white" :style="{backgroundColor: category.colour}">Notes</h4>
        <!-- <hr> -->
        <ul class="list-group list-group-flush">
          <li
            class="itemlist-li list-group-item d-flex flex-row flex-no-wrap flex-sm-wrap flex-md-no-wrap text-capitalize"
            v-for="(n,i) in category.notes"
            :key="i"
            :data-note-id="getNote(n.id).note.key"
            @click="quickViewNote"
          >
            <div class="p-2 flex-fill h4 text-left" :style="{color: getNote(n.id).note.colour}">
              <i :class="getNote(n.id).note.icon"></i>
            </div>

            <div class="p-2 flex-fill">
              <p>{{getNote(n.id).note.title}}</p>
            </div>
            <div class="p-2 flex-fill">
              <p v-html="formatDate(getNote(n.id).note.createdAt).readableDate"></p>
            </div>
            <div class="p-2 flex-fill bg-light">
              <ul class="list-inline">
                <li
                  class="list-inline-item text-danger hvr-grow"
                  :data-id="getNote(n.id).note.key"
                  @click="quickDeleteItem"
                >
                  <i class="far fa-trash-alt" :data-id="getNote(n.id).note.key"></i>
                </li>
                <li class="list-inline-item text-info hvr-grow">
                  <router-link :to="'/dashboard/notes/'+ getNote(n.id).note.key">
                    <i class="far fa-edit"></i>
                  </router-link>
                </li>
                <li class="list-inline-item hvr-grow">
                  <i class="fas fa-ellipsis-h"></i>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- <textarea name="markdown" id="category-markdown" cols="30" rows="10"></textarea> -->
      </div>
      <div class="col-12 col-md-6 text-left">
        <h4 class="bg-info p-3 text-white">Quick view of note:</h4>
        <div :style="noteDiv" class="w-100 note-quick">
          <!-- <img class="note-bg" :src="noteDiv.src"> -->
          <note-svg :fill="category.colour"></note-svg>
          <p v-if="selectedNote">{{selectedNote.brief}}</p>
        </div>
      </div>
    </div>
    <category-modal :id="modalID('category')" v-on:update-selected="getSelectedCategory"></category-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import notesvg from "./../../notesvg";
import CategoryModal from "./../../modals/CreateCategoryModal.vue";
import store from "./../../../store";

import HelperMixin from "./../../../mixins/helpers.js";

const SimpleMDE = require("simplemde");
const Marked = require("marked");

export default {
  components: {
    "note-svg": notesvg,
    "category-modal": CategoryModal
  },
  mixins: [HelperMixin],
  data() {
    return {
      category: store.getters.selectedCategory,
      catindex: 0,
      smde: "",
      editing: false,
      selectedNote: false,
      noteDiv: {
        src: "src/assets/notebg.png",
        minHeight: "200px"
      }
    };
  },
  computed: {
    ...mapGetters(["selectedCategory", "getCategory", "getNote"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // on initial load get selected category
    });
  },
  methods: {
    ...mapMutations(["updateSelectedCategory"]),
    quickDeleteItem() {},
    quickViewNote(e) {
      let target = e.currentTarget,
        noteID = target.attributes["data-note-id"].value;

      this.selectedNote = this.getNote(noteID).note;
    },
    getSelectedCategory() {
      let catKey = this.$route.params.catid;

      this.category = this.getCategory(catKey).cat;
      this.catindex = this.getCategory(catKey).index;

      //
      this.updateSelectedCategory(this.category);
    },
    initSMDE() {
      this.smde = new SimpleMDE({
        element: document.getElementById("category-markdown")
      });
    }
  },
  mounted() {
    console.log(this.$route.params);
    // this.initSMDE();
    // console.log(this.smde);
    this.getSelectedCategory();
  }
};
</script>
<style lang="scss" scoped>
.note-bg {
  width: 100%;
}

.note-quick {
  position: relative;

  p {
    position: absolute;
    // border: 1px solid red;
    background-color: rgba(248, 249, 250, 0.9);
    text-transform: capitalize;
    top: 0;
    padding-left: 50px;
    padding-top: 10px;
    z-index: 20;
    width: 90%;
    right: 0;

    @media screen and (min-width: 992px) {
      padding-left: 70px;
    }
  }
}
</style>
