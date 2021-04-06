import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://118.32.187.82:3000/api/v0',
    timeout: 1000 * 60,
  });

instance.interceptors.request.use(
    (config)=>{
        // config.headers['x-access-token'] = window.sessionStorage.getItem("token");
        return config;
    }
    ,(error)=>{
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;