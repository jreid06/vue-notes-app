<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">Select a <span class="text-success">Note</span> from list to load</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
			  <div class="form-row">
				  <div class="col">
					<input type="text" class="form-control" placeholder="Category title ...">
				  </div>
				  <div class="col">
					<input type="text" class="form-control" placeholder="Category title ...">
				  </div>
			  </div>
		  </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn text-danger" data-dismiss="modal"><i class="far fa-times-circle"></i></button>
          <button type="button" class="btn text-success"><i class="fas fa-check"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {},
  data() {
    return {
      categories: []
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
