import { defineStore } from 'pinia'

export const useAlbumStore = defineStore('albums', {
    state: () => ({
        albums: {}
    }),
    getters: {
        list(state) {
            return Object.values(state.albums);
        },
        byId(state) {
            return (id: string) => state.albums[id];
        },
        byName(state) {
            return (link: string) => state.list.find(p => p.link === link);
        },
        byPhoto(state) {
            return (photo: any) => photo.collections.map(c => state.albums[c._id]);
        }
    }
})
