<template>
  <div class="w-100 pr cat-list-div pr">
    <div class="toggle-controls pa w-100 z-10 shadow-sm">
      <div class="d-flex flex-row flex-wrap">
        <div class="header p-3 bg-light text-success text-center w-100 h3 mb-0">Categories</div>
        <div
          class="control all-categories p-2 d-flex border flex-no-wrap justify-content-between flex-fill align-items-center"
          @click="toggleBookmarked(false)"
          :class="{ 'bg-light text-success':!bookmarked, 'bg-white':bookmarked}"
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
          class="control categories-bookmarked p-2 border d-flex flex-no-wrap justify-content-between flex-fill align-items-center"
          @click="toggleBookmarked(true)"
          :class="{ 'bg-light text-success':bookmarked, 'bg-white':!bookmarked}"
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
        <template v-if="filterCategories.length > 0">
          <catlist-item  v-for="(n, i) in filterCategories"
    :key="i" :n="n" :load="load"></catlist-item>
        </template>
        <template v-else>
			<li class="p-2 text-center flex-fill h-25 d-flex animated fadeIn m-1 w-100">
				<p class="w-100">There are no {{load}} to show</p>
			</li>
		</template>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers";

import Catlistitem from "./Catlist_item.vue";

export default {
  mixins: [HelperMixin],
  components: {
    'catlist-item': Catlistitem
  },
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
    ...mapGetters(["bookmarkedCategories", "allCategories"]),
    filterCategories() {
      const vm = this;
      if (this.bookmarked) {
        let f = vm.allCategories.filter((el, i) => {
          return el.bookmarked;
        });

        return f;
      }

      // return all categories
      return vm.categories;
    }
  },
  data() {
    return {
      bookmarked: false
    };
  },
  methods: {
    toggleBookmarked(b) {
      this.bookmarked = b;
    }
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
