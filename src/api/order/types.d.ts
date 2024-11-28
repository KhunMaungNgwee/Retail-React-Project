

export type PurchaseProductInput = PurchaseProductModel | PurchaseProductModel[];

export type PurchaseProductModel = {
    productID: string;
    quantity: number;
};

export type ProductOrderPaginationType = {
    items: GetAllOrderWithProductModel[];  
    page: number;                  
    pageSize: number;               
    totalCount: number;           
    totalPages: number;            
  };

  export type GetAllOrderWithProductModel= {
    productID: string;
    orderID:string;
    productName: string;   
    sellingPrice: number;
    profitPerItem: number;
    totalRevenue: number;
    totalProfit: number;
    orderCreatedTime: string;
    quantity:number;
  }

  type ProductOrderWithPaginationResDTO<T> = ProductOrderPaginationType & {
    totalRevenue: number;
    totalProfit: number;
  };