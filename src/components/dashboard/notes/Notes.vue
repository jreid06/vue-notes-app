<template>
  <div>
    <div class="row pt-0 bg-light">
      <div class="col-12 p-4 text-left">
        <h3>
          My
          <span class="text-success">Notes</span>
        </h3>
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-12" v-if="latestNotes.length > 0">
        <div class="card-columns">
          <note-card :note="note" v-for="(note, i) in latestNotes" :key="i"></note-card>
        </div>
      </div>
      <div class="col-12" v-else>
        <div
          class="create-component d-flex flex-column justify-content-center align-items-center hfx-400"
          :data-action="'note'"
          @click="triggerModal"
        >
          <div class="h3">
            <i class="fas fa-plus-circle hvr-grow" :style="{color: '#9b9b9b'}"></i>
            <p>Create a note</p>
          </div>
        </div>
      </div>
    </div>
    <note-modal :id="modalID('note')" :all-categories-p="allCategories"></note-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import NoteCard from "./../widgets/Note.vue";
import NoteModal from "./../../modals/CreateNoteModal.vue";
import HelperMixin from "./../../../mixins/helpers.js";

export default {
  mixins: [HelperMixin],
  components: {
    "note-card": NoteCard,
    "note-modal": NoteModal
  },
  computed: {
    ...mapGetters(["allNotes", "allCategories", "getCategory", "modalID"]),
    latestNotes() {
      return this.allNotes.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>
