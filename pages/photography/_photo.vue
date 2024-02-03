<template>
  <div class="max">
    <article class="ma-0 max">
      <v-row class="ma-0 max" align="start" justify="center">
        <v-col cols="12" class="max">
          <v-row class="ma-0 max" align="start" justify="center">
            <v-col cols="12" md="6" lg="8" xl="9" class="d-flex justify-center max">
              <v-img :src="photo.paths.h1080" :lazy-src="photo.paths.preview" class="pa-1 max" contain />
            </v-col>

            <v-col cols="12" md="6" lg="4" xl="3" class="sidescroll">
              <v-card>
                <v-card-title>
                  <h1>
                    {{ photo.title || photo.filename }}
                  </h1>
                  <v-spacer></v-spacer>
                  <v-btn @click="open"><v-icon>mdi-open-in-new</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-icon>mdi-alarm</v-icon> {{ photo.shutterspeed }} s
                    </v-col>
                    <v-col cols="6">
                      <v-icon>mdi-camera-iris</v-icon> {{ photo.aperture }}
                    </v-col>
                    <v-col cols="12">
                      {{ description }}
                    </v-col>
                    <v-col cols="12">
                      {{ date }}
                    </v-col>

                    <v-col v-if="photo.location">
                      <span class="headline"> Photograph taken in </span>
                      <v-card :to="localePath('/locations/' + photo.location.link)">
                        <v-img :aspect-ratio="7 / 4" :src="photo.location.cover.paths.h400"
                          gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)">
                          <div class="
                              d-flex
                              align-center
                              justify-center
                              flex-column
                              fill-height
                            " color="white">
                            <p class="
                                display-2
                                font-weight-light
                                white--text
                                ma-0
                              ">
                              {{ photo.location.title }}
                            </p>
                            <p class="headline white--text ma-0">
                              {{ photo.location.coords }}
                            </p>
                            <v-rating v-model="photo.location.rating" color="white" half-increments
                              background-color="grey" empty-icon="mdi-heart-outline" half-icon="mdi-heart-half-full"
                              full-icon="mdi-heart" readonly></v-rating>
                          </div>
                        </v-img>
                      </v-card>
                    </v-col>
                    <v-col cols="12"> </v-col>
                    <v-col cols="12">
                      <span class="headline"> Collections including </span>
                      <v-card :to="localePath('/albums/' + collection.link)" v-for="collection in photo.collections"
                        v-bind:key="collection._id" class="mb-2">
                        <v-img :aspect-ratio="7 / 4" :src="collection.cover.paths.h400"
                          gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)">
                          <div class="
                              d-flex
                              align-center
                              justify-center
                              flex-column
                              fill-height
                            " color="white">
                            <p class="
                                display-2
                                font-weight-light
                                white--text
                                ma-0
                                text-center
                              ">
                              {{ collection.title }}
                            </p>
                            <p class="headline white--text ma-0"></p>
                          </div>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- <v-col class="max" cols="1">hello</v-col> -->
            </v-col>
          </v-row>
        </v-col>
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
import { getPhotoCaption } from "~/common/util"
export default {
  layout: "fullscreen",
  async middleware({ store, route, app }) {
    const photo = (
      await app.$axios.get("/api/photos/" + route.params.photo + ".jpg")
    ).data;
    let next = photo.next;
    let prev = photo.prev;
    store.commit("SET_PHOTO", photo);
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    photo() {
      return this.$store.state.photo;
    },
    date() {
      return new Date(this.photo.date).toLocaleDateString("en-SE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
    description() {
      return getPhotoCaption(this.photo)
    },
  },
  components: { photography },
  methods: {
    open: function () {
      window.open(this.photo.paths.original, '_blank')
    },
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
  head() {
    return {
      title: this.photo.title || this.photo.filename,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.photo.title || this.photo.filename,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.photo.paths.w1080,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.description,
        },
      ],
    };
  },
};
</script>

<style scoped>
.max {
  width: 100% !important;
  height: 100% !important;
  max-height: 100vh;
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
}

.exit {
  top: 0;
  position: absolute;
  margin: 16px;
  font: 50px;
}

.image {
  object-fit: contain;
  max-width: 100%;
}

.sidescroll {
  height: 100%;
  overflow-y: scroll;
}

.sidescroll::-webkit-scrollbar {
  width: 0px;
}

.main {
  height: 100%;
  background-color: pink;
}
</style>
