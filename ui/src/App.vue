<template>
  <v-app>
    <v-app-bar app color="#0E67CA">
      <v-toolbar-title class="headline text-uppercase white--text">
        <span>Smart</span>
        <span class="font-weight-light"> DUSTBIN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text target="_blank">
        <span class="mr-2 white--text" @click="logoutUser()">L<span class="text-lowercase">ogout</span></span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {}
    },
    methods: {
      logoutUser() {
        localStorage.setItem('token', null)
        this.$router.push('/login')
      }
    }
  };
</script>
