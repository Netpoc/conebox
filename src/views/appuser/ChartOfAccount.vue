<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Chart of Account</h1>
        <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-0" cols="2">
                <SideBar />
            </v-col>
            <v-col md="6">
                <v-card class="pa-5 ma-2">
                    <h3>Upload Chart of Account</h3>
                    <v-sheet height="250" class="d-flex align-center justify-center">
                        <v-file-input label="File input" show-size></v-file-input>
                        
                    </v-sheet>
                    <div class="justify-content-end">
                            <v-btn>Next </v-btn>
                        </div>
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
        SideBar,
    },
    data() {
        return {
            
        }
    }
}
</script>