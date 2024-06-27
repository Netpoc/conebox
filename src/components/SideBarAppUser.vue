<template>
    <v-sheet class="ma-2 pa-2 rounded-lg">
        <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" rounded="xl" :to="item.to">
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
    components: {
        
    },
    data() {
        return {
            items: [
                { text: "Dashboard", icon: "mdi-view-dashboard", to: "app_user_dashboard" },
                { text: "Trial Balance", icon: "mdi-file-compare", to: "trial_balance" },
                { text: "Charts of Account", icon: "mdi-cards-variant", to: "chart_of_account" },
                { text: "Journal", icon: "mdi-clipboard-text-multiple-outline", to: "journal" },
                { text: "Mapping", icon: "mdi-map-marker-distance", to: "mapping" },
                { text: "Settings", icon: "mdi-cog", to: "app_user_setting" },
                { text: "Logout", icon: "mdi-logout", to: "/" },
            ],
        }
    }
}
</script>