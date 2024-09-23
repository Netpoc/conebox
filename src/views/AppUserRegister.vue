<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">Complete Register</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <!-- Email (pre-filled) -->
                <v-text-field 
                  v-model="email" 
                  label="Email" 
                  readonly 
                ></v-text-field>
  
                <!-- RC Number (pre-filled) -->
                <v-text-field 
                  v-model="rcNumber" 
                  label="RC Number" 
                  readonly 
                ></v-text-field>
  
                <!-- Password -->
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
  
                <!-- Verify Password -->
                <v-text-field
                  v-model="verifyPassword"
                  label="Verify Password"
                  type="password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
              <v-btn color="primary" @click="submitForm">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        rcNumber: '',
        password: '',
        verifyPassword: ''
      };
    },
    created() {
      // Get query parameters from the URL
      this.email = this.$route.query.email;
      this.rcNumber = this.$route.query.rc_number;
    },
    methods: {
      async submitForm() {
        if (this.password !== this.verifyPassword) {
          alert('Passwords do not match!');
          return;
        }
  
        try {
          // Send the data to the backend for saving
          const response = await fetch('https://conebackend.onrender.com/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email,
              rc_number: this.rcNumber,
              password: this.password
            })
          });
  
          if (response.ok) {
            // Redirect the user to the login page after successful registration
            this.$router.push('/login');
          } else {
            alert('Registration failed. Please try again.');
          }
        } catch (error) {
          console.error('Error during registration:', error);
          alert('An error occurred. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  