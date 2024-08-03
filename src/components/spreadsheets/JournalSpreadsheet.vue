<template>
  <div class="control-section">
    <div id="spreadsheet-default-section">
      <ejs-spreadsheet ref="spreadsheet" :openUrl="openUrl" :saveUrl="saveUrl" :created="created">
        <e-sheets>
          <e-sheet name="Car Sales Report">
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
          </e-sheet>
        </e-sheets>
      </ejs-spreadsheet>
    </div>

  </div>
</template>

<script>
import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective, getRangeAddress} from '@syncfusion/ej2-vue-spreadsheet';
import dataSource from "@/default.json";

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
    'e-ranges': RangesDirective
   },  
   data: () => {
    return {
      dataSource: dataSource.defaultData,
      rowIndex: 30,
      colIndex: 4,      
      openUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/open',
      saveUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/save'
    }
  },
  methods: {
    created: function () {
      let spreadsheet = this.$refs.spreadsheet;
      spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:H1');
      let rowCount = spreadsheet.ej2Instances.getActiveSheet().rowCount;
      const cool = spreadsheet.selectRange(getRangeAddress([1, 2, rowCount, 3]));
      console.log(cool);
    }
  }
  
}
</script>