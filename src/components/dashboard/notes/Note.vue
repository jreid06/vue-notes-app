<template>
  <div>
    <div class="row pt-0 bg-light">
      <div class="col-12 p-4 text-left">
        <div class="float-left">
          <h3>
            <!-- <span :style="{color: category.colour}" class="text-capitalize">{{category.title}}</span> -->
          </h3>
          <!-- <p class="small">{{category.description}}</p> -->
        </div>
        <div class="float-right display-4 pointer">
          <!-- <i
            class="far fa-edit"
            :data-item="JSON.stringify(selectedCategory)"
            data-action="edit"
            data-item-type="category"
            @click="triggerModal"
          ></i> -->
        </div>
      </div>
    </div>

    <note-modal :id="modalID('note')" v-on:update-selected="getSelectedNote"></note-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import notesvg from "./../../notesvg";
import NoteModal from "./../../modals/CreateNoteModal.vue";
import store from "./../../../store";

import HelperMixin from "./../../../mixins/helpers.js";

const SimpleMDE = require("simplemde");
const Marked = require("marked");

export default {
  components: {
    "note-svg": notesvg,
    "note-modal": NoteModal
  },
  mixins: [HelperMixin],
  data() {
    return {
      note: store.getters.selectedNoteItem,
      noteindex: 0,
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // on initial load get selected note
      vm.getSelectedNote(vm.$route.params.noteid);
    });
  },
  methods: {
    ...mapMutations(["updateSelectedNote"]),
    quickDeleteItem() {},
    getSelectedNote(noteID) {
      let note = this.getNote(noteID);
    //   debugger;
      this.updateSelectedNote(note.note);
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
  mounted() {
    console.log(this.$route.params);
    // this.initSMDE();
    // console.log(this.smde);
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
