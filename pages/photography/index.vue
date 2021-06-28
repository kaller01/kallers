<template>
  <div>
    <vue-masonry-wall
      :items="photos"
      :options="{ width: 400, padding: 4 }"
      :ssr="{ columns: 5 }"
    >
      <template v-slot:default="{ item }">
        <article @click="test(item.filename)">
          <v-img
            :src="item.paths.w400"
            :lazy-src="item.paths.preview"
            :aspect-ratio="item.width / item.height"
            class="photo"
          />
        </article>
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
  components: { VueMasonryWall },
  methods: {
    test: function(name) {
      name = name.replace(".jpg", "");
      console.log(name);
      this.$router.push(this.localePath("/photography/" + name));
    }
  }
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
