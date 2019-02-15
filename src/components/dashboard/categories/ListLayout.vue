<template>
  <div class="col-12 p-4">
    <div class="accordion animated fadeIn" id="accordionExample" v-if="this.total">
      <div class="card border-0" v-for="(n,i) in latestcategories" :key="i">
        <div class="card-header border-0 bg-white" id="headingOne">
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
              <template v-if="n.notes.length > 0">
                <li v-for="(note, i) in n.notes" :key="i">
                <router-link :to="`/dashboard/${getNote(note.id).note.type}/${note.id}`">
                  <i class="fas fa-file-alt"></i>
                </router-link>
                <p>{{getNote(note.id).note.title}}</p>
                <hr>
              </li>
              </template>
              <template v-else>
                <li class="p-3 bg-light w-100">
                  <p class="h3"><i class="fas fa-plus-circle" :style="{color: '#9b9b9b'}"></i></p>
                  <p class="small">Add a note to <b :style="{color: n.colour}">"{{n.title}}"</b></p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- end of v-for -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
	props:['latestcategories', 'total'],
	data(){
		return{

		}
	},
	computed:{
		...mapGetters(['getNote'])
	}
}
</script>

