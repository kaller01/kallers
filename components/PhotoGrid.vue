<template>
  <v-row>
    <v-col
      v-for="(photos, index) in masonry"
      v-bind:key="index"
      class="ma-0 pa-0"
    >
      <article v-for="photo in photos" v-bind:key="photo._id" class="pa-1">
        <v-img
          @click="test(photo.filename)"
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
  methods: {
    test: function (name) {
      name = name.replace(".jpg", "");
      console.log(name);
      this.$router.push(this.localePath("/photography/" + name));
    },
  },
};
</script>

<style>
</style>