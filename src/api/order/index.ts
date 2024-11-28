import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ProductOrderPaginationType, PurchaseProductInput } from "./types";
import orderService from './services'
import { APIResponse } from "@/shared/types";

export const purchaseProduct = {
    useMutation: (
      opt?: UseMutationOptions<any, Error, PurchaseProductInput, any>
    ) =>
      useMutation({
        mutationKey: ["purchaseProduct"],
        mutationFn: (payload: PurchaseProductInput) =>
          orderService.purchaseProduct(payload),
        ...opt,
      }),
  };

  export const fetchAllProductOrder = {
    useQuery: (queryKey: [number, number,string,string],opt?: UseQueryOptions<ProductOrderPaginationType, Error>
    ) =>{ return useQuery<ProductOrderPaginationType, Error>({
            queryKey,
            enabled:(!!queryKey),
            queryFn: async () => {
                const [page, pageSize,startDate,endDate] = queryKey;
              const response: APIResponse<ProductOrderPaginationType> =
                await orderService.fetchAllProductOrder(page,pageSize,startDate,endDate);
              return response.data;
            },
            ...opt
          });
    },
  };

 
 