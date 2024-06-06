<template>
    <Nav />
    <v-main>
      <h1 class="ma-5">Settings</h1>
      <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5"
        no-gutters>
        <v-col class="flex-grow-0 flex-shrink-0" md="2">
          <NavList />
        </v-col>
        <v-col class="flex-grow-1 flex-shrink-0"
          md="6"
          style="min-width: 100px; max-width: 100%">
          <v-sheet>
              
          </v-sheet>
        </v-col>
      </v-row>
    </v-main>
  </template>
  <script>
  import Nav from "../../components/NavBar";
  import NavList from "../../components/TenantDrawer";
  
  export default {
    name: "Settings",
    components: {
      Nav,
      NavList,
    },
  };
  </script>
  