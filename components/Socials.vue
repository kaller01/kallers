<template>
  <v-row justify="center">
    <v-tooltip bottom v-for="icon in icons" :key="icon.link">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-4 white--text"
          :href="icon.link"
          target="_blank"
          icon
          v-on="on"
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ icon.type }}</span>
    </v-tooltip>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          icon: "mdi-instagram",
          text: "kallercreations",
          link: "https://www.instagram.com/kallercreations/",
          color: "purple darken-1",
          type: "Instagram",
        },
        {
          icon: "mdi-email-outline",
          text: "fotograf@kallers.se",
          link: "mailto:fotograf@kallers.se",
          color: "amber darken-1",
          type: "Email",
        },
        {
          icon: "mdi-facebook",
          text: "Kaller Creations",
          link: "https://www.facebook.com/kallercreations/",
          color: "primary",
          type: "Facebook",
        },
        {
          icon: "mdi-youtube",
          text: "Martin Kaller",
          link: "https://www.youtube.com/channel/UCOzKsFDGejQsLdklgMvm72A?view_as=subscriber",
          color: "red",
          type: "Youtube",
        },
        {
          icon: "mdi-google-maps",
          text: "Local guide",
          link: "https://www.google.se/maps/contrib/106633097459000923158",
          color: "green darken-1",
          type: "Local guide",
        },
      ],
    };
  },
};
</script>

<style>
</style>