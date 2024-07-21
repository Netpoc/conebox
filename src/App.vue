// eslint-disable-next-line to ignore the next line.
<template>
  <v-app>
    <NavBar v-if="!login" />
    <router-view />    
  </v-app>
</template>
<script>
import NavBar from "../src/components/NavBar"
import xlsx from "xlsx/dist/xlsx.full.min"

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      login: true,
      framework: [
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"]
      ]
    }
  },
  exportExcel () {
    const XLSX = xlsx;
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(this.framework);
    XLSX.utils.book_append_sheet(workbook, worksheet, "framework");
    XLSX.writeFile(workbook, "framework.xlsx");
  }
}
</script>

<style scoped></style>
