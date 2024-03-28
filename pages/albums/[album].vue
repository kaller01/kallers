<script setup>

const route = useRoute();
const albumStore = useAlbumStore();
const album = computed(() => albumStore.byName(route.params.album));
const photoStore = usePhotoStore();
const { data } = await useFetch(() => `/api/albums/${album.value._id}/photos`);
const photos = computed(() => photoStore.byIds(data.value));
const display = ref(useDisplay());

</script>

<template>
    <ContentContainer>
        <Masonry :photos="photos" :cols="display.xlAndUp ? 4 : 3" />
    </ContentContainer>
</template>