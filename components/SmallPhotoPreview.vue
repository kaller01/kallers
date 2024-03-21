<script>
export default {
  props: {
    photo: Object,
    location: String,
    text: String,
  },
  setup(props) {
    const open = () => {
      window.open(props.photo.paths.original, '_blank');
    };

    const date = computed(() => {
      return new Date(props.photo.date).toLocaleDateString("sv-SE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    });

    const month = computed(() => {
      return new Date(props.photo.date).toLocaleDateString("sv-SE", {
        month: "long",
      });
    });

    const description = computed(() => {
      return (
        props.photo.description ||
        (props.photo.location &&
          `Photograph ${props.photo.filename} was photographed in ${props.photo.location.title} with a ${props.photo.lens} during ${month.value}.`) ||
        `Photograph ${props.photo.filename} was photographed during ${month.value} with a ${props.photo.lens}.`
      );
    });

    return {
      open,
      date,
      month,
      description,
    };
  },
};
</script>

<template>
  <div>
    <v-row justify="start" no-gutters>
      <v-col cols="5">
        <v-card :to="localePath('/photography/' + photo.filename.replace('.jpg', '').replace('.JPG', ''))">
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

<style></style>