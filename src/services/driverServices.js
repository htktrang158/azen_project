import queryString from "query-string";
import request from "../utils/request";

export const getAllDriversService = (data) => {
    return request(
        `https://api-uat-anzen-tms.azurewebsites.net/api/Drivers?${queryString.stringify(data)}`,
        {
            method: "GET",
        }
    );
};
export const CreateDriversService = (params) => {
    return request(
        "https://api-uat-anzen-tms.azurewebsites.net/api/Drivers",
        {
            method: "POST",
            data: params,
        }
    );
};
export const DeleteDriversService = (id) => {
    return request(
        `https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/${id}`,
        {
            method: "DELETE",
        }
    );
};