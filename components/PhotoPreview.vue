<script setup>
const props = defineProps(['photo'])
const photo = computed(() => props.photo);
const open = () => {
    window.open(photo.paths.original, '_blank');
};

const date = getDateString(photo.value);
const month = getMonthString(photo.value);
const description = getPhotoDescription(photo.value);

const display = ref(useDisplay());

</script>


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

                <v-col cols="12" class="text-body2" v-if="!display.smAndDown">
                    {{ description }}
                </v-col>
                <v-col cols="12" class="caption" v-if="display.smAndDown">
                    {{ description }}
                </v-col>

            </v-row>

        </v-col>
    </v-row>
</template>