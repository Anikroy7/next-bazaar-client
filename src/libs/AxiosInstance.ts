  import axios from "axios";
  import { toast } from "sonner";

  import { getAccessToken } from "../config/cookie";

  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async function (config) {
      const accessToken = await getAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    function (error) {
      toast.error(error.message);

      return Promise.reject(error);
    },
  );

  /* axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const config = error.config;

      if (error?.response?.status === 401 && !config?.sent) {
        config.sent = true;
        const res = await getNewAccessToken();
        const accessToken = res.data.accessToken;

        config.headers["Authorization"] = accessToken;
        (await cookies()).set("accessToken", accessToken);

        return axiosInstance(config);
      } else {
        return Promise.reject(error);
      }
    }
  );

  */
  export default axiosInstance;
