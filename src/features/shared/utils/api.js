import axios from 'axios';
import fetchServerIP from './fetchServerIP';
import { logoutUser } from '../../auth/utils/loginUtils';

const serverIP = await fetchServerIP();

const api = axios.create({
    baseURL: serverIP,
});


export default api; 