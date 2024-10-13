import axios from 'axios';

// Create an Axios instance with default options
const apiClient = axios.create({
  baseURL: 'https://conebackend.onrender.com/',
});


export default {
    //Get All Tenants
    getTenants() {
        return apiClient.get('tenants')
    },
    getTenant(rc_number) {
        return apiClient.get(`/tenant?rc_number=${rc_number}`)
    }
    
}