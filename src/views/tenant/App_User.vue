<template>
  <Nav />
  <v-main>
    <div class="pa-2 d-flex align-center">
      <h1 class="ma-2">App User</h1>
      <v-btn icon @click="dialog = true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="dialog" width="auto">
        <v-card min-width="400" class="ma-3 pa-3 rounded-lg">
          <a-result v-if="success === true" status="success" title="Email Sent Successfully">
            <a-button>Close</a-button>
          </a-result>
          <a-result v-if="fail === true" status="error" title="Email Sent Successfully">
            <a-button>Close</a-button>
          </a-result>
          <a-form :form="form" @submit.prevent="sendLink()" layout="vertical" class="login-form">
            <h3>Add App User</h3>
            Email:
            <a-input class="mb-3" v-model:value="email" placeholder="Enter Email">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
            <a-form-item>
              <a-button block html-type="submit" class="button">
                Send Invite
              </a-button>
              <v-alert icon="$alert" type="error" class="mt-2" v-if="errorMessage">{{ errorMessage }}</v-alert>
            </a-form-item>
          </a-form>
        </v-card>
      </v-dialog>
    </div>
    <v-row class="flex-nowrap bg-grey-lighten-4 rounded-xl pa-5 ma-5" no-gutters>
      <v-col class="flex-grow-0 flex-shrink-0" md="2">
        <NavList />
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0" md="6" style="min-width: 100px; max-width: 100%">
        <v-sheet class="ma-3 rounded-xl">
          <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Last Login
        </th>
        <th class="text-left">
          Total Edits
        </th>
        <th class="text-left">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      <tr        
      >
        <td>Mathew Makinwa</td>
        <td>today, 3:29pm</td>
        <td>14</td>
        <td>
          <v-btn icon variant="text"><v-icon>mdi-account-edit-outline</v-icon></v-btn>
          <v-btn icon variant="text"><v-icon>mdi-open-in-new</v-icon></v-btn>
          <v-btn icon variant="text"><v-icon>mdi-delete-empty</v-icon></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
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
import axios from "axios";

export default {
  name: "App_User",
  components: {
    Nav,
    NavList,
  },
  data() {
    return {
      errorMessage: '',
      fail: false,
      success: false,
      loading: false,
      email: '',
      dialog: false,
      desserts: [],
      item: '',
      editedIndex: -1,
      desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            actions: ''
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            actions: ''
          },
          {
            name: 'Eclair',
            calories: 262,
            actions: ''
          },
          {
            name: 'Cupcake',
            calories: 305,
            actions: ''
          },
          {
            name: 'Gingerbread',
            calories: 356,
            actions: ''
          },
          {
            name: 'Jelly bean',
            calories: 375,
            actions: ''
          },
          {
            name: 'Lollipop',
            calories: 392,
            actions: ''
          },
          {
            name: 'Honeycomb',
            calories: 408,
            actions: ''
          },
          {
            name: 'Donut',
            calories: 452,
            actions: ''
          },
          {
            name: 'KitKat',
            calories: 518,
            actions: ''
          },
        ],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },
  methods: {
    async sendLink() {
      const token = localStorage.getItem('authToken');
      const data = JSON.parse(localStorage.getItem('vuex'));
      const rc_number = data.user.rc_number;
      console.log(rc_number);
      try {
        const response = await axios.post('https://conebackend.onrender.com/api/tenant/send-link', {
          email: this.email,
          rc_number: rc_number
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.status === 200) {
          this.success = true;
        } else {
          this.fail = true;
        }
      } catch (err) {
        this.errorMessage = err.message;
        console.log(err.message)
      }
    },
    initialize() {
      this.desserts = [
        {
          name: 'Bright Coleson',
          firm: 'NBC',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: 'Stephen Gboyega',
          firm: 'NatWest',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: 'Clinton Okoronkwo',
          firm: 'PwC',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Babalola Smith',
          calories: 262,
          firm: 'Spark Inc.',
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Tenant 5',
          calories: 262,
          firm: 'PwC',
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: 'Tenant 6',
          calories: 262,
          firm: 'PwC',
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
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
  background-color: #ffc107;
  /* Custom button color */
}
</style>
