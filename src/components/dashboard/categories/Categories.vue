<template>
  <div>
    <div class="row pt-0 bg-light">
      <div class="col-12 p-4 text-left">
        <h3>
          All My
          <span class="text-success">Categories</span>
        </h3>
      </div>
      <div class="col-12 p-4">
        <div class="accordion bg-light" id="accordionExample" v-if="this.categories.length">
          <div class="card border-0" v-for="(n,i) in latestCategories"
            :key="i">
            <div class="card-header border-0 bg-light" id="headingOne">
              <h2 class="mb-0">
                <div
                  class="w-100 all-cat-header"
                  data-toggle="collapse"
                  :data-target="`#collapse${i}`"
                  aria-expanded="true"
                  :aria-controls="`#collapse${i}`"
                >{{n.category}}</div>
              </h2>
            </div>

            <div
              :id="`collapse${i}`"
              class="collapse"
			  :class="n < 1 ? 'show' : ''"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div
                class="card-body"
              >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
            </div>
          </div>
        </div>

        <!-- <ul class="list-group list-group-flush" v-if="this.categories.length > 0">
          <li
            class="itemlist-li list-group-item d-flex flex-row flex-no-wrap flex-sm-wrap flex-md-no-wrap text-capitalize"
            v-for="(n,i) in latestCategories"
            :key="i"
          >
            <div class="p-2 flex-fill h4" :style="{color: n.colour}">
              <i :class="n.icon"></i>
            </div>

            <div class="p-2 flex-fill">
              <p>{{n.category}}</p>
            </div>
            <div class="p-2 flex-fill">
              <p>
                {{helpers.formatDate(n.createdAt).day}}
                {{helpers.formatDate(n.createdAt).month}}
                &nbsp;&bull;&nbsp;
                {{helpers.formatDate(n.createdAt).hours}}:{{helpers.formatDate(n.createdAt).minutes}}
                <span
                  class="small text-lowercase"
                >{{helpers.formatDate(n.createdAt).prefix}}</span>
                &nbsp;&bull;&nbsp;
                {{helpers.formatDate(n.createdAt).year}}
              </p>
            </div>
            <div class="p-2 flex-fill bg-light">
              <ul class="list-inline">
                <li
                  class="list-inline-item text-danger hvr-grow"
                  :data-id="n.key"
                  @click="quickDeleteItem"
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
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers.js";

export default {
  mixins: [HelperMixin],
  data() {
    return {
      categories: []
    };
  },
  computed: {
    ...mapGetters(["allCategories"]),
    latestCategories() {
      return this.categories.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.categories = vm.allCategories;
    });
  }
};
</script>
<style lang="scss" scoped>
.all-cat-header{
	cursor: pointer;
	// background-color: 
}
</style>
