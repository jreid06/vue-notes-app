<template>
  <div class="w-100 d-flex flex-row flex-wrap">
    <div class="p-2 flex-fill text-center w-100 h-25 border" v-for="(n, i) in categories" :key="i">
		<h3 :style="{color: n.colour}"> <i :class="n.icon"></i></h3>
		<h5>{{n.title |firstWordCapital}}</h5>
	</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    categories: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>
