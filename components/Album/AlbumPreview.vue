<script setup>
const props = defineProps(['album']);
const album = computed(() => props.album);
const photoStore = usePhotoStore();
const cover = computed(()=> photoStore.byId(props.album.cover));
</script>

<template>
    <v-card :to="localePath('/albums/' + album.link)">
        <v-img :aspect-ratio="7 / 4" :src="cover.paths.h400" cover
            gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)">
            <div class=" d-flex align-center justify-center flex-column fill-height text-white">
                <p class="text-h3 font-weight-light white--text ma-0 text-center ">
                    {{ album.title }}
                </p>
            </div>
        </v-img>
    </v-card>
</template>