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
                <tr>
                  <td>XYZ Limited</td>
                  <td>RC 012309</td>
                  <td><v-sheet class="rounded-xl pa-1 d-flex justify-center" color="warning">Pending Activation</v-sheet></td>
                  <td>
                    <v-btn variant="text" icon><v-icon>mdi-account-check</v-icon></v-btn>
                    <v-btn variant="text" icon><v-icon>mdi-account-cancel</v-icon></v-btn>
                    <v-btn variant="text" icon><v-icon>mdi-delete</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
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
      items: [
        { text: "Dashboard", icon: "mdi-view-dashboard", to: "dashboard" },
        {
          text: "User Mangement",
          icon: "mdi-account-wrench-outline",
          to: "user_manager",
        },
        { text: "Reports", icon: "mdi-file-chart", to: "reports" },
        { text: "Settings", icon: "mdi-cog", to: "settings" },
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
