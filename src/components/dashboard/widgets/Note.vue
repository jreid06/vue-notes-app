<template>
  <div class="card mb-4 shadow-sm animated fadeIn" style>
    <div
      class="card-img-top hfx-125"
      :style="{background: `url(${selectedImage.url})`, backgroundPosition: 'center', backgroundSize: 'cover'}"
    >
      <div class="s h-100" :style="{background: categoryBelongsTo.colour + '7F'}"></div>
    </div>
    <div class="card-body">
      <div class="row">
        <!--  -->
        <div class="col-12 col-sm-6">
          <h5 class="card-title">{{note.title | firstWordCapital}}</h5>
          <h6 class="card-subtitle font-italic small mb-2">{{formatDate(note.createdAt).ukDate_s}}</h6>
          <router-link :to="`/dashboard/categories/${note.categoryID}`">
            <h6
              class="font-weight-bold"
              :style="{color: categoryBelongsTo.colour}"
            >{{categoryBelongsTo.title | firstWordCapital}}</h6>
          </router-link>
        </div>
        <div class="col-12 col-sm-6 text-center pt-2 h2" :style="{color: categoryBelongsTo.colour}">
          <i :class="note.icon"></i>
        </div>
        <!--  -->
        <!--  -->
        <div class="col-12 pt-3 bg-light">
          <h6
            class="card-subtitle mb-2 text-muted"
          >{{note.brief ? note.brief : '.......' | truncate(25)}}</h6>
        </div>
        <!--  -->
        <!--  -->
        <!-- <div class="col-12">
          <p class="card-text">{{note.noteMarkdown}}</p>
        </div>-->
        <!--  -->
        <div class="col-12 pt-3 cp">
          <div class="d-flex flex-row flex-no-wrap delete-controls justify-content-center">
            <div class="bg-success p-3 rounded-left">
              <router-link
                :to="'/dashboard/note/'+note.key"
                class="card-link text-capitalize text-light"
              >
                <i class="far fa-edit hvr-grow"></i>
              </router-link>
            </div>
            <div
              class="bg-light p-3"
              :style="{color: categoryBelongsTo.colour}"
			  :data-item="JSON.stringify(note)"
              data-action="viewnote"
              @click="triggerModal"
            >
              <i class="far fa-eye"></i>
            </div>
            <div
              class="bg-danger text-light p-3 rounded-right"
              :data-id="note.key"
              :data-item="JSON.stringify(note)"
              data-action="delete"
              @click="triggerModal"
            >
              <i class="far fa-trash-alt hvr-grow"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HelperMixin from "./../../../mixins/helpers.js";

export default {
  mixins: [HelperMixin],
  props: {
    note: {
      type: Object,
      required: true
    },
    categoryBelongsTo: {
      type: Object,
      required: true
    },
    c: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      selectedImage: {},
      noteImages: [
        {
          url: "src/assets/D_34-bw.jpeg",
          alt: ""
        },
        {
          url: "src/assets/D_30-01-bw.jpeg",
          alt: ""
        }
      ]
    };
  },
  computed: {
    randomNumber() {
      return Math.round(Math.random() * (this.noteImages.length == 1 ? 0 : 1));
    }
  },
  methods: {
    randomImage() {
      let randomInt = this.randomNumber;

      return this.noteImages[randomInt];
    }
  },
  beforeMount() {
    this.selectedImage = this.randomImage();
  }
};
</script>
<style lang="scss" scoped>
.controls {
  bottom: 0;
  right: 0;
}
</style>

