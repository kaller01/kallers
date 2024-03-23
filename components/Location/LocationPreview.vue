<script setup>
const props = defineProps(['location']);
const location = computed(() => props.location);
const photoStore = usePhotoStore();
const cover = computed(()=> photoStore.byId(props.location.cover));
</script>

<template>
    <v-card :to="localePath('/locations/' + location.link)">
        <v-img :aspect-ratio="7 / 4" :src="cover.paths.h400"
            gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)" cover>
            <div class="d-flex align-center justify-center flex-column fill-height" color="white">
                <p class="text-h3 ma-0">
                    {{ location.title }}
                </p>
                <p class="headline white--text ma-0">
                    {{ location.coords }}
                </p>
                <!-- <v-rating v-model="location.rating" color="white" half-increments background-color="grey"
                    empty-icon="mdi-heart-outline" half-icon="mdi-heart-half-full" full-icon="mdi-heart"
                    readonly></v-rating> -->
            </div>
        </v-img>
    </v-card>
</template>