<template>
    <div>
        <h1 class="text-h2">{{ post.title }}</h1>
        <div v-for="content in splitLayout(post.content)">
            <post-render v-if="content.type === 'MARKDOWN'" :markdown="content.body" class="mb-2"></post-render>
            <timeline-item v-if="content.type === 'TIMELINE' && !$vuetify.breakpoint.smAndDown">
                <template v-slot:icon>
                    <nuxt-link :to="localePath('/locations/' + content.args[0])">
                        <v-icon class="pa-0">mdi-map-marker</v-icon></nuxt-link>
                </template>
                <template v-slot:date>
                    {{ content.args[1] }}
                </template>
                <template v-slot:content>
                    <h2>
                        {{ getLocation(content.args[0]).title }}
                    </h2>
                    <post-render :markdown="content.body"></post-render>
                </template>
            </timeline-item>
            <timeline-item-small v-if="content.type === 'TIMELINE' && $vuetify.breakpoint.smAndDown">
                <template v-slot:icon>
                    <nuxt-link :to="localePath('/locations/' + content.args[0])">
                        <v-icon class="pa-0" large>mdi-map-marker</v-icon></nuxt-link>
                </template>
                <template v-slot:content>
                    <h2 class="text-h3">
                        {{ getLocation(content.args[0]).title }}
                    </h2>
                    <post-render :markdown="content.body"></post-render>
                </template>
            </timeline-item-small>
            <small-photo-preview v-if="content.type === 'SPHOTO'" :photo="getPhoto(content.args[0])" :location="content.args[1]">
                <template v-slot:content>
                    <post-render :markdown="content.body"></post-render>
                </template>
            </small-photo-preview>
        </div>
    </div>
</template>
  
<script>
import TimelineItemSmall from './TimelineItemSmall.vue';
import SmallPhotoPreview from './SmallPhotoPreview.vue';
export default {
    components: { TimelineItemSmall, SmallPhotoPreview },
    computed: {
        locations() {
            return this.$store.state.locations;
        },
        photos() {
            return this.$store.state.photos;
        },
    },
    props: {
        post: Object,
    },
    methods: {
        getLocation: function (link) {
            return this.locations.find(x => x.link === link) || { title: link }
        },
        getPhoto: function (filename) {
            return this.photos.find(x => x.filename == filename) || false
        },
        splitLayout(input) {
            if(!input) return [];
            const sections = input.split(/(![A-Z]+\{.+\})|\!END/).filter(Boolean);

            const result = [];
            let currentCommand = null;
            let currentArgs = null;

            sections.forEach(section => {
                if (section.match(/![A-Z]+\{.+\}/)) {
                    const args = section.match(/\{(.*)\}/)[1].split(",")
                    const command = section.match(/!([A-Z]+)\{/)[1]
                    currentCommand = command;
                    currentArgs = args;
                    result.push({
                        type: command,
                        args,
                        body: "",
                    })
                }
                else if (currentCommand) {
                    result.find(x => x.type === currentCommand && x.args === currentArgs).body = section;
                    currentCommand = null;
                } else if (section !== '\n') {
                    result.push({
                        type: "MARKDOWN",
                        body: section
                    })
                }
            })
            return result;
        }
    }
};
</script>
  
<style></style>
  