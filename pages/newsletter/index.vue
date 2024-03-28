<script setup lang="ts">

const { data: posts, pending, error, refresh } = await useFetch('/api/posts');
</script>

<template>
    <ContentContainer>
        <v-row>
            <v-col cols="12" lg="6" v-for="post in posts" v-bind:key="post._id">
                <v-card class="pa-5 mb-3" :to="localePath('/newsletter/' + post.link)" elevation="5">
                    <div class="post-preview px-3" style="height: 40vh;">
                        <post :post="post" />
                    </div>
                    <nuxt-link :to="'/newsletter/' + post.link">{{ post.link }}</nuxt-link>
                </v-card>
            </v-col>
        </v-row>
    </ContentContainer>
</template>

<style scoped>
.post-preview {
    overflow: hidden;
    --mask: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 40%,
            rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0) 100% 50% / 100% 100% repeat-x;

    -webkit-mask: var(--mask);
    mask: var(--mask);
}
</style>