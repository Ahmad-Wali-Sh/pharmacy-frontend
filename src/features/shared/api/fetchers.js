import api from "../services/api";

const fetchUserDetails = async (token) => {
    try {
      const response = await api.get(`auth/users/me/`, {
        headers: { Authorization: `Token ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error; 
    }
  };

  const fetchUserPermissions = async () => {
    try {
      const response = await api.get(`api/user/permissions/`);
      return response.data.permissions
    } catch (error) {
      throw error;
    }
  };

export {fetchUserDetails, fetchUserPermissions}