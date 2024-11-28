

import { ColumnDef } from "@tanstack/react-table";

import { ProductType } from "@/api/product/types";


export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "sellingPrice",
    header: "Price",
    cell: ({ row }) => <div>{row.original.sellingPrice}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>, 
  },

];
