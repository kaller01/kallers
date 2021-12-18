<template>
  <div>
    <v-row>
      <v-col
        v-for="(photos, index) in masonry"
        v-bind:key="index"
        class="ma-0 pa-0"
      >
        <article v-for="photo in photos" v-bind:key="photo._id" class="pa-2">
          <v-img
            :src="photo.paths.w400"
            :lazy-src="photo.paths.preview"
            :aspect-ratio="photo.width / photo.height"
          />
        </article>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async middleware({ store, route, app, $device }) {
    let n =
      ($device.isMobile && 1) ||
      ($device.isTablet && 3) ||
      ($device.isDesktop && 6) ||
      3;
    console.log("HELLLOOOO" + n);
    const photos = (await app.$axios.get("/api/photos/masonry/" + n)).data;
    store.commit("SET_MASONRY", photos);
  },
  computed: {
    masonry() {
      return this.$store.state.masonry;
    },
  },
  data() {
    return {
      photos: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>
