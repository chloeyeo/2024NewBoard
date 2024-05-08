import axios from "axios";

const axiosInstance = axios.create({
    // must start with "REACT_APP"
    baseURL: process.env.REACT_APP_NODE_SERVER_URL,
});

export default axiosInstance;
