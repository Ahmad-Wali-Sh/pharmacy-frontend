import axios from "axios";
import { QueryClient } from "react-query";
import { toast } from "react-toastify";

const EndpointsURL = "http://127.0.0.1:4000/api/endpoints";

let serverIP = null;
function fetchServerIP() {
  return axios.get(EndpointsURL)
    .then(response => {
      serverIP = response.data.server_ip;
      return serverIP;
    })
    .catch(error => {
      console.log(error);
      // Handle the error if necessary
      return null; // Return null or handle the error accordingly
    });
}

fetchServerIP()

// It is a Default Query For more usablitiy.
const defaultQueryFn = async ({ queryKey }) => {
  try {
    const response = await axios.get(serverIP + "api/" + queryKey[0]);
    return response.data;
  } catch (error) {
    toast.error('خطا در بارگیری اطلاعات.')
    throw error; // Rethrow the error to be caught by React Query
  }
};

// our main queryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

// it is a default posting function to be used for api
export const postDataFn = async (data, api) => {
  try {
    const response = await axios.post(serverIP + "api/" + api, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    toast.warning('شما قابل به انجام این عملیات نیستید')
    throw error; // Rethrow the error to be caught by React Query
  }
};

export const putDataFn = async (data, api) => {
  try {
    const response = await axios.put(serverIP + "api/" + api, data);
    return response.data;
  } catch (error) {
    console.error("Error putting data:", error);
    toast.warning('شما قابل به انجام این عملیات نیستید')
    throw error; // Rethrow the error to be caught by React Query
  }
};

export const patchDataFn = async (data, api) => {
  try {
    const response = await axios.patch(serverIP + "api/" + api, data);
    return response.data;
  } catch (error) {
    console.error("Error patching data:", error);
    toast.warning('شما قابل به انجام این عملیات نیستید')
    throw error; // Rethrow the error to be caught by React Query
  }
};

export const deleteDataFn = async (api) => {
  try {
    const response = await axios.delete(serverIP + "api/" + api);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    toast.warning('شما قابل به انجام این عملیات نیستید')
    throw error; // Rethrow the error to be caught by React Query
  }
};

// it is a default success function to do its job
export const successFn = (invalidKey, func) => {
  toast.success('در خواست موفقانه بود')
  // queryClient.invalidateQueries(invalidKey, {
  //   refetchInactive: true,
  //   refetchType: "all",
  // });
  setTimeout(() => {
    queryClient.invalidateQueries()
  }, 200)
  func && func();
};

// it is a function that gets data from react hook form and translate it into Form for submiting.
export const handleFormData = (data, mutationFun, user) => {
  const Form = new FormData();
  const result = Object.keys(data).map((key) => [key, data[key]]);
  result.map((field) => {
    Form.append(field[0], field[1]);
  });
  Form.append("user", user().id);
  mutationFun(Form);
};
