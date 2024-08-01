<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Publish Journal</h1>
        <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-0" cols="2">
                <SideBar />
            </v-col>
            <v-col md="6">
                <v-card class="pa-5 ma-2">
                    <div class="d-flex align-center justify-space-between">
                        <h3>Uploaded Journals</h3>
                        <div>
                            <v-menu v-model="menu" :close-on-content-click="false">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon variant="text" v-bind="props"><v-icon>mdi-chevron-down</v-icon></v-btn>
                                </template>
                                <v-card class="pa-5" min-width="250">
                                    List of recent TB
                                </v-card>
                            </v-menu>
                        </div>
                    </div>
                    <div>
                        <v-table height="300px">
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Ledger Number
                                    </th>
                                    <th class="text-left">
                                        Date
                                    </th>
                                    <th class="text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in desserts" :key="item.name">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.date }}</td>
                                    <td>
                                        <v-btn variant="text">
                                            <v-icon>mdi-microsoft-excel</v-icon>
                                        </v-btn>                                        
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>                    
                </v-card>
                <div class="pr-2 d-flex justify-content-end">
                    <v-spacer></v-spacer>
                        <v-btn class="mt-3 pl-3">Next <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </div>
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