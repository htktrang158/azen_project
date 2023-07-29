import queryString from "query-string";
import request from "../utils/request";

export const getAllDeliveryOrderService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders?${queryString.stringify(data)}`, {
        method: "GET",
    });
};
export const getDetailDeliveryOrderService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/${id}`, {
        method: "GET",
    });
};
export const deleteDeliveryOrderService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/${id}`, {
        method: "DELETE",
    });
};
export const createDeliveryOrderService = (params) => {
    console.log(params, "jjjj");
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders`, {
        method: "POST",
        data: params,
    });
};
export const updateDeliveryOrderService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders`, {
        method: "PATCH",
        data: params,
    });
};
export const getSaleStaffService = () => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/get-sale-staff`, {
        method: "GET",
    });
};
export const uploadImageService = (params) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/upload`, {
        method: "POST",
        data: params,
    });
};
export const loadImageService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/download-multiple-files-as-links?${queryString.stringify(data)}`, {
        method: "GET",
    });
};
export const downloadImageService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/download-multiple-files-as-zip?${queryString.stringify(data)}`, {
        method: "GET",
    });
};
export const getAccountDeliveryOrderService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/accounting/${id}`, {
        method: "GET",
    });
};
