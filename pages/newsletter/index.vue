<template>
    <div>
        <v-container>
            <v-row justify="center">
                <v-col xl="8" lg="10" md="12">
                    <v-card class="pa-5 mb-3" v-for="post in posts">
                        <post :post="post" />
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


  