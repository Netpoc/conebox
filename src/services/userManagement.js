import axios from 'axios';

// Create an Axios instance with default options
const apiClient = axios.create({
  baseURL: 'http://localhost:7000/',
});


export default {
    //Get All Tenants
    getTenants() {
        return apiClient.get('tenants');
    },
    getTenant(rc_number) {
        return apiClient.get(`/tenant?rc_number=${rc_number}`);
    },
    activate(rc_number) {
        return apiClient.put(`/api/admin/activate?rc_number=${rc_number}`);
    },
    deactivate(rc_number) {
        return apiClient.put(`api/admin/deactivate?rc_number=${rc_number}`);
        
    }
}