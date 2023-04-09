import axios from "axios";

const request = axios.create({
  baseURL: "user_api",
});

export default request;
