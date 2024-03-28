<script setup>
import ContentContainer from '~/components/ContentContainer.vue';

const route = useRoute()
const link = route.params.post;
const { data, pending, error, refresh } = await useFetch(`/api/posts/${link}`);
</script>

<template>
    <ContentContainer>
        <Post :post="data.post"></Post>
    </ContentContainer>
</template>

<style scoped>
.photos {
    min-height: 300px;
    max-height: 1000px;
}
</style>