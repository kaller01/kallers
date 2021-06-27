<template>
  <v-data-table
    :headers="headers"
    :items="photos"
    :items-per-page="100"
    hide-default-footer
    show-select
    show-expand
    item-key="_id"
    :expanded.sync="expanded"
    @input="update"
    v-model="selected"
  >
    <template v-slot:item.photo="{ item }">
      <img :src="item.paths.h400" style="height: 60px" />
    </template>
    <template v-slot:item.dim="{ item }"
      >{{ item.width }} x {{ item.height }}</template
    >
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <div class="d-block">
          <div
            :class="{
              expandedtext: $vuetify.breakpoint.mdAndUp,
              'pa-2': true
            }"
          >
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
      </td>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="$emit('edit', item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="$emit('delete', item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  props: {
    value: Array
  },
  data() {
    return {
      headers: [
        { text: "Photo", value: "photo" },
        { text: "Filename", value: "filename" },
        { text: "", value: "actions"},
        { text: "Date", value: "date", align: "center" },
        { text: "Lens shoot with", value: "lens", align: "center" },
        { text: "width", value: "dim", align: "center" },
        
        { text: "", value: "data-table-expand" }
      ],
      expanded: [],
      selected: []
    };
  },
  methods: {
    update: function(){
      console.log(this.selected)
      this.$emit('input', this.selected)
    }
  },
  created() {
    this.selected = this.value;
  }
};
</script>

<style scoped>
</style>
