<template>
  <v-data-table
    :headers="headers"
    :items="locations"
    :items-per-page="100"
    hide-default-footer
    item-key="_id"
  >
    <template v-slot:item.edit="{ item }">
      <v-btn color="warning" @click="$emit('edit', item)">Edit</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  computed: {
    locations() {
      return this.$store.state.locations;
    }
  },
  data() {
    return {
      headers: [
        { text: "Title", value: "title" },
        { text: "Edit", value: "edit" }
      ]
    };
  },
  methods: {}
};
</script>

<style></style>
