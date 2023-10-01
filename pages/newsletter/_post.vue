<template>
    <div>
        <v-container>
            <v-row justify="center" v-if="selectedPost">
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
    head() {
      return {
        title: this.selectedPost.title,
        meta: [
          {
            hid: "description",
            name: "description",
            content: this.selectedPost.content.replace(/![A-Z]+\((.*)\)/g, "").replace(/![A-Z]+\{(.*)\}/g, "").replace(/!END/g,""),
          },
          {
            hid: "og:title",
            name: "og:title",
            content: this.selectedPost.title,
          },
          {
            hid: "og:image",
            property: "og:image",
            content: this.selectedPost.cover.paths.w1080,
          },
          {
            hid: "og:description",
            property: "og:description",
            content: this.selectedPost.content.replace(/![A-Z]+\((.*)\)/g, "").replace(/![A-Z]+\{(.*)\}/g, "").replace(/!END/g,""),
          },
        ],
      };
    },
};
</script>
  
<style scoped>
.photos {
    min-height: 300px;
    max-height: 1000px;
}
</style>
  