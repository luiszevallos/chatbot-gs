import axios, { AxiosRequestConfig } from "axios";
import { HEADER_JWT, HOST_API, NUMBER_PHONE_ID } from "../../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `${HOST_API}`,
  headers: {
    Authorization: `Bearer ${HEADER_JWT}`,
  },
});

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  messages: `/${NUMBER_PHONE_ID}/messages`,
};
