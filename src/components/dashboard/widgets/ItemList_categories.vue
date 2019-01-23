<template>
  <div class="w-100 d-flex flex-row flex-wrap">
    <div
      class="p-2 flex-fill text-center w-100 h-25 border d-flex animated fadeIn"
      v-for="(n, i) in categories"
      :key="i"
    >
      <div class="w-100 p-2 border">
        <div class="w-100 d-flex">
          <div class="list-section p-3 flex-fill flex-fill">
            <h2 :style="{color: n.colour}">
              <i :class="n.icon"></i>
            </h2>
          </div>
          <div class="list-section p-3 flex-fill flex-fill">
            <span class="small">Title</span>
            <h5>{{n.title |firstWordCapital}}</h5>
          </div>
          <div class="list-section p-3 flex-fill flex-fill">
			   <span class="small">Created</span>
			    <h5>
					<span v-html="formatDate(n.createdAt).ukDate"></span>
				</h5>
		  </div>
        </div>
        <div
          class="list-section controls-section flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-light pt-3"
        >
			
          <ul class="list-inline controls">
            <li
              class="list-inline-item text-danger hvr-grow"
              :data-id="n.key"
              :data-item="JSON.stringify(n)"
              :data-type="load"
              data-action="delete"
              @click="triggerModal"
            >
              <i class="far fa-trash-alt" :data-id="n.key"></i>
            </li>
            <li class="list-inline-item text-info hvr-grow">
              <router-link :to="'/dashboard/'+ load +'/'+ n.key">
                <i class="far fa-edit"></i>
              </router-link>
            </li>
            <li class="list-inline-item hvr-grow">
              <i class="fas fa-ellipsis-h"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers";

export default {
  mixins: [HelperMixin],
  props: {
    categories: {
      type: Array
    },
    load: {
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.controls {
  li {
    // border: 1px solid blue;
  }
}

.list-section {
}
</style>
