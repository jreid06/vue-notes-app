<template>
  <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
    <h2 class="display-4">{{appName}}</h2>
    <div class="openApp">
		<i class="far fa-circle"></i>
    </div>
	<div>
		<br>
		<router-link to="/dashboard"><h3 class="lead">enter</h3></router-link>
	</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Note from './../classes/note.js'
import Helpers from './../classes/helper.js'

export default {
  computed: {
    ...mapGetters(["appName"])
  },
  mounted() {	
	
  }
};
</script>
<style lang="scss" scoped>
.openApp {
  animation: updown 0.6s infinite;
  position: relative;
}

@keyframes updown {
  0% {
    top: 0;
  }
  
  50% {
    top: 20px;
  }
  
  100% {
    top: 0;
  }
}

@-webkit-keyframes updown {
  from {
    top: 0px;
  }
  to {
    top: 30px;
  }
}
</style>

