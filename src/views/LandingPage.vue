<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col align-self="center" md="8">
        <v-card color="transparent" flat>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, dolorem labore. Quos vitae quidem fugiat aliquam iure quasi qui laborum eum obcaecati architecto fugit, nobis sed labore similique eius provident facilis. Debitis ipsum voluptate facere sit?
          <br>
          <v-btn class="ma-3">Get Started</v-btn>
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
            <a-input-password class="pa-2" v-model:value="password" placeholder="Password">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button block html-type="submit" type="primary" class="login-button">
              Log in
            </a-button>
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
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { UserOutlined, LockOutlined} from "@ant-design/icons-vue";

export default {
  name: "LoginPage",
  components: {    
    LockOutlined,
    UserOutlined
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = () => {
      console.log("Username:", username.value);
      console.log("Password:", password.value);
      // Handle form submission logic
      router.push('/dashboard');
    };

    return {
      username,
      password,
      handleSubmit,
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
  background-color: #FFC107; /* Custom button color */
  
}

.custom-button {
  width: 100%;
  background-color: #434343; /* Custom button color */
  
}
</style>
