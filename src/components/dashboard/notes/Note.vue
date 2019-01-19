<template>
  <div>
    <div class="row pt-0 bg-light" v-if="note">
      <div class="col-12 p-4 text-left">
        <div class="float-left">
          <h3>
            <i class="far fa-file-alt" :style="{color: getCategory(note.categoryID).cat.colour}"></i>
            <span class="text-capitalize">{{note.title}}</span>
          </h3>
          <p class="lead">{{note.brief | firstWordCapital}}</p>
          <hr>
          <h5>
            <i class="fas fa-folder" :style="{color: getCategory(note.categoryID).cat.colour}"></i>
            <span
              :style="{color: getCategory(note.categoryID).cat.colour}"
              class="text-capitalize"
            >{{ getCategory(note.categoryID).cat.title}}</span>
          </h5>
          <!-- <p class="small">{{category.description}}</p> -->
        </div>
        <div class="float-right display-4 pointer">
          <i
            class="far fa-edit"
            :data-item="JSON.stringify(selectedNoteItem)"
            data-action="edit"
            data-item-type="note"
            @click="triggerModal"
          ></i>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="row pt-3 note-data pr">
      <transition
        name="loader-fade-toggel"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <loading v-if="loading"></loading>
      </transition>

      <div class="col-12 col-lg-5 markdown-note-column text-left">
        <textarea id="note-smde"></textarea>
      </div>
      <div class="col-12 col-lg-7 parsed-note-markdown">
        <note-svg :fill="getCategory(note.categoryID).cat.colour"></note-svg>
        <div id="markdown-div" class="pt-4 p-3" v-html="marked(note.noteMarkdown)"></div>
      </div>
    </div>
    <!--  -->
    <note-modal :id="modalID('note')" v-on:update-selected="getSelectedNote"></note-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import notesvg from "./../../notesvg";
import NoteModal from "./../../modals/CreateNoteModal.vue";
import Loader from "./../../Loader";
import store from "./../../../store";

import HelperMixin from "./../../../mixins/helpers.js";

const SimpleMDE = require("simplemde");
const marked = require("marked");

export default {
  components: {
    "note-svg": notesvg,
    "note-modal": NoteModal,
    loading: Loader
  },
  mixins: [HelperMixin],
  data() {
    return {
      note: store.getters.selectedNote,
      noteindex: 0,
      loading: true,
      marked: marked,
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
    ...mapGetters(["selectedNoteItem", "getCategory", "getNote"])
  },
  watch: {
    editing: function(nv, ov) {
      console.log("watchers");
      console.log(nv);

      if (!nv) {
        this.updateNoteInCategory({
          getters: this.$store.getters,
          categoryID: this.note.categoryID,
          note: this.note
    });
      }
    }
  },
  methods: {
    ...mapMutations(["updateSelectedNote"]),
    quickDeleteItem() {},
    getSelectedNote(noteID) {
      let note = this.getNote(noteID),
        // check to see if its returning category object or string
        noteCat = this.isJSON(note.note.category)
          ? JSON.parse(note.note.category)
          : note.note.category;

      note.note.category = noteCat;

      this.updateSelectedNote(note.note);
      this.note = this.selectedNoteItem;
      this.noteindex = note.index;
    },
    initSMDE() {
      const vm = this;
      let smde = new SimpleMDE({
        element: document.getElementById("note-smde"),
        initialValue: vm.note.noteMarkdown
          ? vm.note.noteMarkdown
          : "# Your note information here"
      });

      let timeout = null;
      // smde events
      smde.codemirror.on("changes", val => {
        clearTimeout(timeout);
        vm.editing = true;

        timeout = setTimeout(function() {
          vm.note.noteMarkdown = smde.value();
          vm.editing = false;
        }, 400);
      });
    }
  },
  created() {
    console.log("created");
    this.getSelectedNote(this.$route.params.noteid);
  },
  mounted() {
    const vm = this;
    this.initSMDE();

    setTimeout(function() {
      vm.loading = false;
    }, 1200);
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
