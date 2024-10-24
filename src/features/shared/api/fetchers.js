import api from "../utils/api";
import API_URLS from "./api_routes";

const fetchUserDetails = async (token) => {
    try {
      const response = await api.get(API_URLS.USERS.CURRENT_USER, {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

  const fetchUserPermissions = async () => {
    try {
      const response = await api.get(API_URLS.USERS.CURRENT_USER_PERMISSIONS);
      return response.data.permissions
    } catch (error) {
      throw error;
    }
  };

export {fetchUserDetails, fetchUserPermissions}