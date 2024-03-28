<script setup>
const localePath = useLocalePath()

const navs = [
    {
        name: "navs.portfolio",
        to: "/",
    },
    {
        name: "navs.newsletter",
        to: "/newsletter",
    },
    {
        name: "navs.photography",
        to: "/photography",
    },
    {
        name: "navs.locations",
        to: "/locations",
    },
    {
        name: "navs.album",
        to: "/albums",
    }
];

const route = useRoute();
let tab = useState(() => '/' + route.path.split('/')[1]);
let drawer = useState(() => false);
const display = ref(useDisplay());

</script>

<template>
    <div class="d-flex">
        <h2 v-if="display.mdAndUp" class="name px-4 text-h4"> Martin Kaller</h2>

        <v-spacer v-if="display.mdAndUp"></v-spacer>

        <v-tabs centered height="64" v-model="tab" show-arrows>
            <v-tab v-for="nav in navs" :to="localePath(nav.to)" nuxt :value="nav.to" :key="nav.to" class="white--text">
                {{ $t(nav.name) }}</v-tab>
        </v-tabs>
    </div>
</template>

<style scoped>
.name {
    height: 64;
    display: flex;
    align-items: center;
}
</style>
