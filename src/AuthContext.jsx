import { createContext } from "react"; 
import { User } from './components/Login/useUser'

export const AuthContext = createContext({
    user: null,
    setUser: () => {}
})