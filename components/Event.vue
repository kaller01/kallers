<template>
  <v-container class="mt-12">
    <!-- <div class="mt-10" style="width: 300px;"> -->
    <v-row justify="center">
      <nuxt-link :to="localePath('/newsletter')" style="text-decoration: none; color: inherit;">
        <div class="rounded outline ma-2">
          <v-row class="px-5 py-3">
            <v-icon class="pr-2">mdi-post-outline</v-icon>
            <typography>Read lastest newsletter</typography>
          </v-row>
        </div>
      </nuxt-link>
    </v-row>
    <v-row justify="center">
      <nuxt-link :to="localePath('/photography')" style="text-decoration: none; color: inherit;">
        <div class="rounded outline ma-2">
          <v-row class="px-5 py-3">
            <v-icon class="pr-2">mdi-image</v-icon>
            <typography>See latest photography</typography>
          </v-row>
        </div>
      </nuxt-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style>
.outline {
  border: 2px solid white;
}
</style>