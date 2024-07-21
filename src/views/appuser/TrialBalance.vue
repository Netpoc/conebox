<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Prepare Trial Balance</h1>
        <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-0" cols="2">
                <SideBar />
            </v-col>
            <v-col md="6">
                <v-card class="pa-5 ma-2">
                    <div class="d-flex align-center justify-space-between">
                        <h3>Uploaded Trial Balances</h3>
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
        SideBar
    },
    data() {
        return {
            fav: true,
            menu: false,
            message: false,
            hints: true,
            desserts: [
                {
                    name: 'FY-10-2023',
                    date: '18/04/2023',
                },
                {
                    name: 'FY-TB-2024',
                    date: '20/03/2024',
                },
                {
                    name: 'FY-22-TB-001',
                    date: '30/09/2023',
                },
                {
                    name: 'FY-12-TB-2019',
                    date: '25/01/2019',
                },
                {
                    name: 'FY-01-TB-2018',
                    date: '16/11/2018',
                },
                {
                    name: 'FY-01-TB-2017',
                    date: '5/08/2017',
                },
                {
                    name: 'FY-01-TB-2016',
                    date: '9/02/2016',
                },
                {
                    name: 'FY-04-TB-2015',
                    date: '3/08/2015',
                },
                {
                    name: 'FY-03-TB-2013',
                    date: '20/09/2013',
                },
                {
                    name: 'FY-01-TB-2012',
                    date: '12/05/2012',
                },
            ],
        }
    }
}
</script>