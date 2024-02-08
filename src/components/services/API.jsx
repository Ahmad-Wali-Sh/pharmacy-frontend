import axios from "axios";
import { QueryClient } from "react-query";
import { toast } from "react-toastify";

async function loadEnvVariables(key) {
  try {
      const response = await fetch('/env.json');
      const data = await response.json();
      return data[key] || null; // Return the value corresponding to the provided key, or null if not found
  } catch (error) {
      console.error('Error loading environment variables:', error);
      return null; // Return null if there's an error
  }
}

// It is a Default Query For more usablitiy.
const defaultQueryFn = async ({ queryKey }) => {
  try {
    // Get the value of VITE_API from env.json
    const api = await loadEnvVariables('VITE_API');
    
    // Ensure api is not null or undefined
    if (!api) {
      throw new Error('VITE_API value not found');
    }
    
    // Make the axios request using the api value
    const { data } = await axios.get(api + queryKey[0]);
    return data;
  } catch (error) {
    console.error('Error in defaultQueryFn:', error);
    throw error; // Re-throw the error to be handled by React Query
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
    const API_URL = await loadEnvVariables('VITE_API'); // Retrieve the API_URL value from env.json
    return axios.post(API_URL + api, data);
  } catch (error) {
    console.error('Error performing POST request:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const putDataFn = async (data, api) => {
  try {
    const API_URL = await loadEnvVariables('VITE_API'); // Retrieve the API_URL value from env.json
    return axios.put(API_URL + api, data);
  } catch (error) {
    console.error('Error performing PUT request:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const patchDataFn = async (data, api) => {
  try {
    const API_URL = await loadEnvVariables('VITE_API'); // Retrieve the API_URL value from env.json
    return axios.patch(API_URL + api, data);
  } catch (error) {
    console.error('Error performing PATCH request:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const deleteDataFn = async (api) => {
  try {
    const API_URL = await loadEnvVariables('VITE_API'); // Retrieve the API_URL value from env.json
    return axios.delete(API_URL + api);
  } catch (error) {
    console.error('Error performing DELETE request:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// it is a default success function to do its job
export const successFn = (invalidKey, func) => {
  toast.success("در خواست موفقانه بود");
  // queryClient.invalidateQueries(invalidKey, {
  //   refetchInactive: true,
  //   refetchType: "all",
  // });
  setTimeout(() => {
    queryClient.invalidateQueries();
  }, 200);
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
