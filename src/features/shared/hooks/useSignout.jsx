import { useEffect } from "react";
import { useSignOut } from "react-auth-kit";
import axios from "axios";
import api from "../utils/api";

const useSignout = () => {
    const signOut = useSignOut();
    useEffect(() => {
        delete axios.defaults.headers.common["Authorization"];
        delete api.defaults.headers.common["Authorization"];
        signOut()
    }, []);
}

export default useSignout;

