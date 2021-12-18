<template>
  <div>
    <transition name="fade">
      <photo-grid
        :masonry="masonry[3]"
        v-show="loadingDone && $vuetify.breakpoint.xlOnly"
      ></photo-grid>
    </transition>
    <transition name="fade">
      <photo-grid
        :masonry="masonry[2]"
        v-show="loadingDone && $vuetify.breakpoint.lgOnly"
      ></photo-grid>
    </transition>
    <transition name="fade">
      <photo-grid
        :masonry="masonry[1]"
        v-show="loadingDone && $vuetify.breakpoint.mdOnly"
      ></photo-grid>
    </transition>
    <transition name="fade">
      <photo-grid
        :masonry="masonry[0]"
        v-show="loadingDone && $vuetify.breakpoint.smAndDown"
      ></photo-grid>
    </transition>
  </div>
</template>

<script>
export default {
  loading: false,
  async middleware({ store, route, app, $device }) {
    const photos = (await app.$axios.get("/api/photos/masonry/1")).data;
    store.commit("SET_MASONRY", photos);
  },
  computed: {
    masonry() {
      return this.$store.state.masonry;
    },
    size() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 0;
        case "sm":
          return 0;
        case "md":
          return 1;
        case "lg":
          return 2;
        case "xl":
          return 3;
      }
    },
  },
  data() {
    return {
      photos: [],
      xl: false,
      lg: this.$device.isDesktop,
      md: this.$device.isTablet,
      sm: this.$device.isMobile,
      loadingDone: false,
    };
  },
  methods: {
    resize() {},
  },
  mounted() {
    this.loadingDone = true;
  },
};
</script>

<style scoped>
</style>
