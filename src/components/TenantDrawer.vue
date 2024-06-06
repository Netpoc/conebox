<template>
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
</template>
<script>
export default {
    data () {
        return {
            items: [
                { text: "Dashboard", icon: "mdi-view-dashboard", to:"tenant_dashboard"},
                { text: "Subsidiaries", icon: "mdi-account-wrench-outline", to:"user_manager" },
                { text: "App User", icon: "mdi-file-chart", to:"reports" },
                { text: "Settings", icon: "mdi-cog", to:"settings" },
            ],
        }
    }
}
</script>