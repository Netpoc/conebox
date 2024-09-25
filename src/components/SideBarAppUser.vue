<template>
    <v-sheet class="ma-2 pa-2 rounded-lg">
        <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" rounded="xl" :to="item.to">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
            <v-btn block @click="logoutControl"><v-icon>mdi-power-settings</v-icon>Logout</v-btn>
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
                { text: "Mapping", icon: "mdi-map-marker-distance", to: "mapping" },
                { text: "FS Designer", icon: "mdi-vector-curve", to: "/journal" },
                { text: "Settings", icon: "mdi-cog", to: "app_user_setting" },
                
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