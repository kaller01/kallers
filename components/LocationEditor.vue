<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{ location.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              ><v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    v-model="location.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description"
                    v-model="location.description"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-rating
                    v-model="location.rating"
                    color="white"
                    half-increments
                    background-color="grey"
                    empty-icon="mdi-heart-outline"
                    half-icon="mdi-heart-half-full"
                    full-icon="mdi-heart"
                  ></v-rating>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="location.photos"
                    item-value="_id"
                    label="Cover"
                    v-model="location.cover"
                  >
                    <template v-slot:selection="{ item }">
                      <img :src="item.paths.preview" />{{ item.filename }}
                    </template>
                    <template v-slot:item="{ item }">
                      <img :src="item.paths.preview" />{{ item.filename }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <array-editor v-model="location.youtube"></array-editor>
                </v-col> </v-row
            ></v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('delete', location)">
          Delete
        </v-btn>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="$emit('save', location)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ArrayEditor from './ArrayEditor.vue';
export default {
  components: { ArrayEditor },
  props: {
    location: Object
  },
};
</script>

<style></style>
