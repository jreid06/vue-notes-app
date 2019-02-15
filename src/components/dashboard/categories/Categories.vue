<template>
  <div>
    <div class="row pt-0">
      <div class="col-12 p-4 text-left">
        <h3>
          All My
          <span class="text-success">Categories</span>
        </h3>
      </div>
      <div class="col-12 bg-white">
        <ul class="h4 text-left list-inline text-secondary mr-auto w-25 mt-2 pt-1">
          <li class="list-inline-item" :class="{'text-success':layout.status}" v-for="(layout,key) in layoutTypes" :key="key" @click="toggleLayout(layout.name)">
            <i :class="layout.icon" :title="layout.name |firstWordCapital"></i>
          </li>
        </ul>
      </div>
      <list-layout :latestcategories="latestCategories" :total="categories.length" v-if="layoutTypes.list.status"></list-layout>
      <grid-layout :latestcategories="latestCategories" :total="categories.length" 
      v-if="layoutTypes.grid.status"></grid-layout>
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers.js";

import NoteModal from './../../modals/CreateNoteModal.vue';
import ListLayout from "./ListLayout.vue";
import GridLayout from "./GridLayout.vue";

export default {
  mixins: [HelperMixin],
  components: {
    "list-layout": ListLayout,
    "grid-layout": GridLayout,
    "note-modal": NoteModal
  },
  data() {
    return {
      categories: [],
      layoutTypes: {
        grid: {
          name: "grid",
          status: true,
          icon: "fas fa-grip-horizontal"
        },
        list: {
          name: "list",
          status: false,
          icon: "fas fa-grip-lines"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["allCategories", "getNote", "modalID"]),
    latestCategories() {
      return this.allCategories.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });
    }
  },
  methods: {
    toggleLayout(layout){
      const vm = this;
      switch (layout) {
        case 'grid':
          vm.layoutTypes.grid.status ? '' : vm.layoutTypes.grid.status = true;
          vm.layoutTypes.list.status ? vm.layoutTypes.list.status = false : '';
          break;
        case 'list':
          vm.layoutTypes.list.status ? '' : vm.layoutTypes.list.status = true;
          vm.layoutTypes.grid.status ? vm.layoutTypes.grid.status = false : '';
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    const vm = this;
    vm.categories = vm.allCategories;
  }
};
</script>
<style lang="scss" scoped>
.all-cat-header {
  cursor: pointer;
  // background-color:
}
</style>
