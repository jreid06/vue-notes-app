<template>
  <div id="app">
    <div class="h-100 app-body">
      <router-view></router-view>
    </div>

    <load-modal :id="modalID('load')"></load-modal>
    <confirm-delete :id="modalID('delete')"></confirm-delete>
  </div>
</template>

<script>
import NoteModal from "./components/modals/CreateNoteModal.vue";
import CatModal from "./components/modals/CreateCategoryModal.vue";
import LoadModal from './components/modals/LoadNoteModal.vue';
import DeleteItemModal from './components/modals/ConfirmDelete';

import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    "note-modal": NoteModal,
    "category-modal": CatModal,
    "load-modal": LoadModal,
    "confirm-delete": DeleteItemModal
  },
  computed: {
    ...mapGetters(["modalID"])
  },
  data() {
    return {
      appName: "mynotes"
    };
  },
  methods: {
   
  },
  mounted(){
  
  }
};
</script>

<style lang="scss">
// @import "./scss/custom-bootstrap.scss";
@import url("https://fonts.googleapis.com/css?family=Passion+One:400,700");
@import "./../node_modules/bootstrap/scss/bootstrap.scss";
@import "./../node_modules/hover.css/scss/hover.scss";
@import './../node_modules/simplemde/dist/simplemde.min.css';
@import './../node_modules/animate.css/animate.min.css';

#app {
  font-family: "Passion One", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

.pointer{
  cursor: pointer !important;
}

.app-body::-webkit-scrollbar { width: 0 !important }
.app-body{ overflow: -moz-scrollbars-none; }
.app-body{ -ms-overflow-style: none; }

.oy-s{
  overflow-y: scroll !important;
}

.ox-h{
  overflow-x: hidden;
}

.oy-s::-webkit-scrollbar { width: 0 !important }
.oy-s{ overflow: -moz-scrollbars-none; }
.oy-s{ -ms-overflow-style: none; }

.app-body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.pr {
  position: relative !important;
}

.pa{
  position: absolute !important;
}

@for $i from 1 through 3 {
  .t-#{$i}#{0} {
    top: -#{$i}0px;
  }
}

@for $i from 1 through 10 {
  .z-#{$i} {
    z-index: #{$i};
  }
}

@for $i from 0 through 99 {
  // e.g width notes - 99&
  .wn-#{$i}{
    width: round(percentage($i/100));
  }

  // e.g max width percentage - 78%
  .mwp-#{$i}{
    max-width: round(percentage($i/100));
  }

  // e.g padding notes top 
  .pnt-#{$i} {
    padding-top: #{$i}rem;
  }
}

.vh-100 {
  height: 100vh;
}

.h-80{
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
