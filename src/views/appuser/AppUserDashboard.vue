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
          <v-card class="ma-3">
            <v-card-title>
              Start New FY
            </v-card-title>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props">Start</v-btn>
                </template>
                <v-list>
                  <v-dialog v-model="template" transition="dialog-bottom-transition" fullscreen>
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-list-item v-bind="activatorProps" link>
                        Template
                      </v-list-item>
                    </template>
                    <template v-slot:default="{ isActive }">
                      <v-card>
                        <v-toolbar>
                          <v-btn icon="mdi-close" @click="template = false"></v-btn>

                          <v-toolbar-title>Template FY</v-toolbar-title>

                          <v-spacer></v-spacer>

                          <v-toolbar-items>
                            <v-btn text="Save" variant="text" @click="dialog = false"></v-btn>
                          </v-toolbar-items>
                        </v-toolbar>
                        <v-card-text>
                          <TemplateFy />
                        </v-card-text>
                      </v-card>
                    </template>
                  </v-dialog>
                  <v-list-item link>
                    Upload
                  </v-list-item>
                </v-list>
              </v-menu>

            </v-card-actions>
          </v-card>
          <v-card class="ma-3">
            <v-card-title>
              Modify FY
            </v-card-title>
            <v-card-text>
              
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn>Start</v-btn>
            </v-card-actions>
          </v-card>
          <v-table height="300px">
            <thead>
              <tr>
                <th class="text-left">
                  Financial Year
                </th>
                <th class="text-left">
                  Date Last Edited
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
        </v-card>
        <v-sheet class="d-flex pa-3">

        </v-sheet>
      </v-col>
      <v-col md="4">
        <v-card class="ma-4 pa-4">
          <v-card-title>
            Recent Work
          </v-card-title>
          <v-card-text>
            <ul>
              <li v-for="(workbook, index) in allWorkbooks" :key="index">
                Workbook {{ index + 1 }}
                <button @click="deleteWorkbook(index)">Delete</button>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>

      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Nav from "@/components/NavBar.vue"
import SideBar from "@/components/SideBarAppUser.vue"
import TrialBalanceSheet from "@/components/spreadsheets/TrialBalance.vue"
import JournalSpreadsheet from "@/components/spreadsheets/JournalSpreadsheet.vue";
import TemplateFy from '@/components/spreadsheets/TemplateFy.vue';
export default {
  components: {
    Nav,
    SideBar,
    TemplateFy,
    TrialBalanceSheet,
    JournalSpreadsheet
  },
  data() {
    return {
      template: false,
      trialbalance: [],
      charts: [
        {
          name: '234000',
          description: 'Plant & Equipment',
          class: 'Asset'
        },
        {
          name: '234201',
          description: 'Professional Service',
          class: 'Liability'
        },
        {
          name: '230003',
          description: 'Raw materials',
          class: 'Assets'
        },
        {
          name: '230023',
          description: 'Other Expenses',
          class: 'Liability'
        },
        {
          name: '230089',
          description: 'Deferred tax Asset',
          class: 'Asset'
        },
        {
          name: '230007',
          description: 'Right-of-use Assets',
          class: 'Liability'
        },
        {
          name: '230090',
          description: 'Loans',
          class: 'Liability'
        },

      ],
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
  },
  mounted() {
    console.log('Workbooks:', this.allWorkbooks); // This should show the correct data in the console
  },
  computed: {
    ...mapGetters(['allWorkbooks']),

  },
  methods: {
    ...mapActions(['deleteWorkbook']),
  }
}
</script>