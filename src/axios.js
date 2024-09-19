import axios from 'axios';
axios.defaults.baseURL = 'https://conebackend.onrender.com/api/';
axios.defaults.headers.common['Authorization'] ='Bearer ' + localStorage.getItem('authToken');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';