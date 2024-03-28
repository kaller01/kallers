<script setup>
const props = defineProps(['location']);
const location = computed(() => props.location);
const display = ref(useDisplay());
</script>


<template>
  <v-card dark class="pa-4 mx-2" :style="{ 'height': '48px' }">
    <v-row class="align-center">
      <p class="white--text text-h4 ma-0">{{ location.title }}</p>
      <v-spacer></v-spacer>
      <ClientOnly>

        <v-rating v-model="location.rating" color="red" half-increments background-color="grey"
          empty-icon="mdi-heart-outline" half-icon="mdi-heart-half-full" full-icon="mdi-heart" class="mx-3"
          readonly></v-rating>
      </ClientOnly>
    </v-row>
  </v-card>
</template>