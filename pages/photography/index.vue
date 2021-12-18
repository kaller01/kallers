<template>
  <div>
    <v-container fluid>
      <transition name="fade">
        <photo-grid
          :masonry="masonry[3]"
          v-show="loadingDone && $vuetify.breakpoint.xlOnly"
        ></photo-grid>
      </transition>
      <transition name="fade">
        <photo-grid
          :masonry="masonry[2]"
          v-show="loadingDone && $vuetify.breakpoint.lgOnly"
        ></photo-grid>
      </transition>
      <transition name="fade">
        <photo-grid
          :masonry="masonry[1]"
          v-show="loadingDone && $vuetify.breakpoint.mdOnly"
        ></photo-grid>
      </transition>
      <transition name="fade">
        <photo-grid
          :masonry="masonry[0]"
          v-show="loadingDone && $vuetify.breakpoint.smAndDown"
        ></photo-grid>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import VueMasonryWall from "vue-masonry-wall";
import MasonryWall from "@yeger/vue2-masonry-wall";

export default {
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    masonry() {
      return this.$store.state.masonry;
    },
  },
  components: { MasonryWall },
  methods: {
    test: function (name) {
      name = name.replace(".jpg", "");
      console.log(name);
      this.$router.push(this.localePath("/photography/" + name));
    },
  },
  data() {
    return {
      loadingDone: false,
    };
  },
  mounted() {
    this.loadingDone = true;
  },
};
</script>

<style scoped>
.photo {
  /* object-fit: cover; */
  /* width: 100%; */
  /* height: 100%; */
  /* line-height: 0; */
  /* display: block; */
}
</style>
