import axios from "axios";
import {
  AddProductModel,
  ProductPaginationType,
  ProductType,
  UpdateProductModel,
} from "./types";
import { APIResponse } from "@/shared/types";

const baseUrl = "/Product";

const getAllProduct = async (): Promise<APIResponse<ProductType[]>> => {
  const response = await axios.get<APIResponse<ProductType[]>>(
    `${baseUrl}/GetAllProduct`
  );
  return response.data;
};

const getProductWithPagination = async (
  page: number,
  pageSize: number
): Promise<APIResponse<ProductPaginationType>> => {
  const response = await axios.get<APIResponse<ProductPaginationType>>(
    `${baseUrl}/GetAllProductsWithPagination?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};
const AddProduct = async (payload: AddProductModel) => {
  const response = await axios.post(`${baseUrl}/AddNewProduct`, payload);
  return response.data;
};
const DeleteProduct = async (id: string) => {
  const response = await axios.post(`${baseUrl}/DeleteProduct?id=${id}`);
  return response.data;
};

const UpdateProduct = async (payload: UpdateProductModel) => {
  const response = await axios.post(`${baseUrl}/UpdateProduct`, payload);
  return response.data;
};
export default {
  getAllProduct,
  getProductWithPagination,
  AddProduct,
  DeleteProduct,
  UpdateProduct,
};
