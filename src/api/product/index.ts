import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  ProductType,
  ProductPaginationType,
  AddProductModel,
  UpdateProductModel,
} from "./types";
import { APIResponse } from "@/shared/types";
import productService from "./services";

export const getAllProduct = {
  useQuery: (opt?: UseQueryOptions<ProductType[], Error>) =>
    useQuery<ProductType[], Error>({
      queryKey: ["fetchProduct"],
      queryFn: async () => {
        console.log("fetchProduct");
        const response: APIResponse<ProductType[]> =
          await productService.getAllProduct();
        return response.data;
      },
      ...opt,
    }),
};

export const getAllProductsWithPagination = {
  useQuery: (
    queryKey: [number, number],
    opt?: UseQueryOptions<ProductPaginationType, Error>
  ) => {
    return useQuery<ProductPaginationType, Error>({
     
      queryKey:['getAllProductsWithPagination'],
      enabled: !!queryKey,
      queryFn: async () => {
        const [page, pageSize] = queryKey;
        const response: APIResponse<ProductPaginationType> =
          await productService.getProductWithPagination(page, pageSize);
        return response.data;
      },
      ...opt,
    });
  },
};

export const addNewProduct = {
  useMutation: (opt?: UseMutationOptions<any, Error, AddProductModel, any>) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["AddProduct"],
      mutationFn: (payload: AddProductModel) =>
        productService.AddProduct(payload),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getAllProductsWithPagination"],
        });
      },
      ...opt,
    });
  },
};
export const deleteProduct = {
  useMutation: (opt?: UseMutationOptions<any, Error, string, any>) =>
    useMutation({
      mutationKey: ["DeleteProduct"],
      mutationFn: (id: string) => productService.DeleteProduct(id),
      ...opt,
    }),
};
export const updateProduct = {
  useMutation: (
    opt?: UseMutationOptions<any, Error, UpdateProductModel, any>
  ) =>
    useMutation({
      mutationKey: ["UpdateProduct"],
      mutationFn: (payload: UpdateProductModel) =>
        productService.UpdateProduct(payload),
      ...opt,
    }),
};
