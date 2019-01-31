<template>
  <div class="bg-white shadow-sm itemlist pr">
    <div v-if="this.items.length">
      <cat-view :categories="lastestData" :load="load" :limit="limit" v-if="load === 'categories'"></cat-view>
      <note-view :notes="lastestData" :load="load" :limit="limit" v-else></note-view>
    </div>
    <div
      class="no-items d-flex flex-column justify-content-center align-items-center bg-light text-warning p-2"
      v-else
    >
      <h3>No Items have been created</h3>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers.js";

import CategoryList from "./ItemList_categories.vue";
import Noteist from "./ItemList_notes.vue";

const $ = require("jquery");

export default {
  components: {
    "cat-view": CategoryList,
    "note-view": Noteist
  },
  mixins: [HelperMixin],
  props: {
    load: {
      type: String
    },
    limit: {
      type: Number,
      required: true
    },
    icon: {
      type: String
    },
    mutationName: {
      type: String,
      required: true
    },
    items: {
      type: Array
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["allCategories", "allNotes"]),
    lastestData() {
      let limit = this.limit,
        vm = this;

      switch (vm.load) {
        case "categories":
          // sort by recently created
          return vm.allCategories.sort(function(a, b) {
            return b.createdAt - a.createdAt;
          });
          break;
        case "notes":
          return vm.allNotes.sort(function(a, b) {
            return b.createdAt - a.createdAt;
          });
          break;
        default:
          break;
      }
    }
  },
  data() {
    return {
      loading: true,
      listData: this.items
    };
  },
  methods: {
    quickDeleteItem(e) {
      let target = e.target,
        itemID = target.attributes["data-id"].value;

      this.deleteItem(this.mutationName, itemID, this.load);
    },
    deleteItem(commit, itemID, loadItem) {
      this.$store.commit(commit, itemID);
      this.updateData(loadItem);
    },
    // called from the create modals
    updateData(getter) {
      const vm = this;
      switch (getter) {
        case "categories":
          vm.listData = this.$store.getters.allCategories;
          break;
        case "notes":
          vm.listData = this.$store.getters.allNotes;
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    let vm = this;

    // switch (vm.load) {
    //   case "categories":
    //     vm.updateData(vm.load);
    //     break;
    //   case "notes":
    //   console.log('update LOAD NOTES');

    // 	vm.updateData(vm.load);
    //     break;
    //   default:
    //     break;
    // }
  },
  destroyed() {
    console.log("DESTROYED ITEM LIST");
  }
};
</script>
<style lang="scss">
.itemlist::-webkit-scrollbar {
  width: 0 !important;
}
.itemlist {
  overflow: -moz-scrollbars-none;
}
.itemlist {
  -ms-overflow-style: none;
}

.itemlist {
  min-height: 200px;
}

.itemlist-li {
  // 	border: 1px solid greenyellow;
  background-color: #fff;
  transition: all 0.6s ease-out;
  p {
    padding: 0 !important;
  }

  > div {
    // border: 1px solid orange;

    @media screen and (min-width: 576px) and (max-width: 768px) {
      width: 100%;
    }
  }
}

.no-items {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}

.created {
  background-color: red;
  // animation: changeBG .6s ease-in-out;
}

@keyframes changeBG {
  to {
    background-color: white;
  }
}
</style>
