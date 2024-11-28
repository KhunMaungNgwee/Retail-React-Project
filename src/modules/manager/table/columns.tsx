
import { ColumnDef } from "@tanstack/react-table";
import { GetAllOrderWithProductModel } from "@/api/order/types";
import { format } from "date-fns";

export const columns: ColumnDef<GetAllOrderWithProductModel>[] = [
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
    accessorKey: "ProfitPerItem",
    header: "Profit",
    cell: ({ row }) => <div>{row.original.profitPerItem}</div>,
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
  {
    accessorKey: "Sale Date",
    header: "Sale Date",
    cell: ({ row }) => (
      <div>
        {row.original.orderCreatedTime
          ? format(new Date(row.original.orderCreatedTime), "MMM dd, yyyy") // Format as "Nov 12, 2024"
          : "N/A"} {/* Handle cases where orderCreatedTime is missing */}
      </div>
    ),
  },
];
