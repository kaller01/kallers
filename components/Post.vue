<template>
    <div>
        <h1>{{ post.title }}</h1>
        <div v-for="content in post.contents">
            <post-render v-if="content.type === 'MARKDOWN'" :markdown="content.body" class="mb-2"></post-render>
            <timeline v-if="content.type === 'TIMELINE' && !$vuetify.breakpoint.smAndDown">
                <timeline-item v-for="event in content.events">
                    <template v-slot:icon>
                        <nuxt-link :to="localePath('/locations/' + event.location)">
                            <v-icon class="pa-0">mdi-map-marker</v-icon></nuxt-link>
                    </template>
                    <template v-slot:date>
                        {{ event.date }}
                    </template>
                    <template v-slot:content>
                        <h2>
                            {{ getLocation(event.location) }}
                            <v-btn icon x-small><v-icon>mdi-open-in-new</v-icon></v-btn>
                        </h2>
                        <post-render :markdown="event.body"></post-render>
                    </template>
                </timeline-item>
            </timeline>
            <div v-if="content.type === 'TIMELINE' && $vuetify.breakpoint.smAndDown" v-for="event in content.events">
                <h2>
                    <v-icon class="pa-0">mdi-map-marker</v-icon> {{ getLocation(event.location) }} <span class="text-subtitle-1">({{ event.date
                    }})</span>
                </h2>
                <post-render :markdown="event.body"></post-render>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    computed: {
        locations() {
            return this.$store.state.locations;
        },
    },
    props: {
        post: Object,
    },
    methods: {
        getLocation: function (link) {
            return this.locations.find(x => x.link === link).title || link
        }
    }
};
</script>
  
<style></style>
  