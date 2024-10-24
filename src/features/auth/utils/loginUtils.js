import api from "../../shared/utils/api";
import API_URLS from "../../shared/api/api_routes";

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



const TerminateUserSession = async (formData) => {
    try {
      const response = await api.post(API_URLS.AUTH.TERMINATE_TOKEN, formData)
      return response.data
    }
    catch (error) {
      throw error
    }
  }

export {TerminateUserSession, loginUser}
