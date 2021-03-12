export const state = () => ({
  photos: [],
  locations: []
});

export const mutations = {
  SET_PHOTOS(state, photos) {
    state.photos = photos;
  },
  SET_LOCATIONS(state, locations) {
    state.locations = locations;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    const promises = [dispatch("getPhotos"), dispatch("getLocations")];
    await Promise.all(promises);
  },
  async getPhotos({ commit }) {
    //Nuxt axios make magic with internal call
    const photos = await this.$axios.get("/api/photos");
    commit("SET_PHOTOS", photos.data);
  },
  async getLocations({ commit }) {
    const locations = await this.$axios.get("/api/locations");
    commit("SET_LOCATIONS", locations.data);
  }
};
