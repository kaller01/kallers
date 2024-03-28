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

const display = ref(useDisplay());

definePageMeta({
    layout: 'fullscreen'
})
</script>

<template>
    <article class="ma-0 max">
        <v-row class="ma-0 max" justify="center">
            <v-col cols="12" md="12" lg="12" xl="9" class="d-flex justify-center pa-0">
                <div :class="display.lgAndUp ? 'large-img-wrapper pa-12' : 'small-img-wrapper pa-4'">
                    <img :src="photo.paths.h1080" class="elevation-20" />
                </div>
            </v-col>

            <v-col cols="12" md="11" lg="6" xl="3" :class="display.lgAndUp ? 'pl-10 large-sidescroll' : ''">
                <v-card class="elevation-20">
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
            </v-col>
        </v-row>
    </article>

    <v-btn fab large dark top left text class="exit" to="/photography">
        <v-icon>mdi-close</v-icon>
    </v-btn>
</template>

<style scoped>
.large-img-wrapper {
    height: 100vh;
    justify-content: center;
    flex-direction: column;
    display: flex;
}

.small-img-wrapper {
    padding-top: 10lvh !important;
    padding-bottom: 5lvh !important;
    width: 100lvw !important;
}

.exit {
    top: 0;
    position: absolute;
    margin: 16px;
    font: 50px;
}

.max {
    width: calc(100lvw);
}

img {
    object-fit: contain;
    width: 100%;
}

.large-sidescroll {
    height: 100lvh;
    overflow-y: scroll;
}

.large-sidescroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
    margin-top: 6px;
    margin-bottom: 6px;
}

.large-sidescroll::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
}

.large-sidescroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
}
</style>