<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="headline">{{ post.title }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col><v-row>
                                <v-col cols="12">
                                    <v-text-field label="Title" v-model="post.title"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Link" v-model="post.link"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Date" v-model="post.date"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <div v-for="content in post.contents">
                                        <div v-if="content.type === 'MARKDOWN'">
                                            <v-textarea v-model="content.body" label="Markdown"></v-textarea>
                                        </div>
                                        <div v-if="content.type === 'TIMELINE'">
                                            <h2>Timeline</h2>
                                            <div v-for="event in content.events" class="pl-10">
                                                <v-text-field label="Location" v-model="event.location"></v-text-field>
                                                <v-text-field label="Date" v-model="event.date"></v-text-field>
                                                <v-textarea v-model="event.body" label="Location body"></v-textarea>
                                            </div>
                                            <v-btn @click="removeEvent">-</v-btn>
                                            <v-btn @click="addEvent">+</v-btn>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="$emit('delete', post)">
                    Delete
                </v-btn>
                <v-btn color="blue darken-1" text @click="$emit('save', post)">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
  
<script>
import ArrayEditor from "./ArrayEditor.vue";
import JsonEditor from './JsonEditor.vue';
export default {
    components: { ArrayEditor, JsonEditor },
    props: {
        post: Object,
    },
    methods: {
        addEvent: function () {
            this.post.contents.find(c => c.type === 'TIMELINE').events.push({})
        },
        removeEvent: function () {
            this.post.contents.find(c => c.type === 'TIMELINE').events.pop();
        }
    }
};
</script>
  
<style></style>
  