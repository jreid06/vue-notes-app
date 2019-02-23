<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog text-light" role="document">
      <div class="modal-content border border-danger bg-danger">
        <div class="modal-header text-center border-0">
          <h5 class="modal-title w-100">Reset App Data</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <template v-if="allCategories.length > 0">
            <p>
              This will delete &nbsp;
              <b class="h3 text-success">{{allCategories.length}}</b>
              &nbsp;
              {{allCategories.length ===1 ? 'category' : 'categories'}}?
            </p>
            <p>
              <span class="font-weight-bold">Note:</span>
              This action will also delete &nbsp;
              <b class="h3 text-success">{{allNotes.length}}</b>
              &nbsp;
              {{allNotes.length === 1 ? 'note' : 'notes'}} from their corresponding category/categories
            </p>
          </template>
          <template v-else>
            <p>Luckily there is no data to reset. Start adding some content!!</p>
          </template>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn text-light" data-dismiss="modal">
            <i class="far fa-times-circle"></i>
          </button>
          <button
            type="button"
            class="btn text-success"
            @click="confirmReset"
            v-if="allCategories.length > 0"
          >
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

const $ = require("jquery");

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["allCategories", "allNotes"])
  },
  data() {
    return {
      reset: false
    };
  },
  watch: {},
  methods: {
    ...mapMutations(["resetAppData"]),
    confirmReset() {
      this.resetAppData({modalID: this.id});
    }
  },
  mounted() {
    //   this.deleteItem = this.getItemToDelete;
    const vm = this;

    $(`#${this.id}`).on("hidden.bs.modal", e => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
