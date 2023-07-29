import request from "../utils/request";

export const getAllCustomersService = () => {
  return request(
    "https://api-uat-anzen-tms.azurewebsites.net/api/Customers",
    {
      method: "GET",
    }
  );
};
export const DeleteCustomersService = (id) => {
  return request(
    `https://api-uat-anzen-tms.azurewebsites.net/api/Customers/${id}`,
    {
      method: "DELETE",
    }
  );
};
export const UpdateCustomersService = (params) => {
  return request(
    "https://api-uat-anzen-tms.azurewebsites.net/api/Customers",
    {
      method: "POST",
      data: params,
    }
  );
};
