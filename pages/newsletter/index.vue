<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col xl="8" lg="10" md="12">
                    <v-card class="pa-5 mb-3" v-for="post in posts" :to="'/newsletter/' + post.link">
                        <div class="post-preview px-3" style="height: 80vh;">
                            <post :post="post" />
                        </div>
                        <nuxt-link :to="'/newsletter/' + post.link">{{ post.link }}</nuxt-link>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>
  
<script>
import Post from '~/components/Post.vue';

export default {
    components: { Post },
    computed: {
        posts() {
            return this.$store.state.posts;
        }
    },
};
</script>

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


  