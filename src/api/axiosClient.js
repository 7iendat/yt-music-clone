import axios from 'axios'
import apiConfig from './apiConfig'
 const axiosClient = axios.create({
    baseURL:  apiConfig.baseURL,
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials' : true
    }
});
export const axiosMusic = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
})
export default axiosClient;