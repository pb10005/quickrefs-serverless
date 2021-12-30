import axios from "axios";

const instance = axios.create({
    //baseURL: 'https://192.168.2.21:7090/api',
    baseURL: 'https://192.168.2.56:7090/api',
    timeout: 1000,
  });

export default instance;
