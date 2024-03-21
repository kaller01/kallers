<script setup>
const route = useRoute()
const link = route.params.post;
const { data, pending, error, refresh } = await useFetch(`/api/posts/${link}`);
</script>

<template>
    <div>
        <v-container>
            <v-row justify="center" v-if="!pending">
                <v-col xl="8" lg="10" md="12">
                    <v-card class="pa-5 mb-3">
                        <Post :post="data.post"></Post>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
.photos {
    min-height: 300px;
    max-height: 1000px;
}
</style>