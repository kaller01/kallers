import axios from "axios";


export const state = () => ({
  photos: []
});

export const mutations = {
  SET_PHOTOS(state, photos) {
    state.photos = photos;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getPhotos');
  },
  async getPhotos({commit}) {
      //TODO make it use baseurl, should be easier?
      const photos = await axios.get("http://localhost:3000/api/photos");
      console.log(photos.data)
      commit('SET_PHOTOS', photos.data);
  }
};
