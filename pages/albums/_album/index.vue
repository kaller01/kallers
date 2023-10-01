<template>
  <div>
    <v-container fluid>
      <masonry-wall
        v-if="$vuetify.breakpoint.mdAndUp"
        :items="album.photos"
        :ssr-columns="4"
        :column-width="500"
        :gap="12"
      >
        <template #default="{ item }">
          <article @click="test(item.filename)">
            <v-img
              :src="item.paths.w400"
              :lazy-src="item.paths.preview"
              :aspect-ratio="item.width / item.height"
            />
          </article>
        </template>
      </masonry-wall>
      <div v-else>
        <article
          v-for="item in album.photos"
          v-bind:key="item._id"
          class="my-4"
        >
          <v-img
            :src="item.paths.w400"
            :lazy-src="item.paths.preview"
            :aspect-ratio="item.width / item.height"
          />
        </article>
      </div>
    </v-container>
  </div>
</template>

<script>
import MasonryWall from "@yeger/vue2-masonry-wall";
export default {
  name: "album",
  async middleware({ store, route, app }) {
    // console.log("I AM MIDDLEWARE");
    const album = (
      await app.$axios.get("/api/collections/" + route.params.album)
    ).data;
    store.commit("SET_COLLECTION", album);
    console.log(album);
  },
  computed: {
    albums() {
      return this.$store.state.collections;
    },
    album() {
      return this.$store.state.collection;
    },
  },
  data() {
    return {
      selectedalbum: "",
    };
  },
  components: { MasonryWall },
  methods: {
    test: function (name) {
      name = name.replace(".jpg", "");
      this.$router.push(this.localePath("/albums/"+this.album.link+"/"+name));
    },
  },
  created() {
    console.log("CREATED", this.album);
    this.selectedalbum = this.$route.params.album;
  },
  head() {
    return {
      title: this.album.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.album.description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.album.title,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.album.cover.paths.w1080,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.album.description,
        },
      ],
    };
  },
};
</script>

<style scoped>
.photos {
  min-height: 300px;
  max-height: 1000px;
}
</style>
