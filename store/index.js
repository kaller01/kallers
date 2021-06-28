export const state = () => ({
  photos: [],
  photo: {},
  locations: [],
  location: {},
  collections: [],
});

export const mutations = {
  SET_PHOTOS(state, value) {
    state.photos = value;
  },
  SET_PHOTO(state, value) {
    state.photo = value;
  },
  SET_LOCATIONS(state, value) {
    state.locations = value;
  },
  SET_LOCATION(state, value) {
    state.location = value;
  },
  SET_COLLECTIONS(state, value) {
    state.collections = value;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    const promises = [dispatch("getPhotos"), dispatch("getLocations"), dispatch("getCollections")];
    await Promise.all(promises);
  },
  async getPhotos({ commit }) {
    //Nuxt axios make magic with internal call
    const response = await this.$axios.get("/api/photos");
    commit("SET_PHOTOS", response.data);
  },
  async getLocations({ commit }) {
    const response = await this.$axios.get("/api/locations");
    commit("SET_LOCATIONS", response.data);
  },
  async getCollections({ commit }) {
    const response = await this.$axios.get("/api/collections");
    commit("SET_COLLECTIONS", response.data);
  },
};
