import api from "../../shared/services/api";

const loginUser = async (formData) => {
    try {
      const response = await api.post(`api/login/`, formData, {
        headers: {
          Authorization: ''
        }
      });
      console.log(response.data)
      return response.data.token;
    } catch (error) {
      throw error
    }
};



const TerminateUserSession = async (formData) => {
    try {
      const response = await api.post('api/terminate-token/', formData)
      return response.data
    }
    catch (error) {
      throw error
    }
  }

export {TerminateUserSession, loginUser}
