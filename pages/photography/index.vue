<template>
  <div>
    <v-container fluid class="pt-0 mt-0">
      <!-- This avoids ugly loading, pushes down content so it can't be seen loading, but it's there for SEO reasons.  -->
      <div class="spacer" v-show="!loadingDone"></div>
      <transition name="fade">
        <photo-grid
          :masonry="masonry[3]"
          v-show="$vuetify.breakpoint.xlOnly"
        ></photo-grid>
      </transition>
      <transition name="fade">
        <photo-grid
          :masonry="masonry[2]"
          v-show="$vuetify.breakpoint.lgOnly"
        ></photo-grid>
      </transition>
      <transition name="fade">
        <photo-grid
          :masonry="masonry[1]"
          v-show="$vuetify.breakpoint.mdAndDown"
        ></photo-grid>
      </transition>
      <!-- <transition name="fade">
        <photo-grid
          :masonry="masonry[0]"
          v-show="$vuetify.breakpoint.smAndDown"
        ></photo-grid>
      </transition> -->
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
  head() {
    return {
      title: "Photography Gallery",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "An photography gallery with the latest of Martin Kaller's landscape photography",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "All of Kaller's landscape photography",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://kallers.se/photos/assets/photos.jpeg",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "An photography gallery with the latest of Martin Kaller's landscape photography",
        },
      ],
    };
  },
};
</script>

<style scoped>
.spacer {
  height: 100vh;
}
</style>
