<template>
  <div>
      <textarea id="note-smde"></textarea>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import HelperMixin from "./../../../mixins/helpers.js";

const SimpleMDE = require("simplemde");
const marked = require("marked");

export default {
  props: {
      smdeid: {
          type: string,
          required: true
      },
      note: {
          type: Object,
          required: true
      }
  },
  watch: {
    editing: function(nv, ov) {
      console.log("watchers");
      console.log(nv);
      const vm = this;

      if (!nv) {
        vm.updateEditedNote(vm.note);
        vm.updateSelectedNote({ payload: vm.note });
      }
    }
  },
  data() {
    return {
      marked: marked,
      editing: false
    };
  },
  methods: {
    ...mapMutations([
      "updateSelectedNote",
      "updateNoteInCategory",
      "updateEditedNote"
    ]),
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
  }
};
</script>
<style lang="scss" scoped>
</style>

