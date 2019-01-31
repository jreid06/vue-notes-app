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
          <div class="card border-0" v-for="(n,i) in latestCategories" :key="i">
            <div class="card-header border-0 bg-light" id="headingOne">
              <h2 class="mb-0">
                <div
                  class="w-100 all-cat-header text-left d-flex flex-no-wrap"
                  data-toggle="collapse"
                  :data-target="`#collapse${i}`"
                  aria-expanded="true"
                  :aria-controls="`#collapse${i}`"
                >
                <div class="py-2 px-4 flex-shrink text-right">
                    <router-link :to="$route.path+'/'+n.key" :style="{color: n.colour}">
                      <i class="fas fa-folder"></i>
                    </router-link>
                  </div>
                  <div class="p-2 flex-fill text-capitalize">{{n.title}}</div>
                  <div class="p-2 flex-shrink text-right">
                    <i class="fas fa-chevron-down"></i>
                  </div>
                </div>
              </h2>
            </div>

            <div
              :id="`collapse${i}`"
              class="collapse"
              :class="n < 1 ? 'show' : ''"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <ul>
                  <li v-for="(note, i) in n.notes" :key="i">
                    {{getNote(note.id).note.title}}
                    <router-link :to="`/dashboard/${getNote(note.id).note.type}/${note.id}`">
                    <i class="fas fa-file-alt    "></i>
                    </router-link>
                    <hr>
                  </li>
                </ul>
              </div>
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
        </ul>-->
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
    ...mapGetters(["allCategories", "getNote"]),
    latestCategories() {
      return this.allCategories.sort(function(a, b) {
        return b.createdAt - a.createdAt;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.categories = vm.allCategories;
    });
  },
  mounted(){
    const vm = this;
     vm.categories = vm.allCategories;
  }
};
</script>
<style lang="scss" scoped>
.all-cat-header {
  cursor: pointer;
  // background-color:
}
</style>
