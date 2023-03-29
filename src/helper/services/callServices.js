import axios from 'axios';
import { SERVICES } from '../config/config';

const productAxios = axios.create({ baseURL: SERVICES.PRODUCT.BASE_URL });
const warehouseAxios = axios.create({ baseURL: SERVICES.WAREHOUSE.BASE_URL });
const mediaAxios = axios.create({ baseURL: SERVICES.MEDIA.BASE_URL });
const bannerAxios = axios.create({ baseURL: SERVICES.BANNER.BASE_URL });
const menuAxios = axios.create({ baseURL: SERVICES.MENU.BASE_URL });

const callServices = (axios, SERVICES) => {
  return async (method, service, payload, auth, controller) => {
    let { params, ...data } = payload;
    method = method.toUpperCase();
    let config = { headers: {} };
    if (controller) config.signal = controller.signal;
    if (auth) config.headers.Authorization = auth;
    let endpoint = SERVICES[method][service];
    if (!endpoint) throw new Error(`Service ${service} not found`);
    if (params) endpoint += '/' + params;
    let result = null;
    if (method === 'GET') {
      try {
        let res = await axios.get(endpoint, {
          ...config,
          params: data,
        });
        result = res.data.data;
      } catch (err) {
        let message = err.response && err.response.data ? err.response.data.error : err.message;
        throw new Error(message);
      }
    }
    if (method === 'POST') {
      try {
        let res = await axios.post(endpoint, data, config);
        result = res.data.data;
      } catch (err) {
        let message = err.response && err.response.data ? err.response.data.error : err.message;
        throw new Error(message);
      }
    }
    if (method === 'PUT') {
      try {
        let res = await axios.put(endpoint, data, config);
        result = res.data.data;
      } catch (err) {
        let message = err.response && err.response.data ? err.response.data.error : err.message;
        throw new Error(message);
      }
    }
    if (method === 'DELETE') {
      try {
        let res = await axios.delete(endpoint, {
          ...config,
          params: data,
        });
        result = res.data.data;
      } catch (err) {
        let message = err.response && err.response.data ? err.response.data.error : err.message;
        throw new Error(message);
      }
    }
    if (method === 'DOWNLOAD') {
      config.responseType = 'blob';
      try {
        let res = await axios.get(endpoint, {
          ...config,
          params: data,
        });
        let contentDisposition = res.headers['content-disposition'];
        let filename = 'file.xlsx';
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch.length === 2) filename = fileNameMatch[1];
        }
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        let message = err.response && err.response.data ? err.response.data.error : err.message;
        throw new Error(message);
      }
    }
    return result;
  };
};

export const callProductService = callServices(productAxios, SERVICES.PRODUCT.ENDPOINT);
export const callWarehouseService = callServices(warehouseAxios, SERVICES.WAREHOUSE.ENDPOINT);
export const callMediaService = callServices(mediaAxios, SERVICES.MEDIA.ENDPOINT);
export const callBannerService = callServices(bannerAxios, SERVICES.BANNER.ENDPOINT);
export const callMenuService = callServices(menuAxios, SERVICES.MENU.ENDPOINT);
