<template>
  <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
    <h2 class="display-4">{{appName}}</h2>
    <div class="openApp">
      <i class="far fa-circle"></i>
    </div>
    <div>
      <br>
      <router-link to="/dashboard">
        <h3 class="lead">enter</h3>
      </router-link>
    </div>
    <div
      class="reset-app-data h3 rounded-circle pa wfx-50 hfx-50 z-300 shadow text-light d-flex flex-column justify-content-center align-items-center cp hvr-buzz-out bg-danger" data-toggle="tooltip" data-original-title="Reset apps data. Do at your own risk" data-placement="bottom"
      data-action="reset"
      @click="triggerModal"
    >
      <i class="fas fa-trash-alt"></i>
      <!-- <i class="far fa-circle"></i> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import HelperMixin from "./../mixins/helpers.js";

const $ = require('jquery');
export default {
  mixins: [HelperMixin],
  computed: {
    ...mapGetters(["appName"])
  },
  methods: {},
  mounted() {
     $('[data-toggle="tooltip"]').tooltip()
  }
};
</script>
<style lang="scss" scoped>
.openApp {
  animation: updown 0.6s infinite;
  position: relative;
}

.reset-app-data {
  top: 30px;
  right: 20px;
  transition: all 0.3s ease-in-out;
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

