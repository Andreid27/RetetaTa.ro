import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND || '/';
axios.defaults.headers.post['Content-Type'] = 'application/json';