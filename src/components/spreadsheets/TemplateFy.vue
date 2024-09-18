<template>
    <v-card>
        <v-alert close-label="Validation Alert"
            text="Unable to save progress due to validation error. Kindly fix issues and try again."
            title="Validation Error" type="warning" closable variant="tonal" v-show="zeroSumError"></v-alert>
        <ejs-spreadsheet allowDataValidation="true" height="550px" ref="spreadsheet" :created="created"
            :openUrl="openUrl" :saveUrl="saveUrl" :beforeSave="onSave">
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
            <v-btn class="ma-2" @click="validateTrialBalance">Validate <v-icon>mdi-file-check-outline</v-icon></v-btn>
            <v-dialog max-width="400">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn v-bind="activatorProps"
                        :disabled="isDisabled">Save<v-icon>mdi-content-save-outline</v-icon></v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card>
                        <v-text-field v-model="documentName" hide-details="auto" label="Document Name:"
                            placeholder="CP-ID_Q(n)_YYYY"></v-text-field>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click="calcSum">Save New</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-card-actions>

        <v-dialog v-model="popupLoader" max-width="420" persistent>
            <v-list class="py-2" color="primary" elevation="12" rounded="lg">
                <v-list-item prepend-icon="$vuetify-outline" title="Uploading Trial Balance...">
                    <template v-slot:prepend>
                        <div class="pe-4">
                            <v-icon color="primary" size="x-large"></v-icon>
                        </div>
                    </template>

                    <template v-slot:append>
                        <v-progress-circular color="primary" indeterminate="disable-shrink" size="16"
                            width="2"></v-progress-circular>
                    </template>
                </v-list-item>
            </v-list>
        </v-dialog>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import {
    SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective,
    RangeDirective, ColumnsDirective, ColumnDirective
} from '@syncfusion/ej2-vue-spreadsheet';
export default {
    components: {
        'ejs-spreadsheet': SpreadsheetComponent,
        'e-sheets': SheetsDirective,
        'e-sheet': SheetDirective,
        'e-ranges': RangesDirective,
        'e-range': RangeDirective,
        'e-columns': ColumnsDirective,
        'e-column': ColumnDirective,
    },
    data() {
        return {
            spreadsheetData: new Map(),
            documentName: '',
            popupLoader: false,
            zeroSumError: false,
            isDisabled: true,
            response: [],
            rangeData: [],
            sumTotal: null,
            customWidth: 130,
            openUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/open',
            saveUrl: 'https://services.syncfusion.com/vue/production/api/spreadsheet/save'
            //Download and run server project - link provided in the readme file
            // openUrl: 'https://localhost:44354/api/spreadsheet/open', 
            // saveUrl: 'https://localhost:44354/api/spreadsheet/save'
        }
    },
    onCreated() {
        this.validateTrialBalance()
    },
    mounted() {
        this.duplicateChecker()
    },
    watch: {
        popupLoader(val) {
            if (!val) return
            setTimeout(() => (this.popupLoader = false), 8000)
        },
    },
    methods: {
        created: function() {
            this.$refs.spreadsheet.addCustomFunction();
        },
        findDuplicates(map) {
            const valueCount = new Map();
            const duplicates = [];
            map.forEach((value, key) => {
                // Convert the value to a JSON string for comparison purposes
                const stringValue = JSON.stringify(value);

                if (valueCount.has(stringValue)) {
                    valueCount.set(stringValue, valueCount.get(stringValue) + 1);
                } else {
                    valueCount.set(stringValue, 1);
                }
            });
            valueCount.forEach((count, value) => {
                if (count > 1) {
                    duplicates.push(JSON.parse(value)); // Convert the JSON string back to an object
                }
            });

            return duplicates;
        },
        ...mapActions(['addWorkbook']),
        created: function () {
            var spreadsheet = this.$refs.spreadsheet;
            fetch('https://res.cloudinary.com/netpoc-inc/raw/upload/v1725517244/COMPANY-FY_epz9n7.xlsx')
                .then((response) => {
                    response.blob().then((fileBlob) => {
                        var file = new File([fileBlob], "Sample.xlsx");
                        spreadsheet.open({ file: file });
                    })
                })
        },
        onSave(args) {
            args.customParams = { customParams: 'format:Csv' }
        },
        duplicateChecker() {
            const spreadsheet = this.$refs.spreadsheet;
            const duplicate = spreadsheet.conditionalFormat({
                type: "Duplicate",
                cFColor: "RedFT",
                range: "A3:A3000",
            })
            return duplicate;
        },
        async validateTrialBalance() {
            const spreadsheet = this.$refs.spreadsheet;
            try {
                const duplicate = spreadsheet.conditionalFormat({
                    type: "Duplicate",
                    cFColor: "RedFT",
                    range: "A3:A3000",
                })
                const activesheet = spreadsheet.ej2Instances.activeSheetIndex
                if (activesheet == 0) {

                    const sumif = spreadsheet.computeExpression("=SUMIF(JOURNAL!A:A,TRIAL_BALANCE!A3,JOURNAL!C:C)");
                    console.log('sum if:', sumif);
                    const credit = spreadsheet.computeExpression("=SUM(C3:C3000)");
                    const debit = spreadsheet.computeExpression("=SUM(D3:D3000)");
                    const balance = credit + debit;
                    if (balance === 0) {
                        spreadsheet.saveAsJson().then((Json) => (this.response = Json));
                        this.isDisabled = false;
                        console.log('payload sample:', this.response);
                        this.addWorkbook(this.response);

                    } else {

                        this.zeroSumError = 'Failed Zero Sum Check!!!';
                        console.log('Failed Zero Sum Check!!!');
                    }
                }
                spreadsheet.getData("TRIAL_BALANCE!A3:A100").then((data) => (this.rangeData = data));
                const duplicates = this.findDuplicates(this.rangeData)
                console.log('Duplicate: ', duplicates);
                return duplicate
            } catch (err) {
                console.log('Something went wrong', err)
            }
        },
        async calcSum() {
            try {
                const spreadsheet = this.$refs.spreadsheet;
                const activesheet = spreadsheet.ej2Instances.activeSheetIndex
                console.log('active sheet:', activesheet);
                if (activesheet == 0) {
                    const credit = spreadsheet.computeExpression("=SUM(C3:C3000)");
                    const debit = spreadsheet.computeExpression("=SUM(D3:D3000)");
                    const balance = credit + debit;
                    if (balance === 0) {
                        spreadsheet.saveAsJson().then((Json) => (this.response = Json));
                        this.addWorkbook(this.response);
                        console.log('Successful Zero Sum Check: ', this.response);
                    } else {
                        this.zeroSumError = true;
                        console.log('Failed Zero Sum Check!!!');
                    }
                }
            } catch (error) {
                console.log('Failed Calculation', error);
            }
        },
        btnClk() {
            this.$refs.spreadsheet.save({
                url: 'https://services.syncfusion.com/vue/production/api/spreadsheet/save',
                fileName: 'SpreadsheetData',
                saveType: 'Pdf'
            })
        }
    }
}
</script>


<style scoped>
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
