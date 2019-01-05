<template>
  <div class="bg-white shadow-sm itemlist pr">
    <ul class="list-group list-group-flush" v-if="listData.length > 0">
      <li
        class="itemlist-li list-group-item d-flex flex-row flex-no-wrap flex-sm-wrap flex-md-no-wrap text-capitalize"
        v-for="(n,i) in lastestData"
        :key="i"
      >
        <div class="p-2 flex-fill h4" :style="{color: n.colour}">
          <i :class="icon"></i>
        </div>
        <div class="p-2 flex-fill">
          <p>{{n.category}}</p>
        </div>
        <div class="p-2 flex-fill">
          <p>
            {{helpers.formatDate(n.createdAt).day}}
            {{helpers.formatDate(n.createdAt).month}}
            &nbsp;&bull;&nbsp;
            {{helpers.formatDate(n.createdAt).hours}}:{{helpers.formatDate(n.createdAt).minutes}}
            <span
              class="small text-lowercase"
            >{{helpers.formatDate(n.createdAt).prefix}}</span>
            &nbsp;&bull;&nbsp;
            {{helpers.formatDate(n.createdAt).year}}
          </p>
        </div>
        <div class="p-2 flex-fill bg-light">
          <ul class="list-inline">
            <li
              class="list-inline-item text-danger hvr-grow"
              :data-id="n.key"
              @click="quickDeleteItem"
            >
              <i class="far fa-trash-alt" :data-id="n.key"></i>
            </li>
            <li class="list-inline-item text-info hvr-grow">
              <i class="far fa-edit"></i>
            </li>
            <li class="list-inline-item hvr-grow">
              <i class="fas fa-ellipsis-h"></i>
            </li>
          </ul>
        </div>
      </li>
    </ul>
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

const $ = require("jquery");

export default {
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
    }
  },
  watch: {
    listData: function(newVal, oldVal) {
      console.log("WATCHER RUNS");
      console.log(newVal);

      if (newVal.length < 0) {
        console.log("EMPTY ARRAY OF DATA");
      } else {
        console.log("LIST WITH DATA TO SHOW");
      }
    }
  },
  computed: {
    ...mapGetters(["allCategories"]),
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

        default:
          break;
      }
    }
  },
  data() {
    return {
      loading: true,
      listData: []
    };
  },
  methods: {
    quickDeleteItem(e) {
      let target = e.target,
        itemID = target.attributes["data-id"].value;

      this.$store.commit("deleteCategory", itemID);
    },
    updateData() {
      vm.listData = vm.$store.getters.allCategories;
    }
  },
  mounted() {
    let vm = this;

    switch (vm.load) {
      case "categories":
        vm.listData = vm.$store.getters.allCategories;
        break;

      default:
        break;
    }
  },
  destroyed() {
    console.log("DESTROYED ITEM LIST");
  }
};
</script>
<style lang="scss">
.itemlist {
  min-height: 200px;
  max-height: 400px;
  overflow: scroll;
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
