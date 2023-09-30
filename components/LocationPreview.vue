<template>
    <v-hover v-slot:default="{ hover }">
        <v-card :class="`elevation-${hover ? 24 : 0}`" :to="localePath('/locations/' + location.link)">
            <v-img :aspect-ratio="7 / 4" :src="location.cover.paths.h400" class="imgtext"
                gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)">
                <div class="
                    d-flex
                    align-center
                    justify-center
                    flex-column
                    fill-height
                  " color="white">
                    <p class="display-2 font-weight-light white--text ma-0">
                        {{ location.title }}
                    </p>
                    <p class="headline white--text ma-0">{{ location.coords }}</p>
                    <v-rating v-model="location.rating" color="white" half-increments background-color="grey"
                        empty-icon="mdi-heart-outline" half-icon="mdi-heart-half-full" full-icon="mdi-heart"
                        readonly></v-rating>
                </div>
            </v-img>
        </v-card>
    </v-hover>
</template>
  
<script>
export default {
    props: {
        location: Object,
    },
};
</script>
  
<style></style>
  