import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:9090/admin/api",
});

export default http;
