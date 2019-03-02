<template>
  <div>
    <div class="row pt-0" v-if="note">
      <div class="col-12 p-4 text-left">
        <div class="float-left">
          <h3>
            <i class="far fa-file-alt" :style="{color: getCategory(note.categoryID).cat.colour}"></i>
            <span class="text-capitalize">{{note.title}}</span>
          </h3>
          <p class="lead">{{note.brief | firstWordCapital}}</p>
          <hr>
          <router-link :to="'/dashboard/categories/'+note.categoryID">
            <h5>
              <i class="fas fa-folder" :style="{color: getCategory(note.categoryID).cat.colour}"></i>
              <span
                :style="{color: getCategory(note.categoryID).cat.colour}"
                class="text-capitalize"
              >{{ getCategory(note.categoryID).cat.title}}</span>
            </h5>
          </router-link>
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
        name="loader-fade-toggle"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <loading v-if="loading"></loading>
      </transition>

      <div class="col-12 p-3">
        <div>
          <ul class="h4 text-left cp list-inline">
            <li
              class="list-inline-item"
              :class="{'text-success': !editing}"
              @click="toggleEdit(false)"
            >
              <i class="far fa-eye"></i>
            </li>
            <li
              class="list-inline-item"
              :class="{'text-success': editing}"
              @click="toggleEdit(true)"
            >
              <i class="fab fa-markdown"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12">
        <template v-if="editing">
          <markdown-editor :smdeid="'note-smde'" :note="note"></markdown-editor>
        </template>
        <template v-else>
          <div class="w-100 bg-light pt-3">
            <ul class="list-inline">
              <li class="list-inline-item h4 pr-3 cp" :data-action="alignment.action" v-for="(alignment, i) in textAlign" :key="i" @click="alignment.method">
                <i :class="alignment.icon"></i>
              </li>
            </ul>
          </div>
          <div class="border border-light p-2 px-5 rounded wmx-900 m-auto" :class="[alignValue]" v-html="marked(note.noteMarkdown)"></div>
        </template>
      </div>
    </div>
    <!--  -->
    <note-modal
      :id="modalID('note')"
      v-on:update-selected="getSelectedNote"
      :all-categories-p="allCategories"
    ></note-modal>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import NoteModal from "./../../modals/CreateNoteModal.vue";
import Loader from "./../../Loader.vue";
import MarkdownEditor from "./../widgets/MarkdownEditor.vue";
import store from "./../../../store";

import HelperMixin from "./../../../mixins/helpers.js";

const SimpleMDE = require("simplemde");
const marked = require("marked");

export default {
  components: {
    "markdown-editor": MarkdownEditor,
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
      alignValue: 'text-left',
      textAlign: [
        {
          icon: "fas fa-align-left",
          method: this.toggleAlignment,
          action: "text-left",
          active: true
        },
        // {
        //   icon: "fas fa-align-justify",
        //   method: this.toggleAlignment,
        //   action: "text-justify",
        //   active: false
        // },
        {
          icon: "fas fa-align-center",
          method: this.toggleAlignment,
          action: "text-center",
          active: false
        },
        {
          icon: "fas fa-align-right",
          method: this.toggleAlignment,
          action: "text-right",
          active: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "selectedNoteItem",
      "getCategory",
      "getNote",
      "allCategories"
    ])
  },
  methods: {
    // ...mapMutations(["updateSelectedNote"]),
    toggleAlignment(e) {
      let target = e.currentTarget,
          alignment = target.attributes['data-action'].value;

      console.dir(target);
      console.log(alignment);
      this.alignValue = alignment;
      
    },
    toggleEdit(editMode) {
      this.editing = editMode;
    },
    getSelectedNote() {
      let noteID = this.$route.params.noteid;
      let note = this.getNote(noteID);

      this.updateSelectedNote({ payload: note.note });
      this.note = this.selectedNoteItem;
      this.noteindex = note.index;
    }
  },
  created() {
    this.getSelectedNote();
  },
  mounted() {
    const vm = this;

    setTimeout(function() {
      vm.loading = false;
    }, 1200);
  }
};
</script>
<style lang="scss">
.note-data {
  min-height: 300px;
  transition: all 0.3s ease-in-out;
}

h1 {
  color: gold !important;
}

#markdown-div {
  border-radius: 10px;
  background-color: rgba(241, 241, 241, 0.2);
  position: relative;
  top: -100%;
  height: 100%;
  // right: 0;
  width: 75%;
  padding-left: 10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 20;
}

img {
  width: 20%;
}
</style>
