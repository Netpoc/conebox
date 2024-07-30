<script>
  import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, 
      RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-spreadsheet';
  
  import axios from 'axios';
 
  export default{
    components: {
      'ejs-spreadsheet': SpreadsheetComponent,
      'e-sheets': SheetsDirective,
      'e-sheet': SheetDirective,
      'e-ranges': RangesDirective,
      'e-range': RangeDirective,
      'e-columns': ColumnsDirective,
      'e-column': ColumnDirective,      
    },
    data(){
      return{
        popupLoader: false,
        zeroSumError: '',
        response: '',
        sumTotal: null,
        customWidth: 130,
        openUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/open', 
        saveUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/save'
        //Download and run server project - link provided in the readme file
        // openUrl: 'https://localhost:44354/api/spreadsheet/open', 
        // saveUrl: 'https://localhost:44354/api/spreadsheet/save'
      }
    },
    watch: {
      popupLoader (val) {
        if (!val) return

        setTimeout(() => (this.popupLoader = false), 8000)
      },
    },
    methods: {
      created: function() {
        var spreadsheet = this.$refs.spreadsheet;
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:F1');
        fetch('https://res.cloudinary.com/netpoc-inc/raw/upload/v1722177291/d0zmerh8k8fj8hrbqtdl.xlsx')
        .then((response)=>{
          response.blob().then((fileBlob) => {
            var file = new File([fileBlob], "Sample.xlsx");
            spreadsheet.open({file: file});
          })
        })
      },
      onSave(args){
        args.customParams = { customParams: 'format:Csv' }
      },
      async calcSum() {
        try {
          const spreadsheet = this.$refs.spreadsheet;
          const usedRange = spreadsheet.ej2Instances.getActiveSheet().Column;
          console.log(usedRange);
          this.sumTotal = spreadsheet.computeExpression("=SUM(C2:C100)")
          if(this.sumTotal !== 0) {
            this.zeroSumError = "Zero sum check failed!!!"         
          } else {            
            //this.$refs.spreadsheet.saveAsJson().then((Json)=> (this.response = Json))
            this.popupLoader=true;
            setTimeout(()=> (this.$router.push('/trial_balance')), 4000)
            console.log(this.response)
          }          
        } catch (error) {
          console.log('Failed Calculation', error);
        }
      },
      determineFormat(rows) {
      // Check the first few rows to determine the format
      for (let i = 2; i < rows.length; i++) {
        if (rows[i] && rows[i].cells) {
          const cellC = rows[i].cells[2];
          const cellD = rows[i].cells[3];

          if (cellC && cellD) {
            const valueC = parseFloat(cellC.value || 0);
            const valueD = parseFloat(cellD.value || 0);

            if (valueC !== 0 || valueD !== 0) {
              return 1; // Format 1 detected
            }
          } else if (cellC) {
            const valueC = parseFloat(cellC.value || 0);

            if (valueC !== 0) {
              return 2; // Format 2 detected
            }
          }
        }
      }
      return 1; // Default to Format 1 if unable to determine
    },
    validateZeroSum(debitSum, creditSum) {
      return debitSum === creditSum;
    },
    async saveSpreadsheet() {
      const { debitSum, creditSum, rows } = await this.getSpreadsheetData();

      if (this.validateZeroSum(debitSum, creditSum)) {
        const data = { debitSum, creditSum, rows };
        try {
          await axios.post('/api/save-spreadsheet', data);
          alert('Spreadsheet saved successfully!');
        } catch (error) {
          console.error('Error saving spreadsheet:', error);
          alert('Failed to save spreadsheet. Please try again.');
        }
      } else {
        alert('The Trial Balance is not zero-sum. Please check your entries.');
      }
    },
      btnClk(){
        this.$refs.spreadsheet.save({
          url: 'https://services.syncfusion.com/vue/production/api/spreadsheet/save',
          fileName: 'SpreadsheetData',
          saveType: 'Pdf'
        })
      }
    }
  }
</script>

<template>
  <v-card>
    <v-banner
    color="error"
    icon="mdi-sigma"
    lines="one"
    v-if="zeroSumError"
  >
    <template v-slot:text>
      {{ zeroSumError }}
    </template>

    <template v-slot:actions>
      <v-btn>
        Dismiss
      </v-btn>

      <v-btn>
        Retry
      </v-btn>
    </template>
  </v-banner>
    <ejs-spreadsheet ref="spreadsheet" :created="created" :openUrl="openUrl"
      :saveUrl="saveUrl" :beforeSave="onSave">
      <e-sheets>
        <e-sheet>
          <e-columns>
            <e-column :width="customWidth"></e-column>
            <e-column :width="customWidth"></e-column>
            <e-column :width="customWidth"></e-column>
            <e-column :width="customWidth"></e-column>
            <e-column :width="customWidth"></e-column>
            <e-column :width="customWidth"></e-column>
            <e-column :width="customWidth"></e-column>
          </e-columns>
          <e-ranges>
            <e-range></e-range>
          </e-ranges>
        </e-sheet> 
      </e-sheets>
    </ejs-spreadsheet>
    <v-card-actions>
     
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="calcSum">Save <v-icon>mdi-chevron-right</v-icon></v-btn>
    </v-card-actions>
    <v-dialog 
      v-model="popupLoader"
      max-width="420"
      persistent
    >
    <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <v-list-item
          prepend-icon="$vuetify-outline"
          title="Uploading Trial Balance..."
        >
          <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template>

          <template v-slot:append>
            <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
            ></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </v-card>
</template>

<style>
  @import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-grids/styles/material.css";
  @import "../../../node_modules/@syncfusion/ej2-vue-spreadsheet/styles/material.css";
</style>
