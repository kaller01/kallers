<template>
  <div>
    <v-row>
      <v-col cols="4"> </v-col>
      <v-col cols="8">
        <v-spacer></v-spacer>
        <h1 class="display-3 text-md-right">
          {{ photos.length }} Photos in Database
        </h1>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text class="display-2">Add photo to Database</v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col lg="9" cols="12">
                  <v-file-input multiple @change="fileChange"></v-file-input>
                </v-col>
                <v-col lg="3" cols="12">
                  <v-btn x-large @click="uploadAll" color="primary"
                    >Upload photo</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="photos"
            :items-per-page="100"
            hide-default-footer
            show-expand
            item-key="_id"
          >
            <template v-slot:expanded-item="{ item }">
              <div class="d-block d-md-flex" style="width: 1000px">
                <div
                  :class="{
                    expandedtext: $vuetify.breakpoint.mdAndUp,
                    'pa-2': true
                  }"
                >
                  <v-btn color="error" @click="deletePhoto(item.filename)">
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
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-for="snackbar in snackbars"
      v-bind:key="snackbar.text"
      v-model="snackbar.show"
      :timeout="2000"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  data() {
    return {
      files: [],
      snackbars: [],
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
    fileChange(files) {
      console.log(files);
      console.log(this);
      this.files = files;
    },
    photoUpload(file) {
      if (file) {
        const form = new FormData();
        form.append("photo", file);
        fetch("/api/photos", {
          method: "POST",
          body: form
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.addSnackbar(data.filename + " has been uploaded", "primary");
          });
      }
    },
    uploadAll() {
      this.addSnackbar("Uploading files", "warning");
      this.files.forEach(file => {
        this.photoUpload(file);
      });
    },
    addSnackbar(text, color) {
      this.snackbars.push({
        text,
        color,
        show: true
      });
    },
    deletePhoto(filename) {
      axios.delete("/api/photos/" + filename);
      this.addSnackbar("Deleted "+filename, "error");
    }
  }
};
</script>

<style scoped></style>
