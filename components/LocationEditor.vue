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
        <v-btn color="blue darken-1" text @click="$emit('save', location)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    location: Object
  }
};
</script>

<style></style>
