<template>
  <div>
    <article class="ma-0">
      <v-row class="ma-0" align="center" justify="center">
        <!-- <v-col class="max" cols="1">hello</v-col> -->

        <img
          :src="photo.paths.h1080"
          :lazy-src="photo.paths.preview"
          class="white1 pa-1"
          contain
        />

        <!-- <v-col class="max" cols="1">hello</v-col> -->
      </v-row>
      <!-- <h1>{{ photo.filename }}</h1>
      <nuxt-link :to="photo.next.replace('.jpg','')">Next</nuxt-link> -->
    </article>

    <v-btn fab large dark top left text class="exit" @click="exit">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
import photography from "./index.vue";
export default {
  layout: "fullscreen",
  async middleware({ store, route, app }) {
    const photo = (
      await app.$axios.get("/api/photos/" + route.params.photo + ".jpg")
    ).data;
    let next = photo.next;
    let prev = photo.prev;
    console.log({ next, prev });
    store.commit("SET_PHOTO", photo);
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    photo() {
      return this.$store.state.photo;
    },
  },
  components: { photography },
  methods: {
    exit() {
      this.$router.push(this.localePath("/photography/"));
    },
    prev() {
      this.goto(this.photo.prev);
    },
    next() {
      this.goto(this.photo.next);
    },
    goto: function (name) {
      name = name.replace(".jpg", "");
      console.log(name);
      this.$router.push(this.localePath("/photography/" + name));
    },
    keyhandler(e) {
      switch (e.key) {
        case "Escape":
          this.exit();
          break;
        case "ArrowLeft":
          this.prev();
          break;
        case "ArrowRight":
          this.next();
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
};
</script>

<style scoped>
.max {
  height: 100vh;
}
.limit {
  max-width: 100% !important;
  max-height: 100% !important;
}
.test {
  background-color: pink;
}
.white1 {
  background-color: white;
  max-height: 98vh;
  max-width: 98vw;
}
.exit {
  top: 0;
  position: absolute;
  margin: 16px;
  font: 50px;
}
</style>
