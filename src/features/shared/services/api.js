import axios from 'axios';
import fetchServerIP from '../utils/fetchServerIP';

const serverIP = await fetchServerIP(); // Replace with your server IP and port

const api = axios.create({
    baseURL: serverIP,
});

export default api; 