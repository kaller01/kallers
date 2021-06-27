<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline"></span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6"
              ><v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    item-text="title"
                    item-value="_id"
                    :items="locations"
                    label="Location"
                    v-model="selectedlocation"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    item-text="title"
                    item-value="_id"
                    :items="collections"
                    label="Collections"
                    multiple
                    v-model="selectedcollections"
                  ></v-select>
                </v-col> </v-row
            ></v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="$emit('update', photo)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    photos: Array
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    collections() {
      return this.$store.state.collections;
    }
  },
  data() {
      return {
          selectedcollections: [],
          selectedlocation: {}
      }
  },
  methods: {
    prepareData() {
      console.log(this.photo);
    }
  }
};
</script>

<style></style>
