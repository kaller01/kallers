<script setup>
const store = useAlbumStore();

</script>

<template>
    <v-container>
        <v-row :class="'justify-end'">
            <v-col :cols="12" :md="6" :lg="4" xl="3" v-for="album in store.list" v-bind:key="album._id" class="pa-3">
                <AlbumPreview :album="album" />
            </v-col>
        </v-row>
    </v-container>
    <JsonDebug :json="store.albums" />
</template>