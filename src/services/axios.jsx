import axios from "axios";

const baseURL = `REACT_APP_BASE_URL`

export const client = axios.create({
  baseURL
})

client.interceptors.request.use((config) => {
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error
  }
);