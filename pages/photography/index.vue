<template>
  <div>
    <v-container fluid>
      <masonry-wall
        v-if="$vuetify.breakpoint.mdAndUp"
        :items="photos"
        :ssr-columns="6"
        :column-width="300"
        :gap="12"
      >
        <template #default="{ item }">
          <article @click="test(item.filename)">
            <v-img
              :src="item.paths.w400"
              :lazy-src="item.paths.preview"
              :aspect-ratio="item.width / item.height"
              class="photo"
            />
          </article>
        </template>
      </masonry-wall>
      <div v-else>
        <article v-for="item in photos" v-bind:key="item._id" class="mb-4">
          <v-img
            :src="item.paths.w400"
            :lazy-src="item.paths.preview"
            :aspect-ratio="item.width / item.height"
            class="photo"
          />
        </article>
      </div>
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
  },
  components: { MasonryWall },
  methods: {
    test: function (name) {
      name = name.replace(".jpg", "");
      console.log(name);
      this.$router.push(this.localePath("/photography/" + name));
    },
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
