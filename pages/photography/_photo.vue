<template>
  <div>
    <article>
      <h1>{{ photo.filename }}</h1>
      <nuxt-link :to="photo.next.replace('.jpg','')">Next</nuxt-link>
      <v-img :src="photo.paths.h1080"></v-img>
    </article>
  </div>
</template>

<script>
import photography from "./index.vue";
export default {
  async middleware({ store, route, app }) {
    const photo = (
      await app.$axios.get("/api/photos/" + route.params.photo+ ".jpg")
    ).data;
    let next = photo.next;
    let prev = photo.prev;
    console.log({next,prev})
    store.commit("SET_PHOTO", photo);
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    photo() {
      return this.$store.state.photo;
    }
  },
  components: { photography }
};
</script>

<style></style>
