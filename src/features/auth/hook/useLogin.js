import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../shared/services/api";
import { useSignIn } from "react-auth-kit";
import { useUserPermissions } from "../../shared/hooks/states/useUserPermissions";
import { errorToast, successToast } from "../../shared/services/toastify";

const useLogin = () => {
  const signIn = useSignIn();
  const { setUserPermissions } = useUserPermissions();

  const loginUser = async (formData) => {
    try {
      const response = await api.post(`auth/token/login/`, formData, {
        headers: {
          Authorization: ''
        }
      });
      return response.data.auth_token;
    } catch (error) {
    }
  };

  const logoutUser = async (formData) => {
    try {
      const authToken = await loginUser(formData)
      const response = await api.post('auth/token/logout/', {}, {
        headers: {
          Authorization: `Token ${authToken}`
        }
      })
      return response.data
    }
    catch (error) {
      return;
    }
  }

  const fetchUserDetails = async (token) => {
    try {
      const response = await api.get(`auth/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      errorToast(error)
      throw error; 
    }
  };

  const fetchUserPermissions = async () => {
    try {
      const response = await api.get(`api/user/permissions/`);
      setUserPermissions(response.data.permissions);
    } catch (error) {
      errorToast(error);
    }
  };
  const performLogin = useCallback(
    async (e, { username, password }) => {
      e.preventDefault();
      const loadingToastID = toast.loading('در حال اجرا، لطفا منتظر بمانید')
      const formData = { username, password };

      try {
        await logoutUser(formData);
      } catch (error) {
        errorToast(error)
        return; 
      }
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
        successToast(`${userDetails.first_name}: خوش آمدید`);
        await fetchUserPermissions();
        toast.dismiss(loadingToastID);
      } catch (error) {
        toast.dismiss(loadingToastID);
      }
    },
    [signIn, setUserPermissions]
  );

  return performLogin;
};

export default useLogin;