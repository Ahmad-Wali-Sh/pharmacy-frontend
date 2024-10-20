import { useCallback } from "react";
import axios from "axios";
import api from "../../shared/utils/api";
import { useSignIn } from "react-auth-kit";
import { useUserPermissions } from "../../shared/hooks/states/useUserPermissions";
import { errorToast, successToast, loadingToast, dismissToast } from "../../shared/services/toastify";
import { loginUser } from "../utils/loginUtils";
import { fetchUserDetails, fetchUserPermissions } from "../../shared/api/fetchers";

const useLogin = () => {
  const signIn = useSignIn();
  const { setUserPermissions } = useUserPermissions();

  const performLogin = useCallback(
    async (e, { username, password }) => {
      e.preventDefault();
      loadingToast()
      const formData = { username, password };
      try {
        const authToken = await loginUser(formData);
        api.defaults.headers.common["Authorization"] = `Token ${authToken}`;
        axios.defaults.headers.common["Authorization"] = `Token ${authToken}`;
        const userDetails = await fetchUserDetails(authToken);
        signIn({
          token: authToken,
          expiresIn: 120000000,
          tokenType: "Token",
          authState: userDetails,
        });
        successToast();
        const UserPermissions  = await fetchUserPermissions();
        setUserPermissions(UserPermissions)
        dismissToast()
      } catch (error) {
        dismissToast()
        errorToast(error)
      }
    },
    [signIn, setUserPermissions]
  );

  return performLogin;
};

export default useLogin;