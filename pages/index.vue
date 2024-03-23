<script setup lang="ts">
const store = usePhotoStore();
</script>

<template>
    <h1>Photos</h1>
    <pre>{{ store.photos }}</pre>
</template>