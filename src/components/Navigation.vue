<template>
  <div class="p-md-2 nav-box vh-100 bg-light d-flex justify-content-center align-items-center shadow-sm">
    <div class="nav-links d-flex flex-column flex-wrap">
      <div class="nav-link-item py-4" v-for="(link, i) in links" :key="i">
        <router-link :to="link.path">
          <i :class="link.icon"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
         {
          icon: "fas fa-circle",
          text: "home",
          path: "/"
        },
        {
          icon: "fas fa-home",
          text: "home",
          path: "/dashboard"
        },
        {
          icon: "far fa-folder",
          text: "categories",
          path: "/dashboard/categories"
        },
        {
          icon: "far fa-file-alt",
          text: "notes",
          path: "/dashboard/notes"
        },
        {
          icon: "fas fa-cog",
          text: "settings",
          path: "/dashboard/settings"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.nav-box {
  // position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 0%;
  opacity: 0;
  position: fixed;
  transition: all 0.4s ease-in;
  // height: 100%;
  // background-color: gray;

  @media screen and (min-width: 768px) {
    width: 10%;
    opacity: 1;
  }

  @media screen and (min-width: 1200px) {
    width: 7%;
  }
}
</style>
