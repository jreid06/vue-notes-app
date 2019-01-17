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

.app-body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.pr {
  position: relative !important;
}

@for $i from 1 through 3 {
  .t-#{$i}#{0} {
    top: -#{$i}0px;
  }
}

@for $i from 1 through 3 {
  .z-#{$i} {
    z-index: #{$i};
  }
}

.vh-100 {
  height: 100vh;
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
