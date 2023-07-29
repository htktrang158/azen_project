import request from "../utils/request";
export const authService = (params) => {
  return request(
    "https://api-uat-anzen-tms.azurewebsites.net/api/Account/login",
    {
      method: "POST",
      data: params,
    }
  );
};
export const getUserProfileService = () => {
  return request(
    "https://api-uat-anzen-tms.azurewebsites.net/api/Account/get-user-profile",
    {
      method: "GET",
    }
  );
};

export const refreshTokenService = () => {
  return request(
    "https://api-uat-anzen-tms.azurewebsites.net/api/Account/refresh-token",
    {
      method: "POST",
    }
  );
};
