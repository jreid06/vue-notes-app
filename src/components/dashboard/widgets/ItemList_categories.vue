<template>
  <div class="w-100 pr cat-list-div pr">
    <div class="toggle-controls pa w-100 z-10 shadow-sm">
      <div class="d-flex flex-row flex-wrap">
        <div class="header p-3 bg-dark text-light text-center w-100">Categories</div>
        <div
          class="control all-categories p-2 d-flex border flex-no-wrap justify-content-between flex-fill align-items-center bg-white"
        >
          <div class="p-2 h3">
            <i class="fas fa-folder"></i>
          </div>
          <div class="p-2">
            <p>All</p>
          </div>
          <div class="p-2 h4">{{allCategories.length}}</div>
        </div>
        <div
          class="control categories-bookmarked p-2 border d-flex flex-no-wrap justify-content-between flex-fill align-items-center bg-white"
        >
          <div class="p-2 h3">
            <i class="fas fa-star bookmark"></i>
          </div>
          <div class="p-2">
            <p>Bookmarked</p>
          </div>
          <div class="p-2 h4">{{bookmarkedCategories.amount}}</div>
        </div>
      </div>
    </div>
    <div class="oy-s pnt-9 cat-list-div">
      <ul class="list-group list-group-flush">
        <li
          v-for="(n, i) in categories"
          :key="i"
          class="p-2 text-center flex-fill h-25 border-right border-light d-flex animated fadeIn m-1 w-100"
        >
          <div class="p-2">
            <h2 :style="{color: n.colour}">
              <i :class="n.icon"></i>
            </h2>
          </div>
          <div class="p-2 text-left wn-35">
            <span class="small">Title</span>
            <h6>{{n.title |truncate(17) | firstWordCapital}}</h6>
          </div>
          <div class="p-2 flex-fill">
            <span class="small">Created</span>
            <h6>
              <span v-html="formatDate(n.createdAt).ukDate"></span>
            </h6>
          </div>
          <div class="p-2 flex-fill">
            <ul class="list-inline controls">
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
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers";

export default {
  mixins: [HelperMixin],
  props: {
    categories: {
      type: Array
    },
    load: {
      required: true
    },
    limit: {
      required: true
    }
  },
  computed: {
    ...mapGetters(["bookmarkedCategories", "allCategories"])
  },
  data() {
    return {
      bookmarkedRows: 2
    };
  }
};
</script>
<style lang="scss" scoped>
.cat-list-div {
  // min-height: 50px;
  max-height: 450px;
  overflow: hidden;
}

.bookmark {
  color: gold;
}

.control {
  max-width: 50%;
  li {
    // border: 1px solid blue;
  }
}

.list-section {
}
</style>
