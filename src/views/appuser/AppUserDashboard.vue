<template>
  <Nav />
  <v-main>
    <h1 class="ma-5">Dashboard</h1>
    <!--Guide Tour Start-->
    <v-dialog v-model="tourGuide" max-width="500" persistent>
      <v-card>
        <v-card-title>Guide Tour</v-card-title>
        <v-card-text>
          This guide tour introduces new features
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn size="small" @click="tourGuide=false">Close</v-btn>
        </v-card-actions>
      </v-card>
            
    </v-dialog>
    <!--Guide Tour Ends-->
    <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
      <v-col class="flex-grow-0 flex-shrink-0" cols="2">
      <!--Side Bar-->
        <SideBar />
      </v-col>
      <v-col md="6">
        <v-card class="pa-5 ma-3">
          <h3>Quick Tasks</h3>
          <v-card class="ma-3">
            <v-card-title>
              Prepare Trial Balance
            </v-card-title>
            
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
                      <v-card max-height="400">
                        <v-toolbar>
                          <v-btn icon="mdi-close" @click="template = false"></v-btn>

                          <v-toolbar-title>Template Combined Financial Year</v-toolbar-title>

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
                </v-list>
              </v-menu>

            </v-card-actions>
          </v-card>
          
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="ma-4 pa-4">
          <v-card-title>
            Recent Work
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(workbook, index) in allWorkbooks" :key="index">
                Workbook {{ index + 1 }}
                <v-btn @click="deleteWorkbook(index)">Delete</v-btn>
                <v-dialog v-model="openSpreadsheet">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn v-bind="activatorProps" @click="openWorkbook(index)">Open</v-btn>
                  </template>
                  <template>
                    <v-card class="pa-5 ma-2">
                      <ejs-spreadsheet ref="openspreadsheet" :openUrl="openUrl" :saveUrl="saveUrl">
                        <e-sheets>
                          <e-sheet name="Journal Template">
                            <e-ranges>
                              <e-range :dataSource="dataSource"></e-range>
                            </e-ranges>
                            <e-rows>
                              <e-row :index="rowIndex" :cells="cells"></e-row>
                            </e-rows>
                            <e-columns>
                              <e-column :width="150"></e-column>
                              <e-column :width="100"></e-column>
                              <e-column :width="120"></e-column>
                              <e-column :width="120"></e-column>
                              <e-column :width="100"></e-column>
                              <e-column :width="120"></e-column>
                              <e-column :width="120"></e-column>
                            </e-columns>
                            <e-ranges>
                              <e-range></e-range>
                            </e-ranges>
                          </e-sheet>
                        </e-sheets>
                      </ejs-spreadsheet>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="Save">Save JSON</v-btn>
                        <v-btn @click="Open">Load JSON</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>

              </v-list-item>
            </v-list>
            <div>
              here
            </div>
            <div v-if="allWorkbooks.sheets">
              hi
            </div>
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

import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective, getRangeAddress, SpreadsheetPlugin } from '@syncfusion/ej2-vue-spreadsheet';
import { mapGetters, mapActions } from 'vuex';
import Nav from "@/components/NavBar.vue"
import SideBar from "@/components/SideBarAppUser.vue"
import TemplateFy from '@/components/spreadsheets/TemplateFy.vue';
export default {
  components: {
    Nav,
    SideBar,
    TemplateFy,
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheet': SheetDirective,
    'e-sheets': SheetsDirective,
    'e-row': RowDirective,
    'e-rows': RowsDirective,
    'e-column': ColumnDirective,
    'e-columns': ColumnsDirective,
    'e-range': RangeDirective,
    'e-ranges': RangesDirective,
    ejsSpreadsheet: SpreadsheetPlugin

  },
  data() {
    return {
      menus: [
        'New Feature Tour',
        'Complete Profile'
      ],
      tourGuide: false,
      openSpreadsheet: false,
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
      
    }
  },
  mounted() {
    this.tour();
  },
  computed: {
    ...mapGetters(['allWorkbooks']),

  },
  methods: {
    tour() {
      const check = this.$store.state.user;
      if (check.firstLogin) {
        this.tourGuide = true;
      }
      console.log('Login check payload', check.firstLogin)
    },
    ...mapActions(['deleteWorkbook']),
    openWorkbook(index) {
      const selectedWorkbook = this.allWorkbooks[index];
      if (selectedWorkbook) {
        // Load the workbook into the spreadsheet using Syncfusion
        console.log('Test Select', selectedWorkbook)
        this.$refs.spreadsheet.openFromJson({ file: selectedWorkbook });
      }
    },
    Open: function () {
      // Load the JSON data to the spreadsheet.
      this.$refs.openspreadsheet.openFromJson({ file: this.response.jsonObject });
    },
  }
}
</script>