<script setup>
const route = useRoute();
const filename = route.params.photo;

const photoStore = usePhotoStore();
const photo = computed(() => photoStore.byName(filename));
const date = getDateString(photo.value);
const month = getMonthString(photo.value);
const description = getPhotoDescription(photo.value);

const locationStore = useLocationStore();
const location = computed(() => locationStore.byPhoto(photo.value));

const albumStore = useAlbumStore();
const albums = computed(() => albumStore.byPhoto(photo.value));

definePageMeta({
    layout: 'fullscreen'
})
</script>

<template>
    <div class="max">
        <article class="ma-0 max">
            <v-row class="ma-0 max" align="start" justify="center">
                <v-col cols="12" class="max">
                    <v-row class="ma-0 max" align="start" justify="center">
                        <v-col cols="12" md="11" lg="8" xl="9" class="d-flex justify-center max">
                            <v-img :src="photo.paths.h1080" :lazy-src="photo.paths.preview" class="pa-1 max" contain />
                        </v-col>

                        <v-col cols="12" md="8" lg="6" xl="3" class="sidescroll">
                            <v-card>
                                <v-card-title>
                                    <h1>
                                        {{ route.redirectedFrom }}
                                        {{ photo.title || photo.filename }}
                                    </h1>
                                    <v-spacer></v-spacer>
                                    <!-- <v-btn @click="open" v-if="isAdmin"><v-icon>mdi-open-in-new</v-icon></v-btn> -->
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-icon>mdi-alarm</v-icon> {{ photo.shutterspeed }} s
                                        </v-col>
                                        <v-col cols="6">
                                            <v-icon>mdi-camera-iris</v-icon> {{ photo.aperture }}
                                        </v-col>
                                        <v-col cols="12">
                                            {{ description }}
                                        </v-col>
                                        <v-col cols="12">
                                            {{ date }}
                                        </v-col>

                                        <v-col v-if="location">
                                            <span class="text-subtitle-1"> Photograph taken in </span>
                                            <LocationPreview :location="location" />
                                        </v-col>
                                        <v-col cols="12"> </v-col>
                                        <v-col cols="12">
                                            <span class="text-subtitle-1"> Collections including </span>
                                            <AlbumPreview v-for="album in albums" v-bind:key="album._id" :album="album"
                                                class="mb-2" />
                                        </v-col>
                                    </v-row>
                                    <JsonDebug :json="photo" />
                                    <JsonDebug :json="location" />
                                    <JsonDebug :json="albums" />
                                </v-card-text>
                            </v-card>

                            <!-- <v-col class="max" cols="1">hello</v-col> -->
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <!-- <h1>{{ photo.filename }}</h1>
        <nuxt-link :to="photo.next.replace('.jpg','')">Next</nuxt-link> -->
        </article>

        <v-btn fab large dark top left text class="exit" @click="exit">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </div>
</template>

<style scoped>
.max {
    width: 100% !important;
    height: 100% !important;
    max-height: 100vh;
}

.limit {
    max-width: 100% !important;
    max-height: 100% !important;
}

.test {
    background-color: pink;
}

.white1 {
    background-color: white;
}

.exit {
    top: 0;
    position: absolute;
    margin: 16px;
    font: 50px;
}

.image {
    object-fit: contain;
    max-width: 100%;
}

.sidescroll {
    height: 100%;
    overflow-y: scroll;
}

.sidescroll::-webkit-scrollbar {
    width: 0px;
}

.main {
    height: 100%;
    background-color: pink;
}
</style>