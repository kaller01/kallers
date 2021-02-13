<template>
  <div>
    <vue-masonry-wall
      :items="photos"
      :options="{ width: 400, padding: 4 }"
      :ssr="{ columns: 5 }"
    >
      <template v-slot:default="{ item }">
        <div>
        <v-img :src="item.paths.w400" :lazy-src="item.paths.preview" :aspect-ratio="item.width/item.height" class="photo"/>
        </div>
      </template>
    </vue-masonry-wall>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import VueMasonryWall from "vue-masonry-wall";

export default {
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  components: { VueMasonryWall }
};
</script>

<style scoped>
  /* .photo {
    object-fit: cover;
    width: 100%;
    height: 100%;
    line-height: 0;
    display: block;
  } */

</style>
