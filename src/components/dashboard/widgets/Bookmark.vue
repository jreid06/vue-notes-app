<template>
  <div v-if="itemRetrieved" @click="toggleBookmarked">
    <div class="bookmark cp" v-if="requiresContainer">
      <i :class="{'far fa-star' : !currentItem.bookmarked, 'fas fa-star' : currentItem.bookmarked}"></i>
    </div>
    <i
      class="cp"
      :class="{'far fa-star' : !currentItem.bookmarked, 'fas fa-star' : currentItem.bookmarked}"
      v-else
    ></i>
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
    item: {
      required: true
    },
    itemType: {
      type: String,
      required: true
    },
    itemId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      itemRetrieved: false,
      currentItem: ""
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
      "updateBookmarkedCategories"
    ]),
    toggleBookmarked() {
      const vm = this;
      let item = this.currentItem;

      if (item.hasOwnProperty("bookmarked")) {
        if (item.bookmarked) {
          item.bookmarked = false;
        } else {
          item.bookmarked = true;
        }
      } else {
        // create the key as it doesnt exist (old category)
        item.bookmarked = true;
      }

      switch (vm.itemType) {
        case "categories":
          vm.updateEditedCategory(item);
          vm.updateBookmarkedCategories({
            bookmarked: item.bookmarked,
            id: item.key
          });
          break;
        case "note":
          vm.updateEditedNote(item);
          vm.updateBookmarkedNotes({
            bookmarked: item.bookmarked,
            id: item.key
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
