<template>
  <v-app dark class="ma-0 fill-height">
    <v-main class="ma-0 fill-height">
      <v-container fluid class="fill-height ma-0 pa-0">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
body {
  margin: 0;
  background-color: #121212;
}

.test {
  height: 100%;
}
</style>
