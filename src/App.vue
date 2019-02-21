<template>
  <div id="app">
    <div class="h-100 app-body">
      <router-view></router-view>
      <div
        class="menu-mobile-icon h3 rounded-circle pa wfx-50 hfx-50 z-300 shadow text-light d-flex flex-column justify-content-center align-items-center cp hvr-buzz-out" data-toggle="tooltip" :data-original-title="!menuInfo.state ? 'Open Menu': 'Close Menu'" data-placement="bottom"
        :class="{'bg-dark': menuInfo.state, 'bg-success': !menuInfo.state}"
        @click="toggleMenu"
      >
        <i class="fas fa-bars"></i>
      </div>
    </div>

    <load-modal :id="modalID('load')"></load-modal>
    <confirm-delete :id="modalID('delete')"></confirm-delete>
    <view-note :id="modalID('viewnote')"></view-note>
  </div>
</template>

<script>
import LoadModal from "./components/modals/LoadNoteModal.vue";
import DeleteItemModal from "./components/modals/ConfirmDelete.vue";
import ViewNoteModal from './components/modals/NoteView.vue';

import { orientationEnums, breakpoints } from "./enums/Orientation.js";
import { mapGetters, mapMutations } from "vuex";
import ToasterMixin from "./mixins/toaster.js";
import HelperMixin from "./mixins/helpers.js";

const $ = require("jquery");

export default {
  mixins: [ToasterMixin],
  name: "app",
  components: {
    "load-modal": LoadModal,
    "confirm-delete": DeleteItemModal,
    "view-note": ViewNoteModal
  },
  computed: {
    ...mapGetters(["modalID", "orientationSet", "menuInfo"])
  },
  watch: {
    windowWidth(nv, ov) {
      console.log(nv);
    }
  },
  data() {
    return {
      appName: "mynotes",
      windowWidth: document.documentElement.clientWidth || window.innerWidth,
      menu: null
    };
  },
  methods: {
    ...mapMutations(["updateOrientation", "toggleMenuMutation"]),
    toggleMenu() {
      const vm = this;
      if (vm.menu === null) {
        vm.menu = true;
        vm.toggleMenuMutation(vm.menu);
        return;
      }

      vm.menu = !vm.menu;

      vm.toggleMenuMutation(vm.menu);
      return;
    },
    getOrientationEnum(currentWidth) {
      if (currentWidth < breakpoints.tablet) {
        return orientationEnums.mobile;
      }

      if (
        currentWidth >= breakpoints.tablet &&
        currentWidth < breakpoints.laptop
      ) {
        return orientationEnums.tablet;
      }

      if (
        currentWidth >= breakpoints.laptop &&
        currentWidth < breakpoints.desktop
      ) {
        return orientationEnums.laptop;
      }

      if (currentWidth >= breakpoints.desktop) {
        return orientationEnums.desktop;
      }
    },
    watchOrientation() {
      const vm = this;
      if (!vm.orientationSet)
        vm.updateOrientation(
          vm.getOrientationEnum(
            document.documentElement.clientWidth || window.innerWidth
          )
        );

      window.addEventListener("resize", function() {
        vm.windowWidth =
          document.documentElement.clientWidth || window.innerWidth;

        vm.updateOrientation(vm.getOrientationEnum(vm.windowWidth));
      });
    }
  },
  mounted() {
    this.initializeToaster();
    this.watchOrientation();
     $('[data-toggle="tooltip"]').tooltip()
  }
};
</script>

<style lang="scss">
// @import "./scss/custom-bootstrap.scss";
@import url("https://fonts.googleapis.com/css?family=Passion+One:400,700");
@import "./../node_modules/bootstrap/scss/bootstrap.scss";
@import "./../node_modules/hover.css/scss/hover.scss";
@import "./../node_modules/simplemde/dist/simplemde.min.css";
@import "./../node_modules/animate.css/animate.min.css";
@import "./../node_modules/toastr/toastr.scss";

#app {
  font-family: "Passion One", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

.menu-mobile-icon {
  bottom: 30px;
  left: 20px;
  transition: all .3s ease-in-out;
}

.pointer {
  cursor: pointer !important;
}

.app-body::-webkit-scrollbar {
  width: 0 !important;
}
.app-body {
  overflow: -moz-scrollbars-none;
}
.app-body {
  -ms-overflow-style: none;
}

.oy-s {
  overflow-y: scroll !important;
}

.ox-h {
  overflow-x: hidden;
}

.oy-s::-webkit-scrollbar {
  width: 0 !important;
}
.oy-s {
  overflow: -moz-scrollbars-none;
}
.oy-s {
  -ms-overflow-style: none;
}

.app-body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.pr {
  position: relative !important;
}

.cp {
  cursor: pointer;
}

.pa {
  position: absolute !important;
}

@for $i from 1 through 3 {
  .t-#{$i}#{0} {
    top: -#{$i}0px;
  }
}

@for $i from 0 through 1000 {
  .z-#{$i} {
    z-index: #{$i};
  }

  .l-#{$i}{
    left: #{$i};
  }
}

@for $i from 0 through 99 {
  // e.g width notes - 99&
  .wn-#{$i} {
    width: round(percentage($i/100));
  }

  // e.g max width percentage - 78%
  .mwp-#{$i} {
    max-width: round(percentage($i/100));
  }

  // e.g padding notes top
  .pnt-#{$i} {
    padding-top: #{$i}rem;
  }
}

@for $i from 50 to 401 {
  // fixed height
  .hfx-#{$i} {
    height: #{$i}px;
  }

  .wfx-#{$i} {
    width: #{$i}px;
  }

  // min-height
  .hm-#{$i}{
    min-height: #{$i}px;
  }
}

.vh-100 {
  height: 100vh;
}

.h-80 {
  height: 90% !important;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  // color: #42b983;
  color: #30a54a;
}
</style>
