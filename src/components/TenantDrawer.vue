<template>
  <v-sheet class="ma-2 pa-2 rounded-lg">
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" rounded="xl" :to="item.to">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-btn block @click="logoutControl"><v-icon>mdi-power-settings</v-icon>Logout</v-btn>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { text: "Dashboard", icon: "mdi-view-dashboard", to: "tenant_dashboard" },
        { text: "Subsidiaries", icon: "mdi-office-building", to: "subsidiary_page" },
        { text: "App User", icon: "mdi-account-multiple-outline", to: "app_user" },
        { text: "Settings", icon: "mdi-cog", to: "tenant_setting" },

      ],
    }
  },
  methods: {
    logoutControl() {
      this.$store
        .dispatch("logout").then(() => {
          this.$store.commit("resetState");
          this.$router.push("/");
        })
        .catch((err) => {
          console.error("Error logging out:", err);
        });
    },
  }
}
</script>