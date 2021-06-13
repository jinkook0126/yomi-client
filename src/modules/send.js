import axios from 'axios'
import EncryptedStorage from 'react-native-encrypted-storage';
const instance = axios.create({
    baseURL: 'http://192.168.0.16:3000/api/v0',
    timeout: 1000 * 60,
  });

instance.interceptors.request.use(
    async(config)=>{
        const storagedToken = await EncryptedStorage.getItem("jwt_token");
        if(storagedToken !== null) {
            const {token} = JSON.parse(storagedToken)
            if(token) config.headers['x-access-token'] = token;
        }
        
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