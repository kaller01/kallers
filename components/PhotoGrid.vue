<template>
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
</template>

<script>
export default {
  name: "PhotoGrid",
  props: {
    masonry: Array,
  },
};
</script>

<style>
</style>