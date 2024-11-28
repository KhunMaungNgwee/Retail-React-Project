
import { ColumnDef } from "@tanstack/react-table";
import { ProductType } from "@/api/product/types";

import { UpdateProductDialog } from "@/components/dialog";
import DeleteAlertDialog from "@/components/dialog/DeleteAlertDialog";


export const columns= (refetch: () => void): ColumnDef<ProductType>[] => [
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
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div>{row.original.stock}</div>,
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: ProductType } }) => {
     

      return (
        <div className="flex justify-center items-center space-x-4">
          <UpdateProductDialog 
            item={row.original}
            onProductUpdated={refetch}
          />
   
          <DeleteAlertDialog item={row.original} onDeleteProduct={refetch} />
        </div>
      );
    },
  },
];
