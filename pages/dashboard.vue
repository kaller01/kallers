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
      <v-col cols="12">
        <v-card>
          <v-card-text class="display-2">Add photo to Database</v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col lg="9" cols="12">
                  <v-file-input multiple @change="fileChange"></v-file-input>
                </v-col>
                <v-col lg="3" cols="12">
                  <v-btn x-large block @click="uploadAll" color="primary"
                    >Upload photos</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-btn x-large block @click="addLocationDialog = true" color="primary"
            >Add location
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <location-table @edit="editLocation"></location-table>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <PhotoTable @delete="deletePhoto" @edit="openEditor"></PhotoTable>
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

    <v-dialog v-model="dialog" persistent max-width="900px">
      <PhotoEditor
        :photo="selectedPhoto"
        @close="dialog = false"
        @update="updatePhoto"
      ></PhotoEditor>
    </v-dialog>

    <v-dialog v-model="addLocationDialog" max-width="900px">
      <location-editor
        @close="addLocationDialog = false"
        @save="saveLocation"
        :location="selectedLocation"
      ></location-editor>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import PhotoTable from "@/components/PhotoTable";
import PhotoEditor from "~/components/PhotoEditor.vue";
import LocationEditor from "~/components/LocationEditor.vue";

export default {
  components: {
    PhotoTable,
    PhotoEditor,
    LocationEditor
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    locations() {
      return this.$store.state.locations;
    }
  },
  data() {
    return {
      files: [],
      snackbars: [],
      dialog: false,
      addLocationDialog: false,
      selectedPhoto: {},
      selectedLocation: {}
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
    openEditor(photo) {
      this.selectedPhoto = { ...photo };
      this.dialog = true;
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
    deletePhoto(photo) {
      axios.delete("/api/photos/" + photo._id);
      this.addSnackbar("Deleted " + photo.filename, "error");
    },
    async updatePhoto(photo) {
      this.addSnackbar("Updating " + photo.filename, "warning");
      await this.$axios.patch("/api/photos/" + photo._id, photo);
      this.addSnackbar("Updated " + photo.filename, "success");
      this.dialog = false;
    },
    saveLocation(location) {
      if (location._id);
      else this.addLocation(location);
    },
    async addLocation(location) {
      this.addLocationDialog = false;
      this.addSnackbar("Adding location...", "warning");
      await this.$axios.post("/api/locations/", location);
      this.addSnackbar("Added location", "success");
    },
    async editLocation(location) {
      const fullLocation = await this.$axios.get(
        "/api/locations/" + location._id
      );
      this.selectedLocation = fullLocation.data;
      this.addLocationDialog = true;
    }
  }
};
</script>

<style scoped></style>
