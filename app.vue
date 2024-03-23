<script setup>

{
  const store = usePhotoStore();
  const { data: photos } = await useFetch('/api/photos');
  store.photos = photos;
  const { data: masonry } = await useFetch('/api/photos/masonry');
  store.masonry = masonry;
}
{
  const store = useLocationStore();
  const { data } = await useFetch('/api/locations');
  store.locations = data;
}
{
  const store = useAlbumStore();
  const { data } = await useFetch('/api/albums');
  store.albums = data;
}

</script>

<template>
  <div>
    <NuxtLayout>
      <!-- <ClientOnly> -->
      <NuxtPage />
      <!-- </ClientOnly> -->
    </NuxtLayout>
  </div>
</template>