<template>
  <div class="bg-white shadow-sm">
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex flex-row flex-no-wrap text-capitalize"
        v-for="(n,i) in lastestData"
        :key="i"
      >
        <div class="p-2 h4" :style="{color: n.colour}">
          <i class="fas fa-folder"></i>
        </div>
        <div class="p-2">
          <p>{{n.category}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    load: {
      type: String
    },
    limit: {
      type: Number,
      required: true
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
      listData: this.$store.getters.allCategories
    };
  },
  mounted(){
			  
  },
  destroyed(){
	  console.log('DESTROYED ITEM LIST');
  }
};
</script>
<style lang="scss">
</style>
