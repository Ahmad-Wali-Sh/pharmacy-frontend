import axios from 'axios';
import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { fetchServerIP } from './serverUtil';

const defaultQueryFn = async ({ queryKey }) => {
  try {
    const serverIP = await fetchServerIP();
    const response = await axios.get(serverIP + "api/" + queryKey[0]);
    return response.data;
  } catch (error) {
    toast.error('خطا در بارگیری اطلاعات.');
    throw error; // Rethrow the error to be caught by React Query
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const createDataFn = (method) => async (data, api) => {
  try {
    const serverIP = await fetchServerIP();
    const response = await axios[method](serverIP + "api/" + api, data);
    return response.data;
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    toast.warning('شما قابل به انجام این عملیات نیستید');
    throw error; // Rethrow the error to be caught by React Query
  }
};

export const postDataFn = createDataFn('post');
export const putDataFn = createDataFn('put');
export const patchDataFn = createDataFn('patch');
// export const deleteDataFn = createDataFn('delete');


export const deleteDataFn = async (api) => {
  try {
    await fetchServerIP();
    const response = await axios.delete(serverIP + "api/" + api);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    toast.warning('شما قابل به انجام این عملیات نیستید');
    throw error; // Rethrow the error to be caught by React Query
  }
};

export const successFn = (invalidKey, func) => {
  toast.success('در خواست موفقانه بود');
  setTimeout(() => {
    queryClient.invalidateQueries();
  }, 200);
  func && func();
};

export const handleFormData = (data, mutationFun, user) => {
  const form = new FormData();
  Object.keys(data).forEach(key => form.append(key, data[key]));
  form.append("user", user().id);
  mutationFun(form);
};