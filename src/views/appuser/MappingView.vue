<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Mapping</h1>
        <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-0" cols="2">
                <SideBar />
            </v-col>
            <v-col md="4">
                <v-card class="pa-5 ma-2">
                    <h3>Select Trial Balance</h3>
                    <v-sheet height="250" class="d-flex align-center justify-center">
                        <v-file-input label="Upload Trial Balance" show-size></v-file-input>
                        
                    </v-sheet>
                    
                </v-card>
            </v-col>
            <v-col md="4">
                <v-card class="pa-5 ma-2">
                    <h3>Select Trial Balance</h3>
                    <v-sheet height="250" class="d-flex align-center justify-center">
                        <v-file-input label="Upload Chart of Account" show-size></v-file-input>
                        
                    </v-sheet>
                    
                </v-card>
            </v-col>
            <v-col md="2">
                <v-card class="pa-5 ma-2 d-flex">
                    <v-btn color="success" size="small" class="ma-1">Next <v-icon>mdi-chevron-right</v-icon> </v-btn>
                    <v-btn color="error" size="small" class="ma-1">Cancel <v-icon>mdi-close</v-icon></v-btn>
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