<template>
    <div>
        <v-row justify="start" no-gutters>
            <v-col cols="3">
                <v-card :to="localePath('/photography/'+ photo.filename.replace('.jpg', '').replace('.jpg', '').replace('.JPG',''))">
                    <img :src="photo.paths.w400" width="100%" />
                </v-card>
            </v-col>
            <v-col class="pa-1">
                <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div>
                        <slot name="content"></slot>
                    </div>
                    <div>
                        <div>
                            <v-icon class="pa-0" small>mdi-calendar-today-outline</v-icon> {{ date }}
                        </div>
                        <div>
                            <v-icon class="pa-0" small>mdi-map-marker</v-icon> {{ location }}
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
export default {
    props: {
        photo: Object,
        location: String,
        text: String,
    },
    methods: {
        open: function () {
            window.open(this.photo.paths.original, '_blank')
        }
    },
    computed: {
        date() {
            return new Date(this.photo.date).toLocaleDateString("sv-SE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        },
        month() {
            return new Date(this.photo.date).toLocaleDateString("sv-SE", {
                month: "long",
            });
        },
        description() {
            return (
                this.photo.description ||
                (this.photo.location &&
                    `Photograph ${this.photo.filename} was photographed in ${this.photo.location.title} with a ${this.photo.lens} during ${this.month}.`) ||
                `Photograph ${this.photo.filename} was photographed during ${this.month} with a ${this.photo.lens}.`
            );
        },
    }
};
</script>
  
<style></style>
  