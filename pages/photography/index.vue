<script setup>

const photoStore = usePhotoStore();

const masonry = computed(() => photoStore.masonry["3"]);

const photos = computed(() => photoStore.list)

const display = ref(useDisplay());

</script>

<template>
    <v-container>
        <v-row v-show="display.mdAndDown">
            <v-col v-for="(photos, index) in masonry" v-bind:key="index" class="ma-0 pa-0">
                <Photo v-for="photoId in photos" v-bind:key="photoId" :photo="photoStore.byId(photoId)" />
            </v-col>
        </v-row>
        <Masonry :photos="photos" horizontal v-show="!display.mdAndDown" />
    </v-container>
    <JsonDebug :json="photos" />
</template>