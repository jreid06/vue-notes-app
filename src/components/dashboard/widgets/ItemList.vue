<template>
  <div class="bg-white shadow-sm itemlist pr">
    <!-- <ul class="list-group list-group-flush" v-if="this.items.length > 0">
      <li
        class="itemlist-li list-group-item d-flex flex-row flex-no-wrap flex-sm-wrap flex-md-no-wrap text-capitalize"
        v-for="(n,i) in lastestData"
        :key="i" >
        <div class="p-2 flex-fill h4 text-left" :style="{color: n.colour}">
          <i :class="n.icon"></i>
        </div>

        <div class="p-2 flex-fill">
          <p>
            {{n.title}} 
            <span class="text-danger" v-if="load === 'notes'"> - CatID: {{n.categoryID}}</span>
          </p>
        </div>
        <div class="p-2 flex-fill">
          <p v-html="formatDate(n.createdAt).readableDate"></p>
        </div>
        <div class="p-2 flex-fill">
          <p>{{n.key}}</p>
        </div>
        <div class="p-2 flex-fill bg-light">
          <ul class="list-inline">
            <li
              class="list-inline-item text-danger hvr-grow"
              :data-id="n.key"
              :data-item="JSON.stringify(n)"
              :data-type="load"
              data-action="delete"
              @click="triggerModal"
            >
              <i class="far fa-trash-alt" :data-id="n.key"></i>
            </li>
            <li class="list-inline-item text-info hvr-grow">
              <router-link :to="'/dashboard/'+ load +'/'+ n.key">
                <i class="far fa-edit"></i>
              </router-link>
            </li>
            <li class="list-inline-item hvr-grow">
              <i class="fas fa-ellipsis-h"></i>
            </li>
          </ul>
        </div>
      </li>
    </ul> -->
    <div v-if="this.items.length">
        <cat-view :categories="lastestData" :load="load" v-if="load === 'categories'"></cat-view>
        <note-view :notes="lastestData" :load="load" v-else></note-view>
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

import CategoryList from './ItemList_categories.vue';
import Noteist from './ItemList_notes.vue';

const $ = require("jquery");

export default {
  components: {
    'cat-view': CategoryList,
    'note-view': Noteist
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
      console.log(getter);

      switch (getter) {
        case "categories":
          console.log("categories list data updated");
          console.log(this.$store.getters.allCategories);
          vm.listData = this.$store.getters.allCategories;
          break;
        case "notes":
          console.log("notes list data updated");
          console.log(this.$store.getters.allNotes);

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
.itemlist {
  min-height: 50px;
  max-height: 400px;
  overflow-y: scroll;
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
