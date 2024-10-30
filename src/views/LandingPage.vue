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

          <a-button class="mt-5 button" @click="dialog = true">Get Started</a-button>
          <v-dialog v-model="dialog" width="400">
            
            <v-card min-width="200" class="ma-3 pa-3 rounded-lg">
              <a-form >
              <h3>Get Started</h3>
              Company Name
              <a-input class="mb-3" v-model:value="tenant.name" placeholder="Enter Company Name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>

              RC Number
              <a-input class="mb-3" v-model:value="tenant.rc_number" placeholder="Enter RC Number">
                <template #prefix>
                  <FieldNumberOutlined />
                </template>
              </a-input>

              Address
              <a-input class="mb-3" v-model:value="tenant.address" placeholder="Enter Address">
                <template #prefix>
                  <AimOutlined />
                </template>
              </a-input>
              Email:

              <a-input class="mb-3" v-model:value="tenant.email" placeholder="Enter email">
                <template #prefix>
                  <MailOutlined />
                </template>
              </a-input>              
              Phone:

              <a-input class="mb-3" v-model:value="tenant.phone" placeholder="Enter Phone">
                <template #prefix>
                  <PhoneOutlined />
                </template>
              </a-input>
              
              <a-form-item>
                <a-button block type="primary" class="login-button" @click="register()">
                  Register
                </a-button>
              </a-form-item>
            </a-form>
            </v-card>
          </v-dialog>

          <!--Email Sent Confirmation-->
          <v-dialog>
            <v-card max-width="400" prepend-icon="mdi-update"
              text="Your application will relaunch automatically after the update is complete."
              title="Update in progress">
              <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="confirm = false"></v-btn>
              </template>
            </v-card>
          </v-dialog>
          <!--Email Send End-->
        </v-card>
      </v-col>
      <v-col md="3">
        <v-card class="rounded-xl pa-4 mr-5" min-width="400">
          <a-form :form="form" @submit.prevent="login()" layout="vertical" class="login-form">
            <h2 class="mb-3">Login</h2>
            Username/Email:
            <a-form-item name="Email" rules="[ { required: true, message: 'Please input your username!' } ]">
              <a-input v-model:value="email" placeholder="Email">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            Password:
            <a-form-item name="password" rules="[ { required: true, message: 'Please input your password!' } ]">
              <a-input-password class="pa-2" v-model:value="password" placeholder="Password">
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>
            <a-alert v-if="err == true" class="mb-3" message="Invalid Username or Password" type="error" />
            <a-form-item>
              <v-dialog v-model="loader" max-width="320" persistent>
                <template v-slot:activator="{ props: activatorProps }">
                  <a-button v-bind="activatorProps" block html-type="submit" type="primary" class="login-button">
                    Log in
                  </a-button>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card class="pa-5 ma-5">
                    Loading User Profile...
                    <v-progress-linear class="mt-3" color="#ffc107" indeterminate></v-progress-linear>
                  </v-card>
                </template>
              </v-dialog>
            </a-form-item>
            <a-form-item>
              <a-button block type="#434343" html-type="submit" class="custom-button">
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
import axios from 'axios';
import {
  PhoneOutlined,
  UserOutlined,
  LockOutlined,
  AimOutlined,
  FieldNumberOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";

export default {
  name: "LandingPage",
  components: {
    PhoneOutlined,
    LockOutlined,
    UserOutlined,
    AimOutlined,
    MailOutlined,
    FieldNumberOutlined
  },
  data() {
    return {
      tenant: {
        name: '',
        address: '',
        phone: '',
        email: '',
        group: '',
        rc_number: '',
        alt_email: '',
        alt_phone: '',
      },
      loader: false,
      dialog: false,
      email: "",
      password: "",
      err: null,
      confirm: "",
      checked: false,
    };
  },
  methods: {
    login() {
      this.loader = true;
      this.err = false;
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      })
        .then(() => {
          const data = JSON.parse(localStorage.getItem('vuex'));
          const user = data.user || data.appuser;
          if (user.role === 'Tenant') {
            this.$router.push("/tenant_dashboard");
            this.loader = false;
            if(user.firstLogin === 'true') {
              this.firstTips = true;
            }
          } else if (user.role === 'Admin') {
            this.$router.push("/dashboard");
            this.loader = false;
          } else if (user.role === 'App_User') {
            this.$router.push("/app_user_dashboard");
            this.loader = false;
          }
          else {
            this.loader = false;
            console.log('Invalid User Role');
          }
        })
        .catch(err => {
          this.err = true
          console.log(err)
          this.loader = false;

        })
    },
    async register() {
      this.loader = true;
      this.dialog = false;
      try {
        const tenant = await axios.post('https://conebackend.onrender.com/api/admin/addclient', {
          name: this.tenant.name,
          phone: this.tenant.phone,
          address: this.tenant.address,
          email: this.tenant.email,
          rc_number: this.tenant.rc_number,
        })
        if (tenant.status === 201) {
                    // Redirect the user to the login page after successful registration
                    this.loader = false;                    
                    alert('Registration succesful',);
                } else {
                    this.loader = false;
                    alert('Registration failed. Please try again.',);
                }
      } catch (err) {
        console.log(err)
      }
    }
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

.button {
  background-color: #ffc107;
  /* Custom button color */
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
