<template>
  <div class="w-100 pr note-list-div pr">
    <div class="toggle-controls pa w-100 z-10 shadow-sm">
      <div class="d-flex flex-row flex-wrap">
        <div class="header p-3 bg-dark text-light text-center w-100">Notes</div>
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
          <div class="p-2 h4">{{allNotes.length}}</div>
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
          <div class="p-2 h4">{{bookmarkedNotes.amount}}</div>
        </div>
      </div>
    </div>
    <div class="oy-s pnt-9 note-list-div">
      <ul class="list-group list-group-flush">
        <template v-if="filterNotes.length > 0">
          <li
            v-for="(n, i) in filterNotes"
            :key="i"
            class="p-2 text-center flex-fill h-25 border-right border-light d-flex animated fadeIn m-1 w-100"
          >
            <div class="p-2">
              <h2 :style="{color: getCategory(n.categoryID).cat.colour}">
                <i :class="n.icon"></i>
              </h2>
            </div>
            <div class="p-2 text-left wn-40">
              <span class="small">Title</span>
              <h6
                :style="{color: getCategory(n.categoryID).cat.colour}"
              >{{n.title |truncate(17) | firstWordCapital}}</h6>
              <span class="small">Created</span>
              <h6 class="small">
                <span v-html="formatDate(n.createdAt).ukDate"></span>
              </h6>
            </div>
            <div
              class="flex-fill d-flex flex-column flex-no-wrap justify-content-center text-light align-items-center"
            >
              <div
                class="p-2 bg-danger w-100 flex-fill"
                :data-id="n.key"
                :data-item="JSON.stringify(n)"
                :data-type="load"
                data-action="delete"
                @click="triggerModal"
              >
                <i class="far fa-trash-alt" :data-id="n.key"></i>
              </div>
              <div class="p-2 bg-light w-100 flex-fill">
                <router-link :to="'/dashboard/'+ load +'/'+ n.key">
                  <i class="far fa-edit"></i>
                </router-link>
              </div>
              <div class="bg-light w-100 flex-fill" >
                <i class="fas fa-ellipsis-h" :style="{color: getCategory(n.categoryID).cat.colour}"></i>
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
  props: {
    notes: {
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
    ...mapGetters(["getCategory", "allNotes", "bookmarkedNotes"]),
    filterNotes() {
      const vm = this;
      if (this.bookmarked) {
        let f = vm.notes.filter((el, i) => {
          return el.bookmarked;
        });

        return f;
      }

      return vm.notes;
    }
  },
  mixins: [HelperMixin],
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
.note-list-div {
  //   min-height: 200px;
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
</style>
