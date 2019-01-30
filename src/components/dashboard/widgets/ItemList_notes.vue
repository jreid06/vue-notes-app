<template>
  <div class="w-100 pr cat-list-div pr">
    <div class="toggle-controls pa w-100 z-10 shadow-sm">
      <div class="d-flex flex-row flex-wrap">
        <div class="header p-3 bg-dark text-light text-center w-100">Notes</div>
        <div
          class="control all-categories p-2 d-flex border flex-no-wrap justify-content-between flex-fill align-items-center bg-white"
        >
          <div class="p-2 h3">
            <i class="fas fa-folder"></i>
          </div>
          <div class="p-2">
            <p>All</p>
          </div>
          <div class="p-2 h4">{{allNotes.length}}</div>
        </div>
        <div
          class="control categories-bookmarked p-2 border d-flex flex-no-wrap justify-content-between flex-fill align-items-center bg-white"
        >
          <div class="p-2 h3">
            <i class="fas fa-star bookmark"></i>
          </div>
          <div class="p-2">
            <p>Bookmarked</p>
          </div>
          <div class="p-2 h4">{{bookmarkedNotes.amount}}</div>
        </div>
      </div>
    </div>
	 <div class="w-100 d-flex oy-s pnt-9 cat-list-div">
     <div class="p-2 flex-fill text-center w-100 border animated fadeIn" v-for="(n, i) in notes" :key="i">
		<router-link :to="'/dashboard/notes/'+n.key">
			<h3 :style="{color: getCategory(n.categoryID).cat.colour}"> <i :class="n.icon"></i></h3>
		</router-link>
		<h5>{{n.title |firstWordCapital}}</h5>
	</div>
  </div>
  </div>
  
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers";

export default {
  props: {
    notes: {
      type: Array
	},
	limit: {
		required: true 
	}
  },
  computed: {
	  ...mapGetters(['getCategory', "allNotes", "bookmarkedNotes"])
  },
  mixins: [HelperMixin],
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.note-list-div {
  min-height: 200px;
  max-height: 450px;
  overflow: hidden;
}

.bookmark {
  color: gold;
}

.control {
  max-width: 50%;
  li {
    // border: 1px solid blue;
  }
}
</style>
