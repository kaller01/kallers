<style>
body {
    margin: 0;
    background-color: #121212;
}
</style>

<template>
    <v-app theme="dark" class="ma-0 fill-height">
        <v-main class="ma-0 fill-height">
            <v-container fluid class="fill-height ma-0 pa-0">
                <keep-alive>
                    <slot />
                </keep-alive>
            </v-container>
        </v-main>
    </v-app>
</template>