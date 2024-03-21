<script setup>

const photoStore = usePhotoStore();

const masonry = computed(() => photoStore.masonry["3"]);

const photos = computed(() => photoStore.list)

const display = ref(useDisplay());

</script>

<template>
    <v-container fluid class="pt-0 mt-0">
        <!-- <div class="vertical-gallery" v-if="display.mdAndDown">
            <img v-for="photo in photos" v-bind:key="photo._id" :src="photo.paths.h400" />
        </div> -->
        <v-row v-show="display.mdAndDown">
            <v-col v-for="(photos, index) in masonry" v-bind:key="index" class="ma-0 pa-0">
                <article v-for="photoId in photos" v-bind:key="photoId" class="pa-1">
                    <v-img :src="photoStore.byId(photoId).paths.w400"/>
                </article>
            </v-col>
        </v-row>
        <div v-v-show="!display.mdAndDown" class="horizontal-gallery">
            <img v-for="photo in photos" v-bind:key="photo._id" :src="photo.paths.h400" />
        </div>

    </v-container>
</template>

<style scoped>
.vertical-gallery {
    column-width: 30vw;
}

.vertical-gallery>img {
    width: 100%;
    display: inline-block;
}

.horizontal-gallery {
    display: flex;
    flex-wrap: wrap;
}

.horizontal-gallery>img {
    margin: 0.3em;
    flex-grow: 1;
    object-fit: cover;
    max-height: 300px;
    max-width: 100%;
}
</style>