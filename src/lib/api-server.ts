import axios from "axios";

const fetcherServer = axios.create({
  baseURL: process.env.API_URL,
});

export { fetcherServer };
