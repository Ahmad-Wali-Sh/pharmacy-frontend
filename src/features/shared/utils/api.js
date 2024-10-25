import axios from 'axios';
import fetchServerIP from './fetchServerIP';

const serverIP = await fetchServerIP();

const api = axios.create({
    baseURL: serverIP,
});


export default api; 