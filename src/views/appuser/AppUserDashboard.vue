<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Dashboard</h1>
        <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-0" cols="2">
                <SideBar />
            </v-col>
            <v-col md="6">
                <v-card class="pa-5 ma-3">
                    <h3>Quick Tasks</h3>
                    <v-sheet class="d-flex justify-space-between">
                        <v-dialog>
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-card v-bind="activatorProps" to="#" class="pa-2 d-flex justify-center"
                                    min-width="150">
                                    Trial <br> Balance
                                </v-card>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-card-title>
                                        Work on Trial Balance
                                    </v-card-title>
                                    <v-card-text>
                                        <TrialBalanceSheet/>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <v-card to="#" class="pa-2 d-flex justify-center" min-width="150">
                            Chart of <br> Account
                        </v-card>
                        <v-card to="#" class="pa-2 d-flex justify-center" min-width="150">
                            Journal <br> Work
                        </v-card>
                        <v-card to="#" class="pa-2 d-flex justify-center" min-width="150">
                            Sheet <br> Mapping
                        </v-card>
                    </v-sheet>

                </v-card>

            </v-col>
        </v-row>
    </v-main>
</template>

<script>
import Nav from "@/components/NavBar.vue"
import SideBar from "@/components/SideBarAppUser.vue"
import TrialBalanceSheet from "@/components/spreadsheets/TrialBalance.vue"

export default {
    components: {
        Nav,
        SideBar,
        TrialBalanceSheet
    },
    data() {
        return {

        }
    }
}
</script>