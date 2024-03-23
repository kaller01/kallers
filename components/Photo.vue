<script setup>
const props = defineProps(["photo"]);
const photo = computed(() => props.photo);
</script>


<template>
    <article class="flex">
        <NuxtLink :to="localePath('/photography/' + photo.filename)" class="flex">
            <img :src="photo.paths.w400" />
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
    flex: 1 1 auto;
}
</style>