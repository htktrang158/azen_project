import queryString from "query-string";
import request from "../utils/request";

export const getAllUserService = (data) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser?${queryString.stringify(data)}`, {
        method: "GET",
    });
};
export const CreateUserService = (params) => {
    return request("https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser/register", {
        method: "POST",
        data:params,
    });
};
export const UpdateUserService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser/${id}`, {
        method: "PUT",
    });
};
export const getAllRoleService = () => {
    return request("https://api-uat-anzen-tms.azurewebsites.net/api/roles", {
        method: "GET",
    });
};
export const getActiveService = (id) => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/ApplicationUser/active/${id}`, {
        method: "PUT",
    });
};
