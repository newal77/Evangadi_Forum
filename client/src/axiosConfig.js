import axios from "axios";
 const token = localStorage.getItem("token");
const axiosBase = axios.create({
  baseURL: "http://localhost:5550/api", 
});

export default axiosBase;
