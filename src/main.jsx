import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './AuthContext'
import { useAuth } from './components/Login/useAuth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ToastContainer autoClose={1000} transition={Flip} theme="dark" pauseOnHover={false}/>
    <AuthContext.Provider value={{user, setUser}} >
     <App />
    </AuthContext.Provider>
  </React.StrictMode>,
)
