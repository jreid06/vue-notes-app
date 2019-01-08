<template>
	<div>
		<div class="row pt-0 bg-light">
			<div class="col-12 p-4 text-left">
        		<h3>
          		<span class="text-success text-capitalize">{{category.category}}</span>
        		</h3>
        		<p class="small">{{category.description}}</p>
			</div>
      	</div>
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
  beforeRouteEnter(to, from, next){
	  next(vm=>{
		   vm.getSelectedCategory();
	  })
  },
  methods: {
    getSelectedCategory() {
		let catKey = this.$route.params.catid;
		
		this.category = this.getCategory(catKey).cat;		
	}
  },
  mounted(){
	  console.log(this.$route.params);
	 
  }
};
</script>
<style lang="scss" scoped>
</style>
