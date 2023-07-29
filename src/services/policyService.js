import queryString from "query-string";
import request from "../utils/request";

export const getAllPolicyService = (data) => {
  return request(
    `https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings?${queryString.stringify(data)}`,
    {
      method: "GET",
    }
  );
};

export const getDetailPolicyService = (id) => {
  return request(
    `https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/${id}`,
    {
      method: "GET",
    }
  );
};
export const UpladFileImage = (params) => {
  return request(
    "https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/upload",
    {
      method: "POST",
      data: params,
    }
  );
};

export const ExportPDF = (data) => {
  return request(
    `https://api-uat-anzen-tms.azurewebsites.net/api/BillOfLadings/export?${queryString.stringify(
      data
    )}`,
    {
      method: "GET",
    }
  );
};

export const GetDriver = (id) => {
  return request(
    `https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/${id}`,
    {
      method: "GET",
    }
  );
};

export const GetDriverLicence = () => {
  return request(
    `https://api-uat-anzen-tms.azurewebsites.net/api/Drivers/search-by-licenseplate`,
    {
      method: "GET",
    }
  );
};

export const getAllGetforbl = () => {
  return request(
    `https://api-uat-anzen-tms.azurewebsites.net/api/DeliveryOrders/getforbl`,
    {
      method: "GET",
    }
  );
};

export const getUserRoles = () => {
  return request("https://api-uat-anzen-tms.azurewebsites.net/api/roles", {
    method: "GET",
  });
};
