<template>
  <v-data-table
    :headers="headers"
    :items="photos"
    :items-per-page="100"
    hide-default-footer
    show-expand
    item-key="_id"
  >
    <template v-slot:expanded-item="{ item }">
      <div class="d-block d-md-flex" >
        <div
          :class="{
            expandedtext: $vuetify.breakpoint.mdAndUp,
            'pa-2': true
          }"
        >
          <v-btn color="warning" @click="$emit('edit',item)" block>
            Edit
          </v-btn>
          <v-btn color="error" @click="$emit('delete',item)" block class="mt-2">
            Delete
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div>
          <img :src="item.paths.w400" style="width: 330px" /> <br />
          <v-chip
            class="ma-0"
            color="primary"
            :href="item.paths.original"
            target="_blank"
            >Original</v-chip
          >
          <v-chip
            class="ma-0"
            color="primary"
            :href="item.paths.w1080"
            target="_blank"
            >1080w</v-chip
          >
          <v-chip
            class="ma-0"
            color="primary"
            :href="item.paths.h1080"
            target="_blank"
            >1080h</v-chip
          >
          <v-chip
            class="ma-0"
            color="primary"
            :href="item.paths.w400"
            target="_blank"
            >400w</v-chip
          >
          <v-chip
            class="ma-0"
            color="primary"
            :href="item.paths.h400"
            target="_blank"
            >400h</v-chip
          >
        </div>
      </div>
    </template>
    <template v-slot:item.photo="{ item }">
      <img :src="item.paths.h400" style="height: 60px" />
    </template>
    <template v-slot:item.dim="{ item }"
      >{{ item.width }} x {{ item.height }}</template
    >
  </v-data-table>
</template>

<script>
export default {
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  data() {
    return {
      headers: [
        { text: "Photo", value: "photo" },
        { text: "Filename", value: "filename" },
        { text: "Date", value: "date", align: "center" },
        { text: "Lens shoot with", value: "lens", align: "center" },
        { text: "width", value: "dim", align: "center" }
      ]
    };
  },
  methods: {

  }
};
</script>

<style></style>
