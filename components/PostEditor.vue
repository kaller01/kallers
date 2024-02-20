<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="headline">{{ post.title }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-row>
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
                                    <v-select :items="post.photos" item-value="_id" label="Cover" v-model="post.cover">
                                        <template v-slot:selection="{ item }">
                                            <img :src="item.paths.preview" />{{ item.filename }}
                                        </template>
                                        <template v-slot:item="{ item }">
                                            <img :src="item.paths.preview" />{{ item.filename }}
                                        </template>
                                    </v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="post.content" label="Markdown" rows="16"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <div class="post-preview px-3" style="height: 70vh;">
                                <post :post="post" />
                            </div>
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
import Post from './Post.vue';
export default {
    components: { ArrayEditor, JsonEditor, Post },
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
  
<style scoped>
.post-preview {
    overflow: auto;
}
</style>
  