<template>
  <div v-if="itemRetrieved">
    <div class="bookmark" v-if="requiresContainer">
      <i class="fas fa-star"></i>
    </div>
    <i class="fas fa-star" v-else></i>
    <!-- <i class="far fa-star"></i> -->
    <!-- unbookmarked star-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    requiresContainer: {
      type: Boolean,
      required: true
    },
    itemType: {
      type: String,
      required: true
    },
    itemID: {
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
  methods: {
    updateCurrentItem() {
      const vm = this;
      let itemType = this.itemType;

      switch (itemType) {
        case "categories":
          vm.currentItem = vm.getCategory(vm.itemID);
          break;
        case "note":
          vm.currentItem = vm.getNote(vm.itemID);
          break;
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
</style>
