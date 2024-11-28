import axios from "axios";
import { ProductOrderPaginationType, PurchaseProductInput } from "./types";
import { APIResponse } from "@/shared/types";
const baseUrl = "/Order";
const url='/Product'
const purchaseProduct = async (payload: PurchaseProductInput) => {
  const formattedPayload = Array.isArray(payload) ? payload : [payload];

  const response = await axios.post(
    `${baseUrl}/PurchaseProduct`,
    formattedPayload
  );
  return response.data;
};
const fetchAllProductOrder = async (
  page: number,
  pageSize: number,
  startDate?:string ,
  endDate?:string,
): Promise<APIResponse<ProductOrderPaginationType>> => {
  const response = await axios.get<APIResponse<ProductOrderPaginationType>>(
    `${url}/GetProductOrderWithPagination?Page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`
  );
  return response.data;
};

export default {
  purchaseProduct,
  fetchAllProductOrder
};
