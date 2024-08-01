<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Settings</h1>
        <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-0" cols="2">
                <SideBar />
            </v-col>
            <v-col md="6">
                <v-card class="pa-5 ma-3">
                    <h3>FsDesigner</h3>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
import Nav from "@/components/NavBar.vue"
import SideBar from "@/components/SideBarAppUser.vue"

export default {
    components: {
        Nav,
        SideBar
    },
    data() {
        return {
            items: [
                { text: "Dashboard", icon: "mdi-view-dashboard", to: "app_user_dashboard" },
                { text: "Trial Balance", icon: "mdi-file-compare", to: "trial_balance" },
                { text: "Charts of Account", icon: "mdi-cards-variant", to: "chart_of_account" },
                { text: "Journal", icon: "mdi-clipboard-text-multiple-outline", to: "journal" },
                { text: "Settings", icon: "mdi-cog", to: "app_user_setting" },
                { text: "Logout", icon: "mdi-logout", to: "/" },
            ],
        }
    }
}
</script>