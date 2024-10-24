import api from "../../shared/utils/api";
import API_URLS from "../../shared/api/api_routes";
import axios from "axios";

const loginUser = async (formData) => {
    try {
      const response = await api.post(API_URLS.AUTH.LOGIN, formData, {
        headers: {
          Authorization: ''
        }
      });
      return response.data.token;
    } catch (error) {
      throw error
    }
};

const logoutUser = (signOut) => {
  api.post(API_URLS.AUTH.LOGOUT, {}).finally(() => {
    delete axios.defaults.headers.common["Authorization"];
    delete api.defaults.headers.common["Authorization"];
    signOut ? signOut() :  window.location.href = '/'; 
  })
};


const terminateUserSession = async (formData) => {
    try {
      const response = await api.post(API_URLS.AUTH.TERMINATE_TOKEN, formData)
      return response.data
    }
    catch (error) {
      throw error
    }
}

export {terminateUserSession, loginUser, logoutUser}
