<template>
  <div class="mt-3">
    <v-container>
      <v-row>
        <v-spacer v-show="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <v-col
          height="48px"
          class="ma-0 rounded test pa-0 px-3"
          :md="6"
          :lg="4"
        >
          <div>
            <v-autocomplete
              :items="albums"
              item-text="title"
              item-value="title"
              @change="albumSearched"
              v-model="selectedalbum"
              label="Search album..."
              dense
              hide-details
              solo
              autocomplete="off"
              height="48px"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-row :class="'justify-end'">
        <v-col
          :cols="12"
          :md="6"
          :lg="4"
          v-for="(album, index) in albums"
          v-bind:key="index"
          class="pa-3"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :class="`elevation-${hover ? 24 : 0}`"
              :to="localePath('/album/' + album.link)"
            >
              <v-img
                :aspect-ratio="7 / 4"
                :src="album.cover.paths.h400"
                class="imgtext"
                gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)"
              >
                <div
                  class="
                    d-flex
                    align-center
                    justify-center
                    flex-column
                    fill-height
                  "
                  color="white"
                >
                  <p class="display-2 font-weight-light white--text ma-0">
                    {{ album.title }}
                  </p>
                  <p class="headline white--text ma-0">{{ album.coords }}</p>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Album",
  data() {
    return {
      selectedalbum: "",
      order: {
        reverse: "",
        justify: "start",
        icon: "mdi-sort-descending",
      },
    };
  },
  computed: {
    albums() {
      return this.$store.state.collections;
    },
  },
  methods: {
    albumSearched() {
      if (this.selectedalbum) {
        this.$router.push(this.localePath("/album/" + this.selectedalbum));
      }
    },
  },
  mounted() {},
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
