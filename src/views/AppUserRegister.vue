<template>
    <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title class="pa-5 headline">Complete App User Registration</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="submitForm">
                            <!-- Name -->
                            <v-text-field v-model="name" label="Full Name"></v-text-field>

                            <!-- Phone Number -->
                            <v-text-field v-model="phone" label="Phone Number"></v-text-field>

                            <!-- Email (pre-filled) -->
                            <v-text-field v-model="email" label="Email" readonly></v-text-field>

                            <!-- RC Number (pre-filled) -->
                            <v-text-field v-model="rcNumber" label="RC Number" readonly></v-text-field>

                            <!-- Password -->
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

                            <!-- Verify Password -->
                            <v-text-field v-model="verifyPassword" label="Verify Password" type="password"
                                required></v-text-field>
                        </v-form>
                        <v-alert icon="$alert" type="error" class="mt-2" v-if="errorMessage">{{ errorMessage }}</v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn @click="submitForm" class="ma-2 button" v-bind="props">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-dialog max-width="400" v-model="loader">
                <v-card class="pa-5 ma-5">
                    Registering New User...
                    <v-progress-linear class="mt-3" color="#ffc107" indeterminate></v-progress-linear>
                </v-card>
            </v-dialog>
            <v-snackbar :timeout="timeout" :color="color" v-model="snackbar">
                {{ text }}
            </v-snackbar>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            errorMessage: '',
            snackbar: false,
            text: '',
            color: '',
            timeout: 3000,
            success: false,
            loader: false,
            email: '',
            rcNumber: '',
            password: '',
            verifyPassword: '',
            phone: '',
            name: ''
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
                return this.errorMessage = 'Passwords do not match!';
            }
            this.loader = true
            try {
                // Send the data to the backend for saving
                const response = await axios.post('https://conebackend.onrender.com/api/tenant/register', {
                    name: this.name,
                    password: this.password,
                    email: this.email,
                    rc_number: this.rcNumber,
                    phone: this.phone
                })
                if (response.status === 201) {
                    // Redirect the user to the login page after successful registration
                    this.text = 'Account activation successful, you will be redirected to the login page.';
                    this.snackbar = true;
                    this.color = 'success'
                    this.success = true;
                    this.$router.push('/');
                }
            } catch (error) {
                this.text = 'An error occured, please try later or contact admin';
                this.snackbar = true;
                this.color = 'error'
                console.log(error);
                this.loader = false;
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

.button {
    background-color: #ffc107;
    /* Custom button color */
}
</style>