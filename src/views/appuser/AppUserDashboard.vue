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
                <v-card v-bind="activatorProps" to="#" class="pa-2 d-flex justify-center" min-width="150">
                  Trial <br> Balance
                </v-card>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title class="pa-2 d-flex justify-space-between align-center">
                    Work on Trial Balance
                    <v-btn variant="text" @click="isActive.value = false" icon><v-icon>mdi-close</v-icon></v-btn>
                  </v-card-title>
                  <v-card-text>
                    <TrialBalanceSheet />
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
            <v-card to="#" class="pa-2 d-flex justify-center" min-width="150">
              Chart of <br> Account
            </v-card>
            <v-dialog>
              <template v-slot:activator="{ props: activateJournal }">
                <v-card v-bind="activateJournal" class="pa-2 d-flex justify-center" min-width="150">
                  Journal <br> Work
                </v-card>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title>Journal Works</v-card-title>
                  <v-card-text>
                    <JournalSpreadsheet />
                    <p class="mt-3">Upload Journal to proceed.</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="isActive.value = false">Next </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <v-card to="#" class="pa-2 d-flex justify-center" min-width="150">
              Sheet <br> Mapping
            </v-card>
          </v-sheet>

        </v-card>

      </v-col>
      <v-col md="4">
        <v-card class="ma-4 pa-4">
          <v-card-title>
            Chart of Account
          </v-card-title>
          <v-card-text>
            <v-table height="300px">
              <thead>
                <tr>
                  <th class="text-left">
                    FS Line
                  </th>
                  <th class="text-left">
                    Description
                  </th>
                  <th class="text-left">
                    Class
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in charts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.class }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import Nav from "@/components/NavBar.vue"
import SideBar from "@/components/SideBarAppUser.vue"
import TrialBalanceSheet from "@/components/spreadsheets/TrialBalance.vue"
import JournalSpreadsheet from "@/components/spreadsheets/JournalSpreadsheet.vue";
export default {
  components: {
    Nav,
    SideBar,
    TrialBalanceSheet,
    JournalSpreadsheet
  },
  data() {
    return {
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
    }
  }
}
</script>