import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ToastContainer autoClose={2000} transition={Flip} theme="dark" pauseOnHover={false}/>
     <App />
  </React.StrictMode>,
)
