<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" dark>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Login"
                  v-model="username"
                  name="login"
                  prepend-icon="person"
                  type="text"
                  dark
                >
                  <template v-slot:prepend>
                    <v-icon>mdi-account-circle</v-icon>
                  </template>
                </v-text-field>

                <v-text-field
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  dark
                >
                  <template v-slot:prepend>
                    <v-icon>mdi-lock</v-icon>
                  </template>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "login",
  methods: {
    async login() {
      const data = {
        user: this.username,
        password: this.password
      };
      this.$axios.post("/api/auth", data).then(respone => {
        this.$axios.setHeader("Authorization", respone.data);
        this.$router.push(this.localePath("/dashboard/"));
      });
    }
  },
  data: () => ({
    password: "",
    username: ""
  })
};
</script>

<style scoped></style>
