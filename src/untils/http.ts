import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum';
import { toast } from 'react-toastify';
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: { 'content-type': 'application/json' }
    }),
   this.instance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function onRejected(error:AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response?.status !== HttpStatusCode.UnprocessableEntity){
      const data:any = error.response?.data
      const message = data?.message || error.message
      toast.error(message)
    }
    return Promise.reject(error);
  }); 
  }
}
const http = new Http().instance
export default http
