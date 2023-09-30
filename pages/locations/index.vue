<template>
  <div class="mt-3">
    <v-container>
      <v-row>
        <div class="d-flex align-center justify-center ml-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="sortByRating()" height="48px" class="mr-2 pa-0" v-on="on">
                <v-icon class="pa-0">mdi-heart</v-icon>
                <v-icon class="pa-0">{{ order.icon }}</v-icon>
              </v-btn>
            </template>
            <span>Sort by rating</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn href="https://www.google.se/maps/contrib/106633097459000923158" target="_blank" height="48px"
                class="mr-2 pa-0" v-on="on" color="primary">
                <v-icon>mdi-google-maps</v-icon>
              </v-btn>
            </template>
            <span>See my contributions on google maps!</span>
          </v-tooltip>
        </div>
        <v-spacer v-show="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <v-col height="48px" class="ma-0 rounded test pa-0 px-3" :md="6" :lg="4">
          <div>
            <v-autocomplete :items="locations" item-text="title" item-value="title" @change="locationSearched"
              v-model="selectedLocation" label="Search location..." dense hide-details solo autocomplete="off"
              height="48px"></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-row :class="'justify-end'">
        <v-col :cols="12" :md="6" :lg="4" v-for="(location, index) in locations" v-bind:key="index" class="pa-3">
          <location-preview :location="location">

          </location-preview>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LocationPreview from '~/components/LocationPreview.vue';
export default {
  components: { LocationPreview },
  name: "Locations",
  data() {
    return {
      selectedLocation: "",
      order: {
        reverse: "",
        justify: "start",
        icon: "mdi-sort-descending",
      },
    };
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    locations() {
      return this.$store.state.locations;
    },
  },
  methods: {
    locationSearched() {
      if (this.selectedLocation) {
        this.$router.push(
          this.localePath(
            "/locations/" +
            this.locations.find(
              (location) => location.title == this.selectedLocation
            ).link
          )
        );
      }
    },
    sortByRating() {
      //flips the order of the columns with flex
      this.locations.sort(sortByRating);
      if (this.order.icon !== "mdi-sort-descending") {
        this.order.icon = "mdi-sort-descending";
        this.locations.reverse();
      } else {
        this.order.icon = "mdi-sort-ascending";
      }
      function sortByRating(a, b) {
        if (a.rating < b.rating) {
          return -1;
        }
        if (a.rating > b.rating) {
          return 1;
        }
        return 0;
      }
    },
  },
  mounted() { },
  head() {
    return {
      title: "Locations",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "A collection of photography locations. Including coordinates, images, ratings, videos and tips.",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Locations",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://photos.kallers.se/assets/locations.jpeg",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "A collection of photography locations. Including coordinates, images, ratings, videos and tips.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
}

/* * {
  outline: 1px solid black;
} */
.searchBar {
  background-color: #f5f5f5;
  border-radius: 4px;
}

.imgtext {
  /* background: linear-gradient(90deg, rgba(0, 0, 255, 1), rgba(0, 0, 255, 1)); */
}
</style>
