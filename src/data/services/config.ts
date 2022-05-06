import axios  from 'axios';
import { cookiesNewName, cookiesName, cookiesDetailName } from '../global/variables';
import Cookies from 'js-cookie';

export const BaseApiUrl = "https://agapi.moduit.id/";
export const DataService = axios.create({baseURL: BaseApiUrl});

DataService.defaults.headers["md-token"] = "";

// Handle 401 
// Add a response interceptor
DataService.interceptors.response.use(function (response) {
    let _headers = response.headers || {};
    let token = _headers[cookiesNewName];
    if (token) {
        axios.defaults.headers.common['md-token'] = token;
        Cookies.set(cookiesName, token);
    }

    return response;
}, error => {
    // Do something with response error
    let errObj = JSON.parse(JSON.stringify(error));
    if ((errObj as any).response.status === 401) {
        // handle this
        console.log('Quiting application as token is expired');

        Cookies.remove(cookiesName);
        Cookies.remove(cookiesDetailName);

        window.location.href = window.location.pathname;
    }
    return Promise.reject(error);
});