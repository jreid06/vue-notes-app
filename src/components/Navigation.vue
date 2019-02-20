<template>
  <div
    class="p-md-2 vh-100 bg-white d-flex justify-content-center align-items-top z-300 oy-s ox-h"
    :class="{'nav-box-hidden': !menuInfo.state , 
  'nav-box-mobile': menuInfo.state && getOrientation == OrientationEnums.mobile, 
  'nav-box-tablet': menuInfo.state && getOrientation == OrientationEnums.tablet || getOrientation == OrientationEnums.mobile, 
  'nav-box-laptop': menuInfo.state && getOrientation == OrientationEnums.laptop,
   'nav-box-desktop': menuInfo.state && getOrientation == OrientationEnums.desktop}"
  >
    <div class="nav-links d-flex flex-column flex-wrap">
      <div class="nav-link-item py-4 h5" v-for="(link, i) in links" :key="i">
        <router-link :to="link.path">
          <i :class="link.icon"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { orientationEnums } from "./../enums/Orientation.js";
export default {
  computed: {
    ...mapGetters(["getOrientation", "menuInfo"])
  },
  data() {
    return {
      OrientationEnums: orientationEnums,
      links: [
        {
          icon: "fas fa-circle",
          text: "home",
          path: "/"
        },
        {
          icon: "fas fa-home",
          text: "home",
          path: "/dashboard"
        },
        {
          icon: "far fa-folder",
          text: "categories",
          path: "/dashboard/categories"
        },
        {
          icon: "far fa-file-alt",
          text: "notes",
          path: "/dashboard/notes"
        },
        {
          icon: "fas fa-cog",
          text: "settings",
          path: "/dashboard/settings"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
#nav-box::-webkit-scrollbar {
  width: 0 !important;
}
#nav-box {
  overflow: -moz-scrollbars-none;
}
#nav-box {
  -ms-overflow-style: none;
}

%nav-box {
  overflow-y: scroll;
  overflow-x: hidden;
  position: fixed;
  transition: all 0.4s ease-in;
  opacity: 1;
  // height: 100%;
}

.nav-closed {
  @extend %nav-box;
  width: 0%;
}

.nav-open {
  @extend %nav-box;
  width: 10%;
}

.nav-box-hidden {
  @extend %nav-box;
  width: 0%;
  opacity: 0 !important;
}

.nav-box-laptop {
  @extend %nav-box;
  width: 10%;
}

.nav-box-desktop {
  @extend %nav-box;
  width: 7%;
}

.nav-box-tablet {
  @extend %nav-box;
  @media screen and (min-width: 768px) {
    width: 10%;
  }
}

.nav-box-mobile {
  @extend %nav-box;
  @media screen and (max-width: 768px) {
    width: 20%;
  }
}
</style>


