<template>
  <v-app>
    <v-app-bar app color="#AEB6BF">
      <v-toolbar-title class="headline text-uppercase">
        <span>Smart</span>
        <span class="font-weight-light"> DUSTBIN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text target="_blank">
        <span class="mr-2">Hello</span>
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
  data: () => ({
    //
  }),
};
</script>
