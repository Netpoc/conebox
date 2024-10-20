<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Reports</h1>
        <v-row 
        class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5"
        no-gutters
        >
        <v-col class="flex-grow-0 flex-shrink-0" cols="2">
        <v-sheet class="ma-2 pa-2 rounded-lg">
          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="primary"
              rounded="xl"
              :to="item.to"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
        </v-row>
    </v-main>
</template>

<script>
import Nav from "../components/NavBar";

export default {
    components: {
        Nav
    },
    data () {
        return {
            items: [
        { text: "Dashboard", icon: "mdi-view-dashboard", to:"dashboard"},
        { text: "User Mangement", icon: "mdi-account-wrench-outline", to:"user_manager" },
        { text: "Reports", icon: "mdi-file-chart", to:"reports" },
        { text: "Settings", icon: "mdi-cog", to:"settings" },
        { text: "Logout", icon: "mdi-power-settings", to: "/" },
      ],
        }
    }
}
</script>