<script setup>
const store = useLocationStore();
</script>

<template>
    <v-container>
        <v-row :class="'justify-end'">
            <v-col :cols="12" :md="6" :lg="4" xl="3" v-for="location in store.list" v-bind:key="location._id">
                <LocationPreview :location="location" />
            </v-col>
        </v-row>
    </v-container>
    <JsonDebug :json="store.locations" />
</template>