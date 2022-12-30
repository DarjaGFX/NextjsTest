import axios from "axios";
import vars from "../vars";

// axios.defaults.paramsSerializer = function (params) {
//   return qs.stringify(params, { indices: false }); // param=value1&param=value2
// };

const api = axios.create({
  // baseURL: "http://localhost:8005/api/v1/",
  // baseURL: process.env.BASE_URL,
  baseURL: vars.axios_baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
