import axios from "axios";
import { useEffect } from "react";
import { useSignOut } from "react-auth-kit";
import api from "../utils/api";

const useSignout = () => {
    const signOut = useSignOut();

    function performSignOut () {
        signOut();
        delete axios.defaults.headers.common["Authorization"];
        delete api.defaults.headers.common["Authorization"];
    }

    useEffect(() => {
        performSignOut()
    }, []);

    return { performSignOut }
}

export default useSignout;

