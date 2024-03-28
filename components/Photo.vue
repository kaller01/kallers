<script setup>
const props = defineProps(["photo"]);
const photo = computed(() => props.photo);
</script>


<template>
    <article class="flex pa-1 ma-0">
        <NuxtLink :to="localePath('/photography/' + photo.filename.split('.')[0])" class="flex pa-0 ma-0">
            <img :src="photo.paths.h400" />
        </NuxtLink>
    </article>
</template>

<style scoped>
img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.flex {
    display: flex;
    flex: 1 1 auto;
}
</style>