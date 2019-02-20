<template>
  <div>
    <div class="row pt-0 bg-light">
      <div class="col-12 p-4 text-left">
        <h3>My
          <span class="text-success">Notes</span>
        </h3>
      </div>
    </div>
    <div class="row pt-3">
      <!-- <div class="col-12 col-sm-6 col-lg-3" v-for="(note, i) in latestNotes" :key="i">
		  <note-card :note="note" :category-belongs-to="getCategory(note.categoryID).cat"></note-card>
	  </div> -->
	  <div class="col-12">
		  <div class="card-columns">
			  <note-card :note="note" v-for="(note, i) in latestNotes" :key="i"></note-card>
		  </div>
	  </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import NoteCard from "./../widgets/Note.vue";

export default {
  components: {
    "note-card": NoteCard
  },
  computed: {
    ...mapGetters(["allNotes", "getCategory"]),
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
