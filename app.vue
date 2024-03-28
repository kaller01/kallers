<script setup>
const [photosPromise, masonryPromise, locationsPromise, albumsPromise] = await Promise.all([
  useFetch('/api/photos'),
  useFetch('/api/photos/masonry'),
  useFetch('/api/locations'),
  useFetch('/api/albums')
]);

// Destructure data from promises
const { data: photos } = photosPromise;
const { data: masonry } = masonryPromise;
const { data: locations } = locationsPromise;
const { data: albums } = albumsPromise;

// Update stores with the fetched data
const photoStore = usePhotoStore();
photoStore.photos = photos;
photoStore.masonry = masonry;

const locationStore = useLocationStore();
locationStore.locations = locations;

const albumStore = useAlbumStore();
albumStore.albums = albums;

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