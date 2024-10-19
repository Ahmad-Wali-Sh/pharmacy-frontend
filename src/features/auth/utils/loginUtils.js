import api from "../../shared/services/api";

const loginUser = async (formData) => {
    try {
      const response = await api.post(`auth/token/login/`, formData, {
        headers: {
          Authorization: ''
        }
      });
      return response.data.auth_token;
    } catch (error) {
      throw error
    }
};



const TerminateUserSession = async (formData) => {
    try {
      const response = await api.post('auth/terminate-token/', formData)
      return response.data
    }
    catch (error) {
      throw error
    }
  }

export {TerminateUserSession, loginUser}
