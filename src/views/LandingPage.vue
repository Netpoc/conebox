<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col align-self="center" md="8">
        <v-card class="pa-5" color="transparent" flat>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, dolorem
          labore. Quos vitae quidem fugiat aliquam iure quasi qui laborum eum
          obcaecati architecto fugit, nobis sed labore similique eius provident
          facilis. Debitis ipsum voluptate facere sit?
          <br />

          <a-button class="mt-5 button" @click="dialog = true"
            >Get Started</a-button
          >
          <v-dialog v-model="dialog" width="auto">
            <v-card min-width="400" class="ma-3 pa-3 rounded-lg">
              <h3>Add Tenant</h3>
              Enter Name              
                <a-input class="mb-3" v-model:value="tenant" placeholder="Enter Name">
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              
              Address              
                <a-input class="mb-3" v-model:value="address" placeholder="Enter Address">
                  <template #prefix>
                    <AimOutlined />
                  </template>
                </a-input>
              
              Select a company:
              <a-select
              class="mb-3"
                v-model:value="value"
                show-search
                placeholder="Select a company"
                style="width: 200px"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
              Enter Email:
              
                <a-input class="mb-3" v-model:value="email" placeholder="Enter email">
                  <template #prefix>
                    <MailOutlined />
                  </template>
                </a-input>
                <a-form-item class="ma-1">
                  <a-checkbox v-model:checked="checked">Group option</a-checkbox>
                </a-form-item>         
              <a-form-item>
                <a-button
                  block
                  html-type="submit"
                  type="primary"
                  class="login-button"
                >
                  Continue
                </a-button>
              </a-form-item>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="rounded-xl pa-4 mr-5" min-width="400">
          <a-form
            :form="form"
            @submit.prevent="handleSubmit"
            layout="vertical"
            class="login-form"
          >
            <h2 class="mb-3">Login</h2>
            Username/Email:
            <a-form-item
              name="username"
              rules="[ { required: true, message: 'Please input your username!' } ]"
            >
              <a-input v-model:value="username" placeholder="Username">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            Password:
            <a-form-item
              name="password"
              rules="[ { required: true, message: 'Please input your password!' } ]"
            >
              <a-input-password
                class="pa-2"
                v-model:value="password"
                placeholder="Password"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
            <a-alert v-if="err == true" class="mb-3" message="Invalid Username or Password" type="error" />
            <a-form-item>
              <a-button
                block
                html-type="submit"
                type="primary"
                class="login-button"
              >
                Log in
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-button
                block
                type="#434343"
                html-type="submit"
                class="custom-button"
              >
                Cancel
              </a-button>
            </a-form-item>
          </a-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { UserOutlined, LockOutlined, AimOutlined, MailOutlined } from "@ant-design/icons-vue";

export default {
  name: "LandingPage",
  components: {
    LockOutlined,
    UserOutlined,
    AimOutlined,
    MailOutlined,
  },
  data() {
    return {
      dialog: false,
      username: '',
      password: '',
      err: null,
    };
  },
  methods: {
    handleSubmit() {
      if (this.username === 'Admin' && this.password === 'Password') {
        this.loggedIn = true
        this.user =  {username: this.username};
        // eslint-disable-next-line no-undef
        this.$router.push({name: 'DashboardView'})
      } else if (this.username === 'Tenant' && this.password === 'Password'){
        
        this.user = {username: this.username};
        this.$router.push({name: 'tenant_dashboard'})
      } else if (this.username === 'App_user' && this.password === 'password') {
        //this.$router.push({name: 'tenant'})
        console.log("Tenant Login Successful");
      } else {
        this.err = true
        console.log("Error!!!")
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
.button {  
  background-color: #ffc107; /* Custom button color */
}
.login-button {
  width: 100%;
  background-color: #ffc107; /* Custom button color */
}

.custom-button {
  width: 100%;
  background-color: #434343; /* Custom button color */
}
</style>
