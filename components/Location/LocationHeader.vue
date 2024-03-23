<script setup>
const props = defineProps(['location']);
const location = computed(() => props.location);
const display = ref(useDisplay());
</script>


<template>
    <v-card dark class="mb-6">
      <v-row class="px-6 py-3 align-center">
        <div v-if="display.xlAndUp">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                
                :to="localePath('/locations/')"
                height="48px"
                class="mr-2 pa-0"
                v-on="on"
              >
                <v-icon class="pa-0">mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Go back to locations</span>
          </v-tooltip>
        </div>
        <p class="white--text text-h2 ma-0">{{ location.title }}</p>
  
        <v-spacer></v-spacer>
        <!-- <v-rating
          v-model="location.rating"
          color="red"
          half-increments
          background-color="grey"
          empty-icon="mdi-heart-outline"
          half-icon="mdi-heart-half-full"
          full-icon="mdi-heart"
          class="mx-3"
          readonly
        ></v-rating> -->
      </v-row>
    </v-card>
  </template>
  