<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :items-per-page="1000"
      hide-default-footer
      :search="search"
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
      <template v-slot:item.filename="{ item }">
        <span v-if="item.show">{{ item.filename }}</span>
        <span v-else class="text-decoration-line-through">{{
          item.filename
        }}</span>
      </template>
      <!-- <template v-slot:item.dim="{ item }"
        >{{ item.width }} x {{ item.height }}
      </template> -->

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="d-block">
            <div
              :class="{
                expandedtext: $vuetify.breakpoint.mdAndUp,
                'pa-2': true,
              }"
            ></div>
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
        <v-icon small @click="$emit('delete', item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    tableData() {
      //Deep copy, very bad, but works haha
      let data = JSON.parse(JSON.stringify(this.photos))
      return data.map((photo) => {
        photo.locationTMP = this.getLocation(photo);
        photo.collectionsTMP = this.getAlbums(photo);
        return photo;
      });
    },
  },
  props: {
    value: Array,
  },
  data() {
    return {
      headers: [
        { text: "Photo", value: "photo" },
        { text: "Filename", value: "filename" },
        { text: "", value: "actions" },
        { text: "Date", value: "date", align: "center" },
        { text: "Lens shoot with", value: "lens", align: "center" },
        // { text: "width", value: "dim", align: "center" },
        { text: "Prints", value: "prints" },
        { text: "Location", value: "locationTMP" },
        { text: "Albums", value: "collectionsTMP" },

        { text: "", value: "data-table-expand" },
      ],
      expanded: [],
      selected: [],
      search: "",
    };
  },
  methods: {
    update: function () {
      this.$emit("input", this.selected);
    },
    getLocation: function (photo) {
      if (photo.location) return photo.location.title;
      return "";
    },
    getAlbums: function (photo){
      let string = "";
      photo.collections.forEach(element => {
        string += element.title;
        string += ", "
      });
      return string.slice(0,-2);
    }
  },

  created() {
    this.selected = this.value;
  },
};
</script>

<style scoped>
</style>
