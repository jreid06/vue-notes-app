<template>
	<div>
		<p v-for="n in 3" :key="n" class="pb-2"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse deleniti blanditiis reprehenderit, laudantium sapiente amet maxime sunt nam placeat cupiditate expedita consectetur quis officia dicta vero earum laboriosam dolor perferendis?</p>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
		category: ''
	};
  },
  computed: {
    ...mapGetters(["selectedCategory", "getCategory"])
  },
//   beforeRouteEnter(to, from, next){
// 	  console.log('BEFORE ROUTE ENTER');
	  
// 	  next(vm=>{
//   console.log('BEFORE ROUTE ENTER NEXT');
// 		   vm.getSelectedCategory();
// 	  })
//   },
  methods: {
    getSelectedCategory() {
		let catKey = this.$route.params.catid;
		
		this.category = this.getCategory(catKey);		
	}
  },
  mounted(){
	  console.log(this.$route.params);
	 
  }
};
</script>
<style lang="scss" scoped>
</style>
