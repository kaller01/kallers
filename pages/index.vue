<script setup lang="ts">
const store = usePhotoStore();
</script>

<template>
    <h1>Index page</h1>
    <pre>{{ store.byId('658717989171e80603971e05') }}</pre>
    <pre>{{ store.byName('_MK24469.jpg') }}</pre>
</template>