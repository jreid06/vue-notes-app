<template>
  <div @click="toggleBookmarked" class="hvr-grow">
    <div class="bookmark cp" v-if="requiresContainer">
      <i :class="{'far fa-star' : !isBookmarked, 'fas fa-star' : isBookmarked}"></i>
    </div>
    <i class="cp" :class="{'far fa-star' : !isBookmarked, 'fas fa-star' : isBookmarked}" v-else></i>
    <!-- unbookmarked star-->
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    requiresContainer: {
      type: Boolean,
      required: true
	},
	itemType:{
		required: true
	},
	ikey: {
		required: true
	},
    isBookmarked: {
      required: true
    }
  },
  data() {
    return {
      itemRetrieved: false
    };
  },
  computed: {
    ...mapGetters(["getCategory", "getNote"])
  },
  watch: {
    currentItem(nv, ov) {
      const vm = this;
      if (nv != "") {
        vm.itemRetrieved = true;
        return;
      }

      vm.itemRetrieved = false;
    }
  },
  methods: {
    ...mapMutations([
      "updateEditedCategory",
      "updateEditedNote",
      "updateBookmarkedCategories",
      "toggleCategoryBookmark"
    ]),
    toggleBookmarked() {
	  const vm = this;
	  let bookmarked;

      if (vm.isBookmarked) {
        bookmarked = false;
      } else {
        bookmarked = true;
      }

      switch (vm.itemType) {
        case "categories":
          vm.toggleCategoryBookmark({
            isBookmarked: bookmarked,
            key: vm.ikey
          });
          vm.updateBookmarkedCategories({
            bookmarked: bookmarked,
            id: vm.ikey
          });
          break;
        case "note":
          vm.updateEditedNote(item);
          vm.updateBookmarkedNotes({
            bookmarked: item.bookmarked,
            id: vm.ikey
          });
          break;
      }
    },
    updateCurrentItem() {
      const vm = this;
      let itemType = this.itemType;

      switch (itemType) {
        case "categories":
          vm.currentItem = vm.item;
          break;
        case "note":
          vm.currentItem = vm.tem;
          break;
      }
    }
  },
  mounted() {
    this.updateCurrentItem();
  }
};
</script>
<style lang="scss" scoped>
</style>
