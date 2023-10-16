import axios from "axios";
import { QueryClient } from "react-query";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API;

// It is a Default Query For more usablitiy.
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(API_URL + queryKey[0]);
  return data;
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
export const postDataFn = (data, api) => {
  return axios.post(API_URL + api, data);
};

export const putDataFn = (data, api) => {
  return axios.put(API_URL + api, data);
};

export const patchDataFn = (data, api) => {
  return axios.patch(API_URL + api, data);
};

export const deleteDataFn = (api) => {
  return axios.delete(API_URL + api);
};

// it is a default success function to do its job
export const successFn = (invalidKey, func) => {
  toast.success("درخواست موفقانه بود");
  queryClient.invalidateQueries(invalidKey, {refetchInactive: true, refetchType: 'all'});
  func();
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
