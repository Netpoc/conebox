<template>
    <div class="control-section">
        <ejs-spreadsheet ref="spreadsheet" :openUrl="openUrl" :saveUrl="saveUrl">
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
        <button @click="Save">Save JSON</button>
        <button @click="Open">Load JSON</button>
    </div>
</template>

<script>
import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective, getRangeAddress, SpreadsheetPlugin } from '@syncfusion/ej2-vue-spreadsheet';

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
    data() {
        return {
            response: "",
            openUrl:
                "https://services.syncfusion.com/vue/production/api/spreadsheet/open",
            saveUrl:
                "https://services.syncfusion.com/vue/production/api/spreadsheet/save"
        };
    },
    methods: {
        Save: function () {
            // Save the spreadsheet data as JSON.
            this.$refs.spreadsheet.saveAsJson().then((Json) => (this.response = Json));
            
            console.log(this.response)
        },
        Open: function () {
            // Load the JSON data to the spreadsheet.
            this.$refs.spreadsheet.openFromJson({ file: this.response.jsonObject });
        },
    },
};
</script>
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