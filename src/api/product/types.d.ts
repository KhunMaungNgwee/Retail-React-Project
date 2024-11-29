export type ProductType = {
  quantity: number;
  productID: string;
  productName: string;
  stock: number;
  sellingPrice: number;
  profitPerItem: number;
};

export type ProductPaginationType = {
  items: Product[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export type UpdateProductModel = {
  productID: string;
  productName: string;
  stock: number;
  sellingPrice: number;
  profitPerItem: number;
};

export type AddProductModel = {
  productName: string;
  stock: number;
  sellingPrice: number;
  profitPerItem: number;
};
