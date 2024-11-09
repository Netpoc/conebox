<template>
    <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="5">
                <v-card>
                    <v-card-title class="headline">Complete Your Registration</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="submitForm">
                            <!-- Phone Number (pre-filled)-->
                            <v-text-field v-model="phone" label="Phone Number" readonly></v-text-field>

                            <!-- Email (pre-filled) -->
                            <v-text-field v-model="email" label="Email" readonly></v-text-field>

                            <!-- RC Number (pre-filled) -->
                            <v-text-field v-model="rcNumber" label="RC Number" readonly></v-text-field>

                            <!-- Password -->
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

                            <!-- Verify Password -->
                            <v-text-field v-model="verifyPassword" label="Verify Password" type="password"
                                required></v-text-field>

                            <v-checkbox v-model="checked" label="Group Class?"></v-checkbox>

                            <!-- Phone Number -->
                            <v-text-field v-if="checked" v-model="parent" label="Parent Company"></v-text-field>

                            <!-- Phone Number -->
                            <v-text-field v-if="checked" v-model="percent"
                                label="What % is owned by Parent Company?"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn @click="submitForm" class="ma-2 button">Submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar :timeout="timeout" :color="color" v-model="snackbar">
            {{ text }}
        </v-snackbar>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            snackbar: false,
            text: '',
            timeout: 3000,
            color: '',
            checked: false,
            success: false,
            loader: false,
            email: '',
            rcNumber: '',
            password: '',
            verifyPassword: '',
            phone: '',
            name: '',
            percent: '',
            parent: ''
        };
    },
    created() {
        // Get query parameters from the URL        
        this.phone = this.$route.query.phone;
        this.rcNumber = this.$route.query.rc_number;
        this.email = this.$route.query.email;
    },
    methods: {
        async submitForm() {
            if (this.password !== this.verifyPassword) {
                alert('Passwords do not match!');
                return;
            }
            this.loader = true
            try {
                // Send the data to the backend for saving
                const response = await axios.put('https://conebackend.onrender.com/api/tenant/update-profile', {
                    password: this.password,
                    rc_number: this.rcNumber,
                    group: this.checked,
                    parent: this.parent,
                    percent: this.percent
                })
                if (response.status === 200) {
                    // Redirect the user to the login page after successful registration
                    this.success = true;
                    this.text = 'Account activation successful, you will be redirected to the login page shortly.';
                    this.snackbar = true;
                    this.color = 'success'
                }
                this.loader = false;
                this.$router.push('/');                

            } catch (error) {
                this.loader = false;
                this.text = 'An error occured, please try later or contact admin';
                this.snackbar = true;
                this.color = 'error'
                console.log(error)

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