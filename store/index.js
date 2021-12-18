export const state = () => ({
  photos: [],
  photo: {},
  locations: [],
  location: {},
  collection: {},
  collections: [],
  portfolio: [],
  masonry: [],
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
  SET_COLLECTION(state, value) {
    state.collection = value;
  },
  SET_COLLECTIONS(state, value) {
    state.collections = value;
  },
  SET_PORTFOLIO(state, value) {
    state.portfolio = value;
  },
  SET_MASONRY(state, value) {
    state.masonry = value;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    const promises = [
      dispatch("getPhotos"),
      dispatch("getLocations"),
      dispatch("getCollections"),
      dispatch("getPortfolio"),
      dispatch("getMasonry"),
    ];
    await Promise.all(promises);
  },
  async getPhotos({ commit }) {
    //Nuxt axios make magic with internal call
    console.log("Updating photos...");
    const response = await this.$axios.get("/api/photos");
    commit("SET_PHOTOS", response.data);
  },
  async getLocations({ commit }) {
    console.log("Updating locations...");
    const response = await this.$axios.get("/api/locations");
    commit("SET_LOCATIONS", response.data);
  },
  async getCollections({ commit }) {
    console.log("Updating collections...");
    const response = await this.$axios.get("/api/collections");
    commit("SET_COLLECTIONS", response.data);
  },
  async getPortfolio({ commit }) {
    console.log("Updating portfolio...");
    const response = await this.$axios.get("/api/collections/portfolio");
    commit("SET_PORTFOLIO", response.data.photos);
  },
  async getMasonry({ commit }) {
    console.log("Updating masonry...");
    const response = await this.$axios.get("/api/photos/masonry");
    commit("SET_MASONRY", response.data);
  },
};
