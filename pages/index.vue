<template>
  <div>
    <v-container fill-height fluid pa-0>
      <v-carousel
        :height="$vuetify.breakpoint.lgAndUp ? 800 : 600"
        cycle
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        vertical
      >
        <v-carousel-item
          v-for="photo in horizontalPhotos"
          v-bind:key="photo._id"
        >
          <v-parallax :src="photo.paths.h1080" dark height="800">
            <v-overlay value="true" absolute> </v-overlay>
          </v-parallax>
        </v-carousel-item>
      </v-carousel>

      <v-container fill-height fluid class="title">
        <v-row align="center" justify="center">
          <v-col class="d-flex flex-column">
            <div class="text-lg-h1 text-h2 text-center">Martin Kaller's</div>
            <div class="text-lg-h2 text-h3 font-weight-thin text-center">
              LANDSCAPE PHOTOGRAPHY
            </div>
            <socials class="mt-4"></socials>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <masonry-wall :items="photos" :ssr-columns="4" :column-width="500" :gap="8">
      <template #default="{ item }">
        <v-img
          :src="item.paths.w1080"
          :lazy-src="item.paths.preview"
          :aspect-ratio="item.width / item.height"
        />
      </template>
    </masonry-wall>
  </div>
</template>

<script>
import MasonryWall from "@yeger/vue2-masonry-wall";
import Socials from "@/components/Socials.vue";

export default {
  components: { MasonryWall, Socials },
  computed: {
    photos() {
      console.log(this.$vuetify.breakpoint.mdAndUp);
      return this.$store.state.portfolio;
    },
    horizontalPhotos() {
      return this.photos.filter(
        (photo) =>
          (photo.width > photo.height && this.$vuetify.breakpoint.lgAndUp) ||
          (photo.width < photo.height && this.$vuetify.breakpoint.mdAndDown)
      );
    },
  },
};
</script>

<style scoped>
.title {
  position: absolute;
}
</style>
