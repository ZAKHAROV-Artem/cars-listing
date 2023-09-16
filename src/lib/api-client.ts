import axios from "axios";
import Cookies from "js-cookie";

const fetcherAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${Cookies.get("jwt")}`;
  return config;
};

fetcherAuth.interceptors.request.use(authInterceptor);

export { fetcherAuth, fetcher };
