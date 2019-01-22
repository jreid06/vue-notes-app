<template>
  <div class="w-100 d-flex flex-row flex-wrap">
     <div class="p-2 flex-fill text-center w-100 border" v-for="(n, i) in notes" :key="i">
		<h3 :style="{color: getCategory(n.categoryID).cat.colour}"> <i :class="n.icon"></i></h3>
		<h5>{{n.title |firstWordCapital}}</h5>
	</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    notes: {
      type: Array
    }
  },
  computed: {
	  ...mapGetters(['getCategory'])
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>
