<template>
  <Nav />
  <v-main>
    <h1 class="ma-5">User Management</h1>
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
      <v-col class="flex-grow-1 flex-shrink-0" md="3" style="min-width: 100px; max-width: 100%">
        <v-sheet class="pa-3 ma-3 rounded-lg">
          <h3>Add Tenant</h3>
          <a-form-item class="mt-5" name="username"
            rules="[ { required: true, message: 'Please input your username!' } ]">
            <a-input v-model:value="username" placeholder="Enter Name">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item class="mt-5" name="username"
            rules="[ { required: true, message: 'Please input your username!' } ]">
            <a-input v-model:value="username" placeholder="Enter Address">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-select v-model:value="value" show-search placeholder="Select a company" style="width: 200px"
            :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
            @change="handleChange"></a-select>
          <a-form-item class="mt-5" name="username"
            rules="[ { required: true, message: 'Please input your username!' } ]">
            <a-input v-model:value="username" placeholder="Enter email">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button block html-type="submit" type="primary" class="login-button">
              Continue
            </a-button>
          </a-form-item>
        </v-sheet>
      </v-col>
      <v-col class="flex-grow-0 flex-shrink-1" md="7" style="min-width: 100px">
        <v-sheet class="pa-3 ma-3">
          <v-sheet>
            <v-table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>RC Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tenants" :key="item">
                  <td>{{ item.name }}</td>
                  <td>{{ item.rc_number }}</td>
                  <td>
                    <v-sheet v-if="item.activated === false" class="rounded-xl pa-1 d-flex justify-center"
                      color="warning"><small>Pending Activation</small></v-sheet>
                    <v-sheet v-else class="rounded-xl pa-1 d-flex justify-center"
                      color="success"><small>Activated</small></v-sheet>
                  </td>
                  <td>
                    <!--Activation Dialog Start-->
                    <v-dialog v-model="activationDialog" max-width="450" persistent scrollable>
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn @click="showTenant(item.rc_number)" v-bind="activatorProps" variant="text" icon>
                          <v-icon>mdi-account-check</v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card class="ma-2 rounded-xl" title="Activate Tenant" append-icon="mdi-account">
                          <v-card-text>
                            <v-table>
                              <thead>
                                <tr>
                                  <th>Biodata</th>
                                  <th class="text-right">Information</th>
                                </tr>
                              </thead>
              <tbody v-if="client">
                <tr>
                  <td>Name</td>
                  <td class="text-right">{{ client.name }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td class="text-right">{{ client.email }}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td class="text-right">{{ client.phone }}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td class="text-right">{{ client.role }}</td>
                </tr>
              </tbody>
            </v-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="isActive.value = false" size="small" class="pa-2 rounded-xl">Cancel</v-btn>
              <v-btn size="small" class="pa-2 rounded-xl" @click="activate(client.rc_number)">Activate</v-btn>
            </v-card-actions>
            </v-card>
</template>
</v-dialog>
<!--Activation Dialog Ends-->
<!-- Deactivation Dialog Starts-->
<v-dialog v-model="deactivationDialog" max-width="400" persistent scrollable>
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn @click="showTenant(item.rc_number)" v-bind="activatorProps" variant="text" icon>
      <v-icon>mdi-account-cancel</v-icon>
    </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card class="pa-2 rounded-xl" v-if="client" title="Deavtivate Tenant" append-icon="mdi-account-cancel">
      <v-card-text>
        Are sure you want to deactivate this tenant?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn size="small" @click="isActive.value = false" class="pa-2 rounded-xl">Cancel</v-btn>
        <v-btn color="error" size="small" class="pa-2 rounded-xl"
          @click="deactivate(client.rc_number)">Deactivate</v-btn>
      </v-card-actions>
    </v-card>

  </template>
</v-dialog>
<!-- Deactivation Dialog Ends-->
<!--Tenant Delete Dialog Starts-->
<v-dialog v-modle="deleteDialog" scrollable max-width="400">
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn v-bind="activatorProps" variant="text" icon>
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card class="ma-2 rounded-xl">
      <v-card-title>
        Confirm Delete
      </v-card-title>
      <v-card-text>Are you sure you want to delete <strong>{{ item.name }}</strong>?</v-card-text>
      <v-card-actions>
        <v-btn size="small" class="rounded-xl" @click="isActive.value = false">No</v-btn>
        <v-btn size="small" class="rounded-xl" @click="deleteClient(item.rc_number), isActive.value = false">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

</td>
</tr>
</tbody>
</v-table>
</v-sheet>
</v-sheet>
</v-col>
</v-row>
<v-snackbar :color="color" v-model="snackbar" :timeout="timeout">
  {{ text }}
</v-snackbar>
</v-main>
</template>

<script>
import Nav from "../components/NavBar";
import service from "../services/userManagement"

export default {
  components: {
    Nav,
  },
  data() {
    return {
      deleteDialog: false,
      color: '',
      snackbar: false,
      text: '',
      timeout: 5000,
      deactivationDialog: false,
      activationDialog: false,
      deactivator: false,
      client: [],
      tenants: [],
      message: '',
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
      columns: [
        {
          name: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
        },
        {
          title: 'Action',
          key: 'action',
        },
      ],
      info: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ]
    };
  },
  async mounted() {
    this.getAllTenant();
  },
  methods: {
    async getAllTenant() {
      const response = await service.getTenants();
      this.tenants = response.data;
    },
    async showTenant(rc_number) {
      this.$emit('show-details', rc_number);
      const response = await service.getTenant(rc_number)
      this.client = response.data;
    },
    async activate(rc_number) {
      try {
        const response = await service.activate(rc_number);
        this.activationDialog = false;
        this.text = response.data;
        this.snackbar = true;
        this.color = 'success'
      } catch (error) {
        this.activationDialog = false;
        this.text = error.data;
        this.snackbar = true;
        this.color = 'error'
        console.log(error)
      }
    },
    async deleteClient(rc_number) {
      this.deleteDialog = false;
      try {
        const response = await service.deleteClient(rc_number);
        this.text = response.data;
        this.snackbar = true;
        this.color = 'success';        
      } catch (error) {
        this.text = error.data;
        this.snackbar = true;
        this.color = 'error'
        console.log(error)
      }
    },
    async deactivate(rc_number) {
      try {
        this.deleteDialog = false
        const response = await service.deactivate(rc_number);
        this.deactivator = false;
        this.deactivationDialog = false;
        this.text = response.data;
        this.snackbar = true;
        this.color = 'success'
      } catch (error) {
        this.deleteDialog = false
        this.text = error.data;
        this.snackbar = true;
        this.color = 'error'
        console.log(error)
      }
    }
  }
};
</script>
<style scoped>
body,
html,
#app {
  height: 100%;
  margin: 0;
}

.login-button {
  width: 100%;
  background-color: #ffc107;
  /* Custom button color */
}

.custom-button {
  width: 100%;
  background-color: #434343;
  /* Custom button color */
}
</style>
