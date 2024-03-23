import { defineStore } from 'pinia'

export const usePhotoStore = defineStore('photos', {
    state: () => ({
        photos: {},
        masonry: {}
    }),
    getters: {
        list(state) {
            return Object.values(state.photos);
        },
        byId(state) {
            return (id: string) => state.photos[id];
        },
        byIds(state) {
            return (ids: string[]) => ids.map(id => state.photos[id]);
        },
        byName(state) {
            return (filename: string) => state.list.find(p => p.filename === filename);
        }
    }
})
