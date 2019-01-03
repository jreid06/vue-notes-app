<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">Create
            <span class="text-success">Note</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="col-12 pb-2">
                <input type="text" class="form-control" placeholder="Note title ..." v-model="note.title">
              </div>
              <div class="col-12 pb-2">
                <textarea class="form-control" rows="3" placeholder="Brief intro to note ..." v-model="note.brief"></textarea>
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
import Note from './../../classes/note.js'
import Helpers from './../../classes/helper.js'

const Joi = require('joi-browser');

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    noteDetails(){
      return this.note;
    }
  },
  data() {
    return {
      note: {
        title: '',
        brief: ''
      },
      categories: []
    };
  },
  methods:{
    categorySchema() {
      const schema = Joi.object().keys({
        title: Joi.string().regex(/^[a-zA-Z]/).min(3).max(25),
        description: Joi.string().min(0).max(255),
        color: Joi.string().max(8)
      });

      return schema;
    },
    validateCategory() {
      let schema = this.categorySchema();

      return Joi.validate({ title: categoryDetails.title, description: categoryDetails.description, color: categoryDetails.color }, schema);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
