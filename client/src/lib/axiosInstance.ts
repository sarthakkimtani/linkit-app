import axios from "axios";

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const refreshAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const { data } = await refreshAxiosInstance.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return await axiosInstance.request(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
