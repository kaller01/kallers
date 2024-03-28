<script setup>
import Navbar from '~/components/Navbar.vue';

const localePath = useLocalePath()

const display = ref(useDisplay());

</script>

<template>
    <v-app>
        <slot name="header">

        </slot>
        <div class="background">
            <Navbar></Navbar>
            <v-main class="pa-lg-12 pa-2">
                <keep-alive>
                    <slot />
                </keep-alive>
            </v-main>
        </div>

        <v-footer padless class="pa-0 pt-12 d-flex justify-center darken elevation-5">
            <v-card tile class="white--text pb-1 text-center elevation-5">
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
body::-webkit-scrollbar {
    width: 3px;
}

body::-webkit-scrollbar * {
    background: transparent;
}

body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.8) !important;
}

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

.background {
    background: white;
    z-index: 1;
    position: relative;
}

a {
    color: #58a6ff;
}
</style>
