<template>
  <div class="w-100 pr cat-list-div pr">
    <div class="toggle-controls pa w-100 z-10 shadow-sm">
      <div class="d-flex flex-row flex-wrap">
        <div class="header p-3 bg-dark text-light text-center w-100">Categories</div>
        <div
          class="control all-categories p-2 d-flex border flex-no-wrap justify-content-between flex-fill align-items-center"
          @click="toggleBookmarked(false)"
          :class="{ 'bg-dark text-light':!bookmarked, 'bg-white':bookmarked}"
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
          :class="{ 'bg-dark text-light':bookmarked, 'bg-white':!bookmarked}"
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
          <li
            v-for="(n, i) in filterCategories"
            :key="i"
            class="p-2 text-center flex-fill border-right border-light d-flex animated fadeIn m-1 w-100"
          >
            <div class="p-2">
              <h2 :style="{color: n.colour}">
                <i :class="n.icon"></i>
              </h2>
            </div>
            <div class="p-2 text-left wn-35">
              <span class="small">Title</span>
              <h6>{{n.title |truncate(17) | firstWordCapital}}</h6>
              <!-- <span class="small">Created</span>
              <h6 class="small">
                <span v-html="formatDate(n.createdAt).ukDate"></span>
              </h6> -->
            </div>
            <div
              class="p-2 pt-4 flex-fill d-flex flex-row justify-content-around align-items-center"
              :style="{backgroundColor: n.colour, color: '#f2f2f2'}"
            >
              <span class="h3 p-1">
                <i class="far fa-file-alt"></i>
              </span>
              <h3 class="p-1">{{n.notes.length}}</h3>
            </div>
            <!--  -->
            <div
              class="p-2 pt-3 flex-fill d-flex flex-row flex-no-wrap justify-content-around text-light align-items-center"
              :style="{backgroundColor: n.colour}">
              <div
                class="w-100 flex-fill"
                :data-id="n.key"
                :data-item="JSON.stringify(n)"
                :data-type="load"
                data-action="delete"
                @click="triggerModal"
              >
                <i class="far fa-trash-alt" :data-id="n.key"></i>
              </div>
              <div class="w-100 flex-fill">
                <router-link :to="'/dashboard/'+ load +'/'+ n.key" class="text-light">
                  <i class="far fa-edit"></i>
                </router-link>
              </div>
              <div class="w-100 flex-fill">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
          </li>
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
    ...mapGetters(["bookmarkedCategories", "allCategories"]),
    filterCategories() {
      const vm = this;
      if (this.bookmarked) {
        let f = vm.categories.filter((el, i) => {
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
