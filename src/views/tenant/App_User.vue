<template>
  <Nav />
  <v-main>
    <div class="d-flex align-center">
      <h1 class="ma-5">App User</h1>
      <v-btn icon @click="dialog = true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="dialog" width="auto">
        <v-card min-width="400" class="ma-3 pa-3 rounded-lg">
          <h3>Add App User</h3>
          Email:
          <a-input
            class="mb-3"
            v-model:value="tenant"
            placeholder="Enter Email"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
          <a-form-item>
            <a-button block html-type="submit" class="button">
              Send Invite
            </a-button>
          </a-form-item>
        </v-card>
      </v-dialog>
    </div>
    <v-row
      class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5"
      no-gutters
    >
      <v-col class="flex-grow-0 flex-shrink-0" md="2">
        <NavList />
      </v-col>
      <v-col
        class="flex-grow-1 flex-shrink-0"
        md="6"
        style="min-width: 100px; max-width: 100%"
      >
        <v-sheet class="ma-3 rounded-xl">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :sort-by="[{ key: 'calories', order: 'asc' }]"
            :items-per-page="5"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn icon variant="text"><v-icon>mdi-account-tie-hat</v-icon></v-btn>
              <v-btn icon variant="text" class="ma-2"><v-icon>mdi-account-cog</v-icon></v-btn>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
            <template v-slot:bottom>
              <div class="text-center pt-2">
                <v-pagination
                  v-model="editedIndex"
                  :length="pageCount"
                ></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-1" md="3" style="min-width: 100px">

      </v-col>
    </v-row>
  </v-main>
</template>
<script>
import Nav from "../../components/NavBar";
import NavList from "../../components/TenantDrawer";

export default {
  name: "App_User",
  components: {
    Nav,
    NavList,
  },
  data() {
    return {
      dialog: false,
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
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
    };
  },
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },
  methods: {
      initialize () {
        this.desserts = [
          {
            name: 'App User 1',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: 'App User 2',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'App User 3',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Tenant 4',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Tenant 5',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Tenant 6',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          }            
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
};
</script>
<style scoped>
.button {
  background-color: #ffc107; /* Custom button color */
}
</style>
