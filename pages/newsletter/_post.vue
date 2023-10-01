<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col xl="8" lg="10" md="12">
                    <v-card class="pa-5 mb-3">
                        <post :post="selectedPost"></post>
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
    name: "SelectedPost",
    async middleware({ store, route, app }) {
        const post = (
            await app.$axios.get("/api/posts/" + route.params.post)
        ).data;
        store.commit("SET_POST", post);
    },
    computed: {
        selectedPost() {
            return this.$store.state.post;
        },
    },
    // head() {
    //   return {
    //     title: this.album.title,
    //     meta: [
    //       {
    //         hid: "description",
    //         name: "description",
    //         content: this.album.description,
    //       },
    //       {
    //         hid: "og:title",
    //         name: "og:title",
    //         content: this.album.title,
    //       },
    //       {
    //         hid: "og:image",
    //         property: "og:image",
    //         content: this.album.cover.paths.w1080,
    //       },
    //       {
    //         hid: "og:description",
    //         property: "og:description",
    //         content: this.album.description,
    //       },
    //     ],
    //   };
    // },
};
</script>
  
<style scoped>
.photos {
    min-height: 300px;
    max-height: 1000px;
}
</style>
  