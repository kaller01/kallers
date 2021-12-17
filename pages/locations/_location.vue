<template>
  <div>
    <v-container>
      <v-row v-if="!$vuetify.breakpoint.xlOnly">
        <div class="d-flex align-center justify-center ml-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                height="48px"
                class="mr-2 pa-0"
                :to="localePath('/locations/')"
                v-on="on"
              >
                <v-icon class="pa-0">mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Go back to locations</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                @click="openInMaps()"
                height="48px"
                class="mr-2 pa-0"
                color="primary"
              >
                <v-icon class="pa-0">mdi-google-maps</v-icon>
              </v-btn>
            </template>
            <span>Open {{ location.title }} in google maps</span>
          </v-tooltip>
        </div>
        <v-spacer v-show="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <v-col class="pa-3 ma-0 rounded test" :md="6" :lg="4">
          <div>
            <v-autocomplete
              :items="locations"
              item-text="title"
              item-value="title"
              @change="locationSearched"
              v-model="selectedLocation"
              label="Search location..."
              dense
              hide-details
              solo
              autocomplete="off"
              height="48px"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-row ref="sidebar">
        <v-col xl="8" order="2" order-xl="1">
          <location-header
            :location="location"
            v-show="$vuetify.breakpoint.xlOnly"
          ></location-header>
          <div>
            <v-card dark class="pa-2" :v-if="location.photos.size > 0">
              <!-- <vue-masonry-wall
                :items="location.photos"
                :options="{ width: 400, padding: 4 }"
              >
                <template v-slot:default="{ item }">
                  <div>
                    <v-img
                      :aspect-ratio="item.width / item.height"
                      :v-if="item"
                      :src="item.paths.w400 || ''"
                      :lazy-src="item.paths.preview || ''"
                      class="photo"
                    />
                  </div>
                </template>
              </vue-masonry-wall> -->
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" xl="4" order="1" order-xl="2">
          <location-header
            :location="location"
            v-show="!$vuetify.breakpoint.xlOnly"
          ></location-header>
          <div v-show="$vuetify.breakpoint.xlOnly">
            <v-autocomplete
              :items="locations"
              item-text="title"
              item-value="title"
              @change="locationSearched"
              v-model="selectedLocation"
              label="Search location..."
              dense
              hide-details
              solo
              autocomplete="off"
              height="48px"
            ></v-autocomplete>
          </div>
          <locationText :location="location"></locationText>
         
          <v-card
            dark
            class="my-4"
            v-for="src in location.youtube"
            v-bind:key="src"
          >
            <v-responsive :aspect-ratio="16 / 9" class="pa-2">
              <iframe
                width="100%"
                height="100%"
                :src="src"
                frameborder="0"
                allow
                allowfullscreen
              ></iframe>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LocationHeader from "~/components/locationHeader.vue";
// import VueMasonryWall from "vue-masonry-wall";
import LocationText from '~/components/locationText.vue';
export default {
  name: "Location",
  async middleware({ store, route, app }) {
    // console.log("I AM MIDDLEWARE");
    const location = (
      await app.$axios.get("/api/locations/" + route.params.location)
    ).data;
    store.commit("SET_LOCATION", location);
    // console.log(location);
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    locations() {
      return this.$store.state.locations;
    },
    location() {
      return this.$store.state.location;
    }
  },
  data() {
    return {
      selectedLocation: ""
    };
  },
  components: { LocationHeader, LocationText },
  methods: {
    openInMaps() {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" +
          this.location.title,
        "_blank"
      );
    },
    locationSearched() {
      if (this.selectedLocation) {
        this.$router.push(
          this.localePath("/locations/" + this.selectedLocation)
        );
      }
    }
  },
  created() {
    console.log("CREATED", this.location);
    this.selectedLocation = this.$route.params.location;
  }
};
</script>

<style scoped>
.photos {
  min-height: 300px;
  max-height: 1000px;
}
</style>
