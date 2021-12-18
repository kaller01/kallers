<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{ collection.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              ><v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    v-model="collection.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Link"
                    v-model="collection.link"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Description"
                    v-model="collection.description"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="collection.photos"
                    item-value="_id"
                    label="Cover"
                    v-model="collection.cover"
                  >
                    <template v-slot:selection="{ item }">
                      <img :src="item.paths.preview" />{{ item.filename }}
                    </template>
                    <template v-slot:item="{ item }">
                      <img :src="item.paths.preview" />{{ item.filename }}
                    </template>
                  </v-select>
                </v-col>
              </v-row></v-col
            >
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('delete', collection)">
          Delete
        </v-btn>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="$emit('save', collection)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    collection: Object,
  },
};
</script>

<style></style>
