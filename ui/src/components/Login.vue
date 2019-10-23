<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                      icon large
                      target="_blank"
                      v-on="on">
                    <v-icon>mdi-lock-question</v-icon>
                  </v-btn>
                </template>
                <span>Forgot Password?</span>
              </v-tooltip>
            </v-toolbar>
            <v-form @submit.prevent="login">
              <v-card-text>
                <v-text-field
                    :rules="emailRules"
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    required
                    type="text"
                    v-model="email"
                ></v-text-field>

                <v-text-field
                    :append-icon="password_visible? 'visibility_off' : 'visibility'"
                    :rules="passwordRules"
                    :type="password_visible? 'text' : 'password'"
                    @click:append="password_visible = !password_visible"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    required
                    v-model="password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <span>
                  By signing in you accept all <router-link to="/terms">Terms and Conditions</router-link>
                </span>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="px-5" type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'Login',
    props: {
      source: String,
    },
    data: () => ({
      email: '',
      password: '',
      password_visible: false,
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
    }),
    methods: {
      login() {
        console.log('Hello')
      }
    },
  }
</script>

<style scoped>
  #app {
    background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
    background-size: cover;
    overflow: hidden;
  }

  .loginOverlay {
    background: rgba(33, 150, 243, 0.3);
  }

  .photoCredit {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
</style>
