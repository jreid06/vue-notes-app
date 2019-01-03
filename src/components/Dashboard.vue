<template>
  <div class="">
    <navigation></navigation>
    <div class="dashboard-view vh-100 px-3 pb-3">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navigation from "./Navigation.vue";

export default {
  components: {
    navigation: Navigation
  },
  data(){
	  return{

	  }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-view {
	// background: #f2f2f2;
	height: 100%;
	transition: all .4s ease-in;
	width: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	// float: right;
	// margin-left: 220px;
	@media screen and (min-width: 768px){
		width: 90%;
		float: right;
	}

	@media screen and (min-width: 1200px){
		width: 93%;
		float: right;
	}
}
</style>
