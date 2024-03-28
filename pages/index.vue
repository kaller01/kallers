<script setup lang="ts">
const photoStore = usePhotoStore();

const albumStore = useAlbumStore();
const portfolio = computed(() => albumStore.byName("portfolio"));
const { data } = await useFetch(`/api/albums/${portfolio.value._id}/photos`);
const photos = computed(() => photoStore.byIds(data.value));
const display = ref(useDisplay());

const horizontalPhotos = computed(() => photos.value.filter((photo: any) => photo.width > photo.height));
const verticalPhotos = computed(() => photos.value.filter((photo: any) => photo.width < photo.height))

const { data: posts, pending, error, refresh } = await useFetch('/api/posts');

definePageMeta({
    layout: false,
})

const model = useState(() => 0)

</script>

<template>
    <div>
        <NuxtLayout name="default">
            <template #header>
                <div class="cover-wrapper">
                    <v-container fluid class="pa-0 mb-8 fill-height text-white">
                        <v-carousel v-if="display.smAndDown" cycle :show-arrows="false" :height="display.height - 74"
                            hide-delimiter-background delimiter-icon="mdi-minus" v-model="model">
                            <v-carousel-item v-for="photo in verticalPhotos" v-bind:key="photo._id">
                                <v-img :src="photo.paths.h1080" :lazy-src="photo.paths.preview"
                                    :height="display.height - 74" cover>
                                </v-img>
                            </v-carousel-item>
                            <v-container fluid class="title fill-height">
                                <v-row align="center" justify="center">
                                    <v-col class="d-flex flex-column">
                                        <h1 class="text-h1 text-center">Martin Kaller</h1>
                                        <h1 class="text-lg-h2 text-h3 font-weight-thin text-center">
                                            LANDSCAPE PHOTOGRAPHY
                                        </h1>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-carousel>
                        <v-carousel v-if="display.mdAndUp" cycle :show-arrows="false" :height="display.height - 74"
                            hide-delimiter-background delimiter-icon="mdi-minus" v-model="model">
                            <v-carousel-item v-for="photo in horizontalPhotos" v-bind:key="photo._id">
                                <v-img :src="photo.paths.h1080" :lazy-src="photo.paths.preview"
                                    :height="display.height - 74" cover>
                                </v-img>
                            </v-carousel-item>
                            <v-container fluid class="title fill-height">
                                <v-row align="center" justify="center">
                                    <v-col class="d-flex flex-column">
                                        <h1 class="text-h1 text-center">Martin Kaller</h1>
                                        <h1 class="text-lg-h2 text-h3 font-weight-thin text-center">
                                            LANDSCAPE PHOTOGRAPHY
                                        </h1>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-carousel>
                    </v-container>
                    <div class="cover"></div>
                </div>
                <div class="cover-spacer"></div>
            </template>



            <ContentContainer>
                <v-row class="px-1">
                    <v-col cols="12" lg="6" v-for="post in posts.slice(0, 2)" v-bind:key="post._id">
                        <v-card class="pa-5 mb-3" :to="'/newsletter/' + post.link" elevation="5">
                            <div class="post-preview px-3" style="height: 40vh;">
                                <post :post="post" />
                            </div>
                            <nuxt-link :to="'/newsletter/' + post.link">{{ post.link }}</nuxt-link>
                        </v-card>
                    </v-col>
                </v-row>
                <Masonry :photos="photos" />
            </ContentContainer>

        </NuxtLayout>
    </div>
</template>

<style scoped>
.cover {
    object-fit: cover;
    width: 100svw;
    height: 100svh;
}

.cover-wrapper {
    position: fixed;
    z-index: 0;
}

.cover-spacer {
    height: calc(100svh - 76px);
}

.title {
    position: absolute;
}

.post-preview {
    overflow: hidden;
    --mask: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 1) 40%,
            rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0) 100% 50% / 100% 100% repeat-x;

    -webkit-mask: var(--mask);
    mask: var(--mask);
}
</style>