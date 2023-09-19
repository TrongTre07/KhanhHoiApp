import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Storage from '../utils/storage';
import DeviceInfo from 'react-native-device-info';

const instance = axios.create({
  baseURL: 'https://api-bieumau.khanhhoi.net/',
});

instance.interceptors.request.use(
  async config => {
    try {
      // const [APIKey, Clientip] = await Promise.all([
      //   Storage.getItem('token'),
      //   DeviceInfo.getIpAddress(),
      // ]);

      // const [APIKey, Clientip] = Promise.all([ Storage.getItem('token'),  DeviceInfo.getIpAddress()]);

      // const maxWaitTime = 10;
      // const startTime = Date.now();
      // while (Clientip === "0.0.0.0" && (Date.now() - startTime) < maxWaitTime) {
      //   Clientip = await DeviceInfo.getIpAddress();
      // }
      // '113.161.84.249'
      let APIKey = await Storage.getItem('token')
      config.headers['Clientip'] =  '113.161.84.249';
      config.headers['APIKey'] = APIKey;

      return config;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default instance;
