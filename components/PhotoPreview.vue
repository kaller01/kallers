<template>
    <v-row class="my-2">
        <v-col cols="12" md="8">
            <v-img :src="photo.paths.w1080" :lazy-src="photo.paths.preview" @click="open" contain />
        </v-col>
        <v-col cols="12" md="4">
            <v-row>
                <v-col cols="auto">
                    <h2 class="spread pa-0 text-h5">
                        {{ photo.title || photo.filename }}
                    </h2>
                    <span class="caption">
                        {{ date }}
                    </span>

                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <span class="mr-10">
                        <v-icon>mdi-camera-iris</v-icon> {{ photo.aperture }}
                    </span>
                    <span>
                        <v-icon>mdi-alarm</v-icon> {{ photo.shutterspeed }} s
                    </span>
                </v-col>

                <v-col cols="12" class="text-body2" v-show="!$vuetify.breakpoint.smAndDown">
                    {{ description }}
                </v-col>
                <v-col cols="12" class="caption" v-show="$vuetify.breakpoint.smAndDown">
                    {{ description }}
                </v-col>

            </v-row>

        </v-col>
    </v-row>
</template>
  
<script>
export default {
    props: {
        photo: Object,
    },
    methods: {
        open: function () {
            window.open(this.photo.paths.original, '_blank')
        }
    },
    computed: {
        date() {
            return new Date(this.photo.date).toLocaleDateString("en-SE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            });
        },
        month() {
            return new Date(this.photo.date).toLocaleDateString("en-SE", {
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
  