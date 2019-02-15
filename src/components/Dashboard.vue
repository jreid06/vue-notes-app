<template>
  <div class>
    <navigation></navigation>
    <div class="dashboard-view vh-100 px-3 pb-3" :class="{'nav-open' : menuInfo.state}">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navigation from "./Navigation.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    navigation: Navigation
  },
  computed: {
    ...mapGetters(["menuInfo"])
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.dashboard-view {
  // background: #f2f2f2;
  height: 100%;
  transition: all 0.4s ease-in-out;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  // float: right;
  // margin-left: 220px;
  // @media screen and (min-width: 768px){
  // 	width: 90%;
  // 	float: right;
  // }

  @media screen and (min-width: 1200px) {
    margin: 0 auto;
    width: 93%;
    transition: all 0.4s ease-in-out;
    width: 100%;
  }

  &.nav-open {
    transition: all 0.4s ease-in-out;
    width: 100%;
    width: 90%;
    float: right;
    @media screen and (min-width: 1200px) {
      width: 93%;
    }
  }
}
</style>
