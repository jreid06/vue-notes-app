<template>
  <li class="p-2 text-center flex-fill border-right border-light d-flex animated fadeIn m-1 w-100">
    <div class="p-2">
      <h2 :style="{color: n.colour}">
        <i :class="n.icon"></i>
      </h2>
    </div>
    <div class="p-2 text-left wn-35">
      <span class="small">Title</span>
      <h6>{{n.title |truncate(17) | firstWordCapital}}</h6>
    </div>
    <div
      class="p-2 pt-4 flex-fill d-flex flex-row justify-content-around align-items-center"
      :style="{backgroundColor: n.colour, color: '#f2f2f2'}"
    >
      <span class="h3 p-1">
        <i class="far fa-file-alt"></i>
      </span>
      <h3 class="p-1">{{n.notes.length}}</h3>
    </div>
    <!--  -->
    <div
      class="p-2 pt-3 flex-fill d-flex flex-row flex-no-wrap justify-content-around text-light align-items-center"
      :style="{backgroundColor: n.colour}"
    >
      <div
        class="w-100 flex-fill"
        :data-id="n.key"
        :data-item="JSON.stringify(n)"
        :data-type="load"
        data-action="delete"
        @click="triggerModal"
      >
        <i class="far fa-trash-alt hvr-grow" :data-id="n.key"></i>
      </div>
      <div class="w-100 flex-fill">
        <router-link :to="'/dashboard/'+ load +'/'+ n.key" class="text-light">
          <i class="far fa-edit"></i>
        </router-link>
      </div>
      <div class="w-100 flex-fill">
        <bookmark-item :requires-container="false" :is-bookmarked="n.bookmarked" :item-type="n.type" :ikey="n.key"></bookmark-item>
      </div>
    </div>
  </li>
</template>
<script>
import HelperMixin from "./../../../mixins/helpers.js";
import BookmarkStar from "./Bookmark.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    "bookmark-item": BookmarkStar
  },
  mixins: [HelperMixin],
  props: {
    n: {
      required: true
    },
    load: {
      required: true
    }
  },
  computed:{
	  ...mapGetters(["getCategory"])
  },
  data() {
    return {};
  }
};
</script>

