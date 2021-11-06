<template>
  <v-app dark>
    <v-app-bar height="64" fixed class="hidden-sm-and-down darken">
      <v-toolbar-title>Kaller Creations</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-tabs centered grow height="64" v-model="tab">
          <v-tab
            v-for="nav in navs"
            :to="localePath(nav.to)"
            :key="nav.to"
            class="white--text"
            nuxt
          >
            {{ $t(nav.name) }}</v-tab
          >
        </v-tabs>
        <!-- <v-btn to="/" text>Portfolio</v-btn>
        <v-btn to="/photography" text>Photography</v-btn>
        <v-btn to="/locations" text>Locations</v-btn>
        <v-btn to="/contact" text>Contact</v-btn>
        <v-btn to="/admin" text>Dashboard</v-btn>-->
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar
      fixed
      :hide-on-scroll="false"
      height="80"
      class="hidden-md-and-up"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="pr-2">Kaller Creations</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav>
        <v-list-item-group>
          <v-list-item
            v-for="nav in navs"
            :to="localePath(nav.to)"
            :key="nav.to"
          >
            <v-list-item-title class="title font-weight-light">{{
              $t(nav.name)
            }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- <template v-slot:append>
        <div class="pa-10">
          <v-btn block>Logout</v-btn>
        </div>
      </template>-->
    </v-navigation-drawer>
    <!-- <div class="navspacer"></div> -->
    <v-main>
      <v-container>
        <div class="nav-spacer"></div>
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-container>
    </v-main>

    <v-footer padless class="mt-12 d-flex justify-center darken">
      <v-card flat tile class="white--text pb-1 text-center">
        <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
        <nuxt-link :to="switchLocalePath('sv')">Swedish</nuxt-link>
        <v-btn @click="test">
          test
        </v-btn>
        <v-card-text class="pb-2">
          <v-tooltip top v-for="icon in icons" :key="icon.link">
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
        </v-card-text>
        <v-card-text class="white--text pt-0 pb-9">{{
          $t("footer.about")
        }}</v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    test() {
      console.log(this.photos);
    }
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  data() {
    return {
      drawer: false,
      start: false,
      tab: "//contact",
      icons: [
        {
          icon: "mdi-instagram",
          text: "kallercreations",
          link: "https://www.instagram.com/kallercreations/",
          color: "purple darken-1",
          type: "Instagram"
        },
        {
          icon: "mdi-email-outline",
          text: "fotograf@kallers.se",
          link: "mailto:fotograf@kallers.se",
          color: "amber darken-1",
          type: "Email"
        },
        {
          icon: "mdi-facebook",
          text: "Kaller Creations",
          link: "https://www.facebook.com/kallercreations/",
          color: "primary",
          type: "Facebook"
        },
        {
          icon: "mdi-youtube",
          text: "Martin Kaller",
          link:
            "https://www.youtube.com/channel/UCOzKsFDGejQsLdklgMvm72A?view_as=subscriber",
          color: "red",
          type: "Youtube"
        },
        {
          icon: "mdi-google-maps",
          text: "Local guide",
          link: "https://www.google.se/maps/contrib/106633097459000923158",
          color: "green darken-1",
          type: "Local guide"
        }
      ],
      navs: [
        // {
        //   name: "navs.portfolio",
        //   to: "/"
        // },
        {
          name: "navs.photography",
          to: "/photography"
        },
        {
          name: "navs.locations",
          to: "/locations"
        },
        // {
        //   name: "navs.contact",
        //   to: "/contact"
        // },
        // {
        //   name: "navs.prints",
        //   to: "/prints"
        // },
        {
          name: "navs.dashboard",
          to: "/dashboard"
        }
      ]
    };
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true });
  },
  created() {
    this.tab = "/" + this.$nuxt.$route.path;
  }
};
</script>

<style>
.darken {
  background: #1e1e1e !important;
}

.navDrawer {
  position: fixed !important;
}

.nav-spacer {
  height: 64px;
}

.v-list-item-title {
  color: red !important;
}
body::-webkit-scrollbar {
  width: 3px;
}
body::-webkit-scrollbar * {
  background: transparent;
}
body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.8) !important;
}
/* body {
  background-color: #383838;
}
#app {
  background-color: #383838;
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
