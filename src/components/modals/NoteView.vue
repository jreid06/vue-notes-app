<template>
  <div class="modal fade" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5>Viewing Note <b :style="{color: getCategory(note.categoryID).cat.colour}">{{note.title | firstWordCapital}}</b></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body pt-3 pr hm-200">
          
		  <transition
        name="loader-fade-toggle"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <loading class="l-0" v-if="loading"></loading>
      </transition>

		<template v-if="status">
			<div v-if="note.noteMarkdown" v-html="marked(note.noteMarkdown)"></div>
			<div class="p-3 text-center bg-light" v-else>
				<p>This note has no content ..</p>
				<router-link :to="`/dashboard/note/${note.key}`">
					<i class="fas fa-edit"></i>
				</router-link>
			</div>
		</template>
		
        <div class="modal-footer">
          <button type="button" class="btn text-danger" data-dismiss="modal">
            <i class="far fa-times-circle"></i>
          </button>
          <!-- <button
            type="button"
            class="btn text-success"
            @click="createNote"
            v-if="action === 'create'"
          >
            <i class="fas fa-check"></i>
          </button>-->
          <button type="button" class="btn text-success">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import Note from "./../../classes/note.js";
import Storage from "./../../classes/LocalForageClass.js";
import HelperMixin from "./../../mixins/helpers.js";
import Notifications from "./../../mixins/toaster.js";
import Loader from './../Loader.vue';

const $ = require("jquery");
const Joi = require("joi-browser");
const marked = require("marked");

export default {
  mixins: [HelperMixin, Notifications],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
	  loading: Loader
  },
  computed: {
    ...mapGetters([
      "allCategories",
      "modalID",
      "getCategory",
      "editStatus",
      "getItemToEdit"
    ]),
  
  },
  data() {
    return {
	  marked: marked,
	  note: {},
	  loading: true,
	  status: false
    };
  },
  methods: {
    ...mapMutations(["updateEditItem", "updateNoteInCategory"]),
    updateNote() {
      const vm = this;

      let { title, brief, catID } = this.noteDetails;
      // update edited item first
      this.updateEditItem({ title, brief, categoryID: catID });

      // when modal disappears view gets data
      this.updateSelectedNote({
        payload: vm.getItemToEdit,
        changeCategory: true
      });

      // // emit result to update the selected note in the view
      this.$emit("update-selected", `reload`);

      // trigger notification
      this.successToaster(
        `Note <b>"${title}"</b> has been updated successfully`
      );

      // close modal
      $(`#${this.modalID("note")}`).modal("hide");
    },
    resetData() {
      const vm = this;
	  vm.status = false;
    },
    resetEdit() {
      this.$store.dispatch("resetEditObjAction");
    }
  },
  mounted() {
    const vm = this;

    $(`#${this.modalID("viewnote")}`).on("show.bs.modal", function(e) {
		vm.note = vm.getItemToEdit;
		vm.status = true;

		setTimeout(()=>{
			vm.loading = false;
		}, 1500)
    });

    $(`#${this.modalID("viewnote")}`).on("hidden.bs.modal", function(e) {
      vm.resetData();

      if (vm.editStatus) {
        vm.resetEdit();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
