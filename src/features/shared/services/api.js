import axios from 'axios';
import fetchServerIP from '../utils/fetchServerIP';

const serverIP = await fetchServerIP();

const api = axios.create({
    baseURL: serverIP,
});

export default api; 