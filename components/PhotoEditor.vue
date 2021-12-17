<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{ photo.filename }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6"
              ><v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    v-model="photo.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description"
                    v-model="photo.description"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    item-text="title"
                    item-value="_id"
                    :items="locations"
                    label="Location"
                    v-model="photo.location"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    item-text="title"
                    item-value="_id"
                    :items="collections"
                    label="Collections"
                    multiple
                    v-model="photo.collections"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Amount of prints"
                    v-model="photo.prints"
                    type="number"
                  ></v-text-field>
                </v-col> </v-row
            ></v-col>
            <v-col cols="6">
              <v-img :src="photo.paths.w400"></v-img>
            </v-col>
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
    photo: Object,
  },
  computed: {
    locations() {
      return this.$store.state.locations;
    },
    collections() {
      return this.$store.state.collections;
    },
  },
  methods: {
    prepareData() {
      console.log(this.photo);
    },
  },
};
</script>

<style></style>
