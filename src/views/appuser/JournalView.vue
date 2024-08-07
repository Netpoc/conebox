<template>
    <Nav />
    <v-main>
        <h1 class="ma-5">Journal</h1>
        <v-row>
            <v-col md="2">
                <SideBar />
            </v-col>
            <v-col md="6">
                <v-card class="pa-5 ma-2">
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

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="Save">Save JSON</v-btn>
                    <v-btn @click="Open">Load JSON</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col md="4">
                 
            </v-col>
        </v-row>

    </v-main>
</template>

<script>
import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective, getRangeAddress, SpreadsheetPlugin } from '@syncfusion/ej2-vue-spreadsheet';
import Nav from '@/components/NavBar.vue';
import SideBar from '@/components/SideBarAppUser.vue';
export default {
    components: {
        Nav,
        SideBar,
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