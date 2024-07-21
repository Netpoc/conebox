<script>
  import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, 
      RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-spreadsheet';
  import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
  import datasource from '../../default.json';
  export default{
    components: {
      'ejs-spreadsheet': SpreadsheetComponent,
      'e-sheets': SheetsDirective,
      'e-sheet': SheetDirective,
      'e-ranges': RangesDirective,
      'e-range': RangeDirective,
      'e-columns': ColumnsDirective,
      'e-column': ColumnDirective,
      'ejs-button': ButtonComponent
    },
    data(){
      return{
        data: datasource.defaultData,
        customWidth: 130,
        openUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/open', 
        saveUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/save'
        //Download and run server project - link provided in the readme file
        // openUrl: 'https://localhost:44354/api/spreadsheet/open', 
        // saveUrl: 'https://localhost:44354/api/spreadsheet/save'
      }
    },
    methods: {
      created: function() {
        var spreadsheet = this.$refs.spreadsheet;
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:F1');
        fetch('https://cdn.syncfusion.com/scripts/spreadsheet/Sample.xlsx')
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
  <div>
    
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
    <div>
        <ejs-button style="margin: 5px;" v-on:click="btnClk">Save</ejs-button>
    </div>
  </div>
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
