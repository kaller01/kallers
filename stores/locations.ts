import { defineStore } from 'pinia'

export const useLocationStore = defineStore('locations', {
    state: () => ({
        locations: {}
    }),
    getters: {
        list(state) {
            return Object.values(state.locations);
        },
        byId(state) {
            return (id: string) => state.locations[id];
        },
        byName(state) {
            return (link: string) => state.list.find(p => p.link === link);
        },
        byPhoto(state) {
            return (photo: string) => !!photo.location ? state.locations[photo.location._id] : undefined;
        }
    }
})
