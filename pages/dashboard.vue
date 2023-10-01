<template>
  <div>
    <v-row class="pa-4">
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
                  <v-btn x-large block @click="uploadAll" color="primary">Upload photos</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <location-table @edit="editLocation"></location-table>
          <v-btn x-large block @click="addLocationDialog = true" color="primary">Add location
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <collection-table @edit="editCollection"></collection-table>
          <v-btn x-large block @click="collectionDialog = true" color="primary">Add collection
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <post-table @edit="editPost"></post-table>
          <v-btn x-large block @click="newPost" color="primary">Add Post
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <PhotoTable @delete="deletePhoto" @edit="openEditor" v-model="selectedPhotos"></PhotoTable>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-for="snackbar in snackbars" v-bind:key="snackbar.text + new Date().getTime()" v-model="snackbar.show"
      :timeout="2000" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>

    <v-dialog v-model="dialog" persistent max-width="900px">
      <PhotoEditor :photo="selectedPhoto" @close="dialog = false" @update="updatePhoto"></PhotoEditor>
    </v-dialog>

    <v-dialog v-model="addLocationDialog" max-width="900px">
      <location-editor v-if="addLocationDialog" @close="close" @save="saveLocation" @delete="deleteLocation"
        :location="selectedLocation"></location-editor>
    </v-dialog>

    <v-dialog v-model="collectionDialog" max-width="900px">
      <collection-editor :collection="selectedCollection" @close="close" @delete="deleteCollection"
        @save="saveCollection">
      </collection-editor>
    </v-dialog>

    <v-dialog v-model="postDialog">
      <post-editor :post="selectedPost" @save="savePost" @delete="deletePost"></post-editor>
    </v-dialog>

    <div class="hover" v-show="selectedPhotos.length > 0">
      <v-speed-dial open-on-hover>
        <template v-slot:activator>
          <v-btn color="primary" dark fab large>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-btn fab dark small color="primary" @click="selectedLocationsDialog = true">
          <v-icon>mdi-map-marker-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="error">
          <v-icon>mdi-map-marker-remove</v-icon>
        </v-btn>
        <v-btn fab dark small color="primary" @click="selectedPhotosDialog = true">
          <v-icon>mdi-database-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="error">
          <v-icon>mdi-database-remove</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>

    <v-dialog v-model="selectedPhotosDialog" width="600px">
      <div>
        <v-card width="600px">
          <v-card-text>
            <v-select item-text="title" item-value="_id" :items="collections" label="Collections" multiple
              v-model="selectedCollections"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="selectedPhotosDialog = false" text>
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="applyCollections">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>

    <v-dialog v-model="selectedLocationsDialog" width="600px">
      <div>
        <v-card width="600px">
          <v-card-text>
            <v-select item-text="title" item-value="_id" :items="locations" label="Locations"
              v-model="selectedLocations"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="selectedLocationsDialog = false" text>
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="applyLocations">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import PhotoTable from "@/components/PhotoTable";
import PhotoEditor from "~/components/PhotoEditor.vue";
import LocationEditor from "~/components/LocationEditor.vue";
import CollectionEditor from "~/components/CollectionEditor.vue";
import CollectionTable from "~/components/CollectionTable.vue";
import PostTable from '~/components/PostTable.vue';
import PostEditor from '~/components/PostEditor.vue';

export default {
  components: {
    PhotoTable,
    PhotoEditor,
    LocationEditor,
    CollectionEditor,
    CollectionTable,
    PostTable,
    PostEditor,
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
    locations() {
      return this.$store.state.locations;
    },
    collections() {
      return this.$store.state.collections;
    },
    posts() {
      return this.$state.state.posts;
    }
  },
  data() {
    return {
      files: [],
      snackbars: [],
      dialog: false,
      addLocationDialog: false,
      collectionDialog: false,
      selectedPhoto: {},
      selectedLocation: {},
      selectedCollection: {},
      selectedCollections: [],
      selectedPhotos: [],
      selectedLocations: {},
      selectedLocationsDialog: false,
      selectedPhotosDialog: false,
      selectedPost: {},
      postDialog: false
    };
  },
  methods: {
    fileChange(files) {
      this.files = files;
    },
    photoUpload(file) {
      if (file) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.auth);
        const form = new FormData();
        form.append("photo", file);
        fetch("/api/photos", {
          method: "POST",
          body: form,
          headers: myHeaders,
        })
          .then((res) => res.json())
          .then((data) => {
            this.addSnackbar(data.filename + " has been uploaded", "primary");
            this.$store.dispatch("getPhotos");
          });
      }
    },
    openEditor(photo) {
      this.selectedPhoto = { ...photo };
      this.dialog = true;
    },
    uploadAll() {
      this.addSnackbar("Uploading files", "warning");
      this.files.forEach((file) => {
        this.photoUpload(file);
      });
    },
    addSnackbar(text, color) {
      this.snackbars.push({
        text,
        color,
        show: true,
      });
    },
    deletePhoto(photo) {
      this.$axios.delete("/api/photos/" + photo._id);
      this.addSnackbar("Deleted " + photo.filename, "error");
      this.$store.dispatch("getPhotos");
    },
    async updatePhoto(photo) {
      this.addSnackbar("Updating " + photo.filename, "warning");
      await this.$axios.patch("/api/photos/" + photo._id, photo);
      this.addSnackbar("Updated " + photo.filename, "success");
      this.dialog = false;
      this.$store.dispatch("getPhotos");
    },
    saveLocation(location) {
      if (location._id) this.updateLocation(location);
      else this.addLocation(location);
    },
    async addLocation(location) {
      this.addLocationDialog = false;
      this.addSnackbar("Adding location...", "warning");
      await this.$axios.post("/api/locations/", location);
      this.addSnackbar("Added location", "success");
      this.$store.dispatch("getLocations");
    },
    async editLocation(location) {
      const fullLocation = await this.$axios.get(
        "/api/locations/" + location._id
      );
      this.selectedLocation = fullLocation.data;
      this.addLocationDialog = true;
      this.$store.dispatch("getLocations");
    },
    async updateLocation(location) {
      this.selectedLocation = {};
      this.addLocationDialog = false;
      this.addSnackbar("Updating location...", "warning");
      await this.$axios.patch("/api/locations/" + location._id, location);
      this.addSnackbar("Updated location", "success");
      this.$store.dispatch("getLocations");
    },
    async deleteLocation(location) {
      this.addLocationDialog = false;
      this.addSnackbar("Deleting location...", "warning");
      await this.$axios.delete("/api/locations/" + location._id);
      this.addSnackbar("Deleted location", "error");
      this.$store.dispatch("getLocations");
    },
    saveCollection(collection) {
      this.selectedCollection = {};
      if (collection._id) this.updateCollection(collection);
      else this.addCollection(collection);
    },
    async addCollection(collection) {
      this.collectionDialog = false;
      this.addSnackbar("Adding collection...", "warning");
      await this.$axios.post("/api/collections/", collection);
      this.addSnackbar("Added collection", "success");
      this.$store.dispatch("getCollections");
    },
    async editCollection(collection) {
      const fullCollection = await this.$axios.get(
        "/api/collections/" + collection._id
      );
      this.selectedCollection = fullCollection.data;
      this.collectionDialog = true;
      this.$store.dispatch("getCollections");
    },
    async updateCollection(collection) {
      this.collectionDialog = false;
      this.addSnackbar("Updating collection...", "warning");
      await this.$axios.patch("/api/Collections/" + collection._id, collection);
      this.addSnackbar("Updated collection", "success");
      this.$store.dispatch("getCollections");
    },

    async deleteCollection(collection) {
      this.collectionDialog = false;
      this.addSnackbar("Deleting collection...", "warning");
      await this.$axios.delete("/api/collections/" + collection._id);
      this.addSnackbar("Deleted collection", "error");
      this.$store.dispatch("getCollections");
    },
    newPost() {
      this.selectedPost = {
        contents: [
          {
            type: "MARKDOWN",
            body: ""
          },
          {
            type: "TIMELINE",
            events: [
              {}
            ]
          }
        ]
      }
      this.postDialog = true;
    },
    savePost(post) {
      this.selectedPost = {};
      if (post._id) this.updatePost(post);
      else this.addPost(post);
    },
    async editPost(post) {
      const response = await this.$axios.get(
        "/api/posts/" + post._id
      );
      this.selectedPost = response.data;
      this.postDialog = true;
    },
    async updatePost(post) {
      this.selectedPost = {};
      this.postDialog = false;
      this.addSnackbar("Updating post...", "warning");
      await this.$axios.patch("/api/posts/" + post._id, post);
      this.addSnackbar("Updated post", "success");
      this.$store.dispatch("getPosts");
    },
    async addPost(post) {
      this.selectedPost = {};
      this.postDialog = false;
      this.addSnackbar("Updating post...", "warning");
      await this.$axios.post("/api/posts/", post);
      this.addSnackbar("Updated post", "success");
      this.$store.dispatch("getPosts");
    },
    async deletePost(post) {
      this.postDialog = false;
      this.addSnackbar("Deleting post...", "warning");
      await this.$axios.delete("/api/posts/" + post._id);
      this.addSnackbar("Deleted post", "error");
      this.$store.dispatch("getPosts");
    },
    async applyCollections() {
      this.selectedPhotos.forEach((photo) => {
        photo.collections = photo.collections.concat(this.selectedCollections);
        this.updatePhoto(photo);
      });
      this.selectedPhotosDialog = false;
    },
    async removeCollections() {
      this.selectedPhotos.forEach((photo) => {
      });
      this.selectedPhotosDialog = false;
    },
    async applyLocations() {
      this.selectedPhotos.forEach((photo) => {
        photo.location = this.selectedLocations;
        this.updatePhoto(photo);
      });

      this.selectedLocationsDialog = false;
    },
    close() {
      this.selectedLocationsDialog = false;
      this.selectedPhotosDialog = false;
      this.addLocationDialog = false;
      this.collectionDialog = false;
      this.dialog = false;
      this.selectedPhoto = {};
      this.selectedLocation = {};
      this.selectedCollection = {};
      this.selectedCollections = [];
      this.selectedLocations = [];
    },
  },
  mounted() {
    if (localStorage.auth) {
      this.$axios.setHeader("Authorization", localStorage.auth);
    } else this.$router.push("/login");
  },
};
</script>

<style>
.hover {
  bottom: 10px;
  left: 95%;
  position: sticky;
  margin: 16px;
  width: 30px;
  height: 100px;
  display: flex;
  justify-content: center;
}
</style>
