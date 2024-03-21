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
let tab = ref(route.path);
let drawer = ref(false);

</script>

<template>
    <v-app theme="dark">
        <v-app-bar height="64" fixed class="hidden-sm-and-down darken">
            <v-toolbar-title class="font-weight-light">Martin Kaller</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-tabs centered grow height="64" v-model="tab">
                    <v-tab v-for="nav in navs" :to="localePath(nav.to)" nuxt :value="nav.to" :key="nav.to" class="white--text">
                        {{ $t(nav.name) }}</v-tab>
                </v-tabs>
            </v-toolbar-items>
        </v-app-bar>
        <v-app-bar fixed :hide-on-scroll="false" height="32" class="hidden-md-and-up">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="pr-2">Martin Kaller</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" temporary>
            <!-- <v-list nav>
                <v-list-item-group>
                    <v-list-item v-for="nav in navs" :to="localePath(nav.to)" :key="nav.to">
                        <v-list-item-title class="title font-weight-light">{{
                    $t(nav.name)
                }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list> -->
        </v-navigation-drawer>
        <v-main>
            <!-- <div class="hidden-sm-and-down" style="height: 64px;"></div> -->
            <!-- <div class="hidden-md-and-up" style="height: 32px;"></div> -->
            <v-container fluid pa-0>
                <keep-alive>
                    <slot />
                </keep-alive>
            </v-container>
        </v-main>

        <v-footer padless class="mt-12 d-flex justify-center darken">
            <v-card flat tile class="white--text pb-1 text-center">
                <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
                <nuxt-link :to="switchLocalePath('sv')">Swedish</nuxt-link>
                <v-card-text class="pb-4">
                    <!-- <socials></socials> -->
                </v-card-text>
                <v-card-text class="white--text pt-0 pb-9">{{
                    $t("footer.about")
                    }}</v-card-text>
            </v-card>
        </v-footer>
    </v-app>

</template>

<style>
.darken {
    /* background: #1e1e1e !important; */
}

.navDrawer {
    position: fixed !important;
}

.nav-spacer {
    height: 64px;
}

.v-list-item-title {
    color: red !important;
}

body::-webkit-scrollbar {
    width: 3px;
}

body::-webkit-scrollbar * {
    background: transparent;
}

body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.8) !important;
}

/* body {
  background-color: #383838;
}
#app {
  background-color: #383838;
} */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}

a {
    color: #58a6ff;
}
</style>
