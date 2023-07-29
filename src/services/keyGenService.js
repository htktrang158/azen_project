import queryString from "query-string";
import request from "../utils/request";

export const getAllKeyGenService = () => {
    return request(`https://api-uat-anzen-tms.azurewebsites.net/api/KeyGens`, {
        method: "GET",
    });
};
