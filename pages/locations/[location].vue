<script setup>
const route = useRoute();
const locationStore = useLocationStore();
const location = computed(() => locationStore.byName(route.params.location));
const photoStore = usePhotoStore();
const { data } = await useFetch(() => `/api/locations/${location.value._id}/photos`);
const photos = computed(() => photoStore.byIds(data.value));
const display = ref(useDisplay());

const history = computed(() => {
    const uniqueDays = new Set();
    photos.value.forEach(photo => {
        const dateStr = photo.date.split('T')[0]; // Extract only day part
        uniqueDays.add(dateStr);
    });
    return Array.from(uniqueDays).map(day => new Date(day)).sort((a, b) => b.getTime() - a.getTime());
})
console.log(history.value);


</script>

<template>
    <div>
        <v-container>
            <v-row v-if="!display.xlAndUp">
                <div class="d-flex align-center justify-center ml-3">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn height="48px" class="mr-2 pa-0" :to="localePath('/locations/')" v-on="on">
                                <v-icon class="pa-0">mdi-arrow-left</v-icon>
                            </v-btn>
                        </template>
                        <span>Go back to locations</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" @click="openInMaps()" height="48px" class="mr-2 pa-0" color="primary">
                                <v-icon class="pa-0">mdi-google-maps</v-icon>
                            </v-btn>
                        </template>
                        <span>Open {{ location.title }} in google maps</span>
                    </v-tooltip>
                </div>
                <v-spacer v-show="!display.smAndDown"></v-spacer>
            </v-row>
            <v-row ref="sidebar">
                <v-col xl="8" order="2" order-xl="1">
                    <LocationHeader :location="location" v-show="display.xlAndUp"></LocationHeader>
                    <div>
                        <v-card dark class="pa-2">
                            <Masonry :photos="photos" :cols="display.xlAndUp ? 4 : 3" />
                        </v-card>
                    </div>
                </v-col>
                <v-col cols="12" xl="4" order="1" order-xl="2">
                    <LocationHeader :location="location" v-show="!display.xlAndUp" />
                    <LocationText :location="location" />

                    <v-card dark class="my-4" v-for="src in location.youtube" v-bind:key="src">
                        <v-responsive :aspect-ratio="16 / 9" class="pa-2">
                            <iframe width="100%" height="100%" :src="src" frameborder="0" allow
                                allowfullscreen></iframe>
                        </v-responsive>
                    </v-card>

                    <v-card>
                        <h1>History</h1>
                        <p v-for="date in history" v-bind:key="date">
                            {{ dateToString(date) }}
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>