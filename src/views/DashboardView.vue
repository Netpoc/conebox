<template>
  <Nav />
  <v-main fluid>
    <h1 class="ma-5">Admin Dashboard</h1>
    <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
      <v-col class="flex-grow-0 flex-shrink-0" cols="2">
        <v-sheet class="ma-2 pa-2 rounded-lg">
          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary" rounded="xl" :to="item.to">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>

      <v-col class="flex-grow-1 flex-shrink-0" md="6" style="min-width: 100px; max-width: 100%">
        <v-sheet class="ma-2 bg-grey-lighten-4 d-flex rounded-lg justify-space-around">
          <v-sheet class="rounded-xl pa-3 ma-3 d-flex align-center">
            <v-sheet class="ma-3 rounded-lg d-flex justify-center align-center" height="45" width="45" color="grey">
              <v-icon>mdi-account-star</v-icon>
            </v-sheet>
            <div class="d-flex flex-column">
              <span>2390</span>
              <p class="text-caption">Active users +2.45%</p>
            </div>
          </v-sheet>

          <v-sheet class="rounded-xl pa-3 ma-3 d-flex align-center">
            <v-sheet class="ma-3 rounded-lg d-flex justify-center align-center" height="45" width="45" color="grey">
              <v-icon>mdi-cpu-64-bit</v-icon>
            </v-sheet>
            <div class="d-flex flex-column">
              <large>2390</large>
              <p class="text-caption">Active users +2.45%</p>
            </div>
          </v-sheet>

          <v-sheet class="rounded-xl pa-3 ma-3 d-flex align-center">
            <v-sheet class="ma-3 rounded-lg d-flex justify-center align-center" height="45" width="45" color="grey">
              <v-icon>mdi-clock-outline</v-icon>
            </v-sheet>
            <div class="d-flex flex-column">
              <large>2390</large>
              <p class="text-caption">Active users +2.45%</p>
            </div>
          </v-sheet>
        </v-sheet>

        <v-card class="pa-5 ma-5">
          <apexchart type="line" :options="options" :series="series">
          </apexchart>
        </v-card>
        <v-sheet height="300" class="pa-5">
          <a-tabs v-model:activeKey="activeKey" centered>
            <a-tab-pane key="1" tab="Review">
              <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    <strong>Description</strong>
                  </th>
                  <th class="text-left">
                    <strong>Type</strong>
                  </th>
                  <th class="text-left">
                    <strong>Due Date</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in review" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                  <td>{{ item.date }}</td>
                </tr>
              </tbody>
            </v-table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Approval" force-render>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="Invoice & Billing">Content of Tab Pane 3</a-tab-pane>
          </a-tabs>
        </v-sheet>
      </v-col>

      <v-col class="flex-grow-0 flex-shrink-1" md="4" style="min-width: 100px">
        <v-sheet class="ma-2 pa-2 rounded-lg">
          <div class="ma-2 d-flex align-center justify-space-between">
            <h2>Top Tenants</h2>
            <v-btn size="x-small" class="rounded-xl">more</v-btn>
          </div>
          <v-sheet height="200" color="grey" class="ma-2 rounded-lg"> </v-sheet>

          <v-sheet min-height="200" color="grey" class="pa-3 ma-2 rounded-lg">
            <div class="d-flex align-center justify-space-between">
              <h2>Upcoming Bills</h2>
              <v-btn size="x-small" class="rounded-xl">more</v-btn>
            </div>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]"
              :items-per-page="3">
              <template v-slot:item.actions="{ item }">
                <v-btn color="#FFC107" size="small">Generate Invoice</v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
              </template>
              <template v-slot:bottom>
                <div class="text-center pt-2">
                  <v-pagination v-model="editedIndex" :length="pageCount"></v-pagination>
                </div>
              </template>
            </v-data-table>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import Nav from "../components/NavBar";

export default {
  components: {
    Nav,
  },
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139],
        },
      ],
      page: 1,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: "Tenant Name",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Due Date", key: "calories" },
        { title: "Actions", key: "actions", sortable: false },
      ],
      review: [
        {
          name: "Electricity",
          calories: "Utility",
          date: "12 Jan 2024",
        },
        {
          name: "Ice cream sandwich",
          calories: "Tax",
          date: "19 Jun 2024",
        },
        {
          name: "Eclair",
          calories: "Utility",
          date: "05 Mar 2024",
        }
        
      ],      
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      items: [
        { text: "Dashboard", icon: "mdi-view-dashboard", to: "dashboard" },
        {
          text: "User Mangement",
          icon: "mdi-account-wrench-outline",
          to: "user_manager",
        },
        { text: "Reports", icon: "mdi-file-chart", to: "reports" },
        { text: "Settings", icon: "mdi-cog", to: "settings" },
        { text: "Logout", icon: "mdi-power-settings", to: "/" },
      ],
      tab: "tab-1",
      tabs: [
        {
          icon: "mdi-book-open-page-variant",
          text: "Reviews",
          value: "tab-1",
        },
        {
          icon: "mdi-handshake-outline",
          text: "Approval",
          value: "tab-2",
        },
        {
          icon: "mdi-license",
          text: "Invoice & Billing",
          value: "tab-3",
        },
        {
          icon: "mdi-shield-lock-outline",
          text: "Security",
          value: "tab-4",
        },
      ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Tenant 1",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Tenant 2",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Tenant 3",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Tenant 4",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Tenant 5",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Tenant 6",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
<style scoped>
</style>
