<style>
body {
    margin: 0;
}
</style>

<template>
    <v-app class="ma-0 fill-height">
        <v-main class="ma-0 fill-height">
            <v-container fluid class="fill-height ma-0 pa-0">
                <keep-alive>
                    <slot />
                </keep-alive>
            </v-container>
        </v-main>
    </v-app>
</template>