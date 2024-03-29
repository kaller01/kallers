<template>
  <div>
    <v-container fill-height fluid pa-0 mb-8>
      <v-carousel :height="windowHeight - 64" cycle :show-arrows="false" hide-delimiter-background
        delimiter-icon="mdi-minus" v-model="model">
        <v-carousel-item v-for="photo in horizontalPhotos" v-bind:key="photo._id">
          <v-img :src="photo.paths.h1080" :lazy-src="photo.paths.preview" :height="windowHeight - 64">
            <v-overlay value="true" absolute> </v-overlay>
          </v-img>
        </v-carousel-item>
      </v-carousel>

      <v-container fill-height fluid class="title">
        <v-row align="center" justify="center">
          <v-col class="d-flex flex-column">
            <div class="text-lg-h1 text-h2 text-center">Martin Kaller</div>
            <div class="text-lg-h2 text-h3 font-weight-thin text-center">
              LANDSCAPE PHOTOGRAPHY
            </div>
            <socials class="mt-4"></socials>
            <event></event>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4" v-for="post in posts.slice(0, 3)">
          <v-card class="pa-5 mb-3" :to="'/newsletter/' + post.link">
            <div class="post-preview px-3" style="height: 40vh;">
              <post :post="post" />
            </div>
            <nuxt-link :to="'/newsletter/' + post.link">{{ post.link }}</nuxt-link>
          </v-card>
        </v-col>

      </v-row>
    </v-container>

    <masonry-wall :items="photos" :column-width="500" :gap="8">
      <template #default="{ item }">
        <v-img :src="item.paths.w1080" :lazy-src="item.paths.preview" :aspect-ratio="item.width / item.height" />
      </template>
    </masonry-wall>

    <!-- <v-tooltip right color="transparent">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-4 white--text" target="_blank" icon v-on="on">
          <v-icon size="24px">mdi-instagram</v-icon>
        </v-btn>
      </template>
      <v-card>
        hello world!
        <v-img src="https://photos.kallers.se/400w/_MK20430.jpg"> </v-img>
      </v-card>
    </v-tooltip> -->
  </div>
</template>

<script>
import MasonryWall from "@yeger/vue2-masonry-wall";
import Socials from "@/components/Socials.vue";

export default {
  components: { MasonryWall, Socials },
  computed: {
    photos() {
      return this.$store.state.portfolio;
    },
    posts() {
      return this.$store.state.posts;
    },
    horizontalPhotos() {
      return this.photos.filter(
        (photo) =>
          (photo.width > photo.height && this.$vuetify.breakpoint.lgAndUp) ||
          (photo.width < photo.height && this.$vuetify.breakpoint.mdAndDown)
      );
    },
  },
  data() {
    return {
      windowHeight: 1000,
      model: 0,
    };
  },
  mounted() {
    this.$vuetify.goTo(0);
    this.windowHeight = window.innerHeight;
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth > window.innerHeight) {
        this.windowHeight = window.innerHeight;
      }
    },
    keyhandler(e) {
      switch (e.key) {
        case "ArrowLeft":
          this.model--;
          break;
        case "ArrowRight":
          this.model++;
          break;
      }
    },
  },
  beforeMount() {
    window.addEventListener("keydown", this.keyhandler);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyhandler);
  },
  head() {
    return {
      title: "Portfolio",
      meta: [
        {
          hid: "og:title",
          name: "og:title",
          content: "Portfolio",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://kallers.se/photos/assets/portfolio.jpeg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.title {
  position: absolute;
}

.post-preview {
  overflow: hidden;
  --mask: linear-gradient(to bottom,
      rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 40%,
      rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0) 100% 50% / 100% 100% repeat-x;

  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>