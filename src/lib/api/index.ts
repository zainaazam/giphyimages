import Axios, {AxiosResponse, AxiosError, AxiosStatic} from 'axios';
import _, {get} from 'lodash';
export const PRODUCTION_API = 'https://api.giphy.com/v1/';
export const API_KEY = 'zTpfRXB9MNs7uapMkktGrMVhqvqUpjqt';

const AUTH_HEADER = 'Authorization';

const request = Axios as AxiosStatic & {
  setSession: any;
  removeSession: any;
  setUrl: any;
  setLanguage: any;
};

export async function getBaseUrl() {
  const baseURL = PRODUCTION_API;
  return baseURL;
}

const onSuccess = function (response: AxiosResponse) {
  // console.warn('Request Successful!', response);
  return response.data;
};

const onError = async function async(error: AxiosError) {
  console.error('FAILED Response!:', get(error, 'response'));
  console.error('FAILED Status:', get(error, 'response.status'));
  console.error('FAILED Data:', get(error, 'response.data'));
  console.error('FAILED Data:', get(error, 'response.data.code'));
  console.error('FAILED Headers:', get(error, 'response.headers'));

  if (error.response) {
    return Promise.reject(error.response);
  } else {
    return Promise.reject(error);
  }
};

request.interceptors.request.use(config => {
  console.log(config);
  return config;
});

request.interceptors.response.use(onSuccess, onError);

request.defaults.headers['accept-language'] = 'en';
request.defaults.headers['access-control-allow-origin'] = '*';
request.defaults.baseURL = PRODUCTION_API;

request['setUrl'] = async function () {
  const url = await getBaseUrl();
  this.defaults.baseURL = url;
};

request['setLanguage'] = function (language: string) {
  this.defaults.headers['language'] =
    typeof language === 'string' ? language : 'ar';
};

request['setSession'] = function ({token}: {token: string}) {
  request.defaults.headers[AUTH_HEADER] = `Bearer ${token}`;
};

request['removeSession'] = function () {
  delete this.defaults.headers[AUTH_HEADER];
};

export default request;
