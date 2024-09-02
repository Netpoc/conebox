<template>
  <v-card class="control-section">
    <div id="spreadsheet-default-section">
      <ejs-spreadsheet ref="spreadsheet" :openUrl="openUrl" :saveUrl="saveUrl" :created="created" :selectionSettings="selectionSettings">
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
            </e-columns>
            <e-ranges>
            <e-range></e-range>
          </e-ranges>          
          </e-sheet>          
        </e-sheets>
      </ejs-spreadsheet>
    </div>
    <v-card-actions>     
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="loadData">Load <v-icon>mdi-chevron-right</v-icon></v-btn>
      <v-btn class="ma-2" @click="saveData">Save <v-icon>mdi-chevron-right</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective, getRangeAddress, SpreadsheetPlugin} from '@syncfusion/ej2-vue-spreadsheet';
import dataSource from "@/default.json";
import { DataManager } from '@syncfusion/ej2-data';

export default {
    components: {
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
   data: () => {
    return {
      response: [],
      selectionSettings: {mode: 'Multiple'},
      dataSource: new DataManager(dataSource.defaultData),
      rowIndex: 30,
      colIndex: 4,      
      openUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/open',
      saveUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/save'
    }
  },
  mounted() {
    // Load data from local storage if exists
    const savedData = localStorage.getItem('spreadsheetData');
    if (savedData) {
      this.$refs.spreadsheet.open({ file: savedData });
    }
  },
  methods: {
    created: function () {
      let spreadsheet = this.$refs.spreadsheet;
      spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:H1');
      let rowCount = spreadsheet.ej2Instances.getActiveSheet().rowCount;
      const cool = spreadsheet.selectRange(getRangeAddress([1, 2, rowCount, 3]));
      console.log(cool);
    },
    saveData() {
      // Save data to local storage
      const spreadsheet = this.$refs.spreadsheet;
      spreadsheet.saveAsJson().then((json) => this.response=json); 
      localStorage.setItem('workbooks', JSON.stringify(this.response));   
      console.log(this.response)
    },
    loadData () {      
      this.response = JSON.parse(localStorage.getItem('workbooks'))
      console.log('Response:', this.response);
      this.$refs.spreadsheet.openFromJson({file: this.response.jsonObject});
           
    }
  }
  
}
</script>