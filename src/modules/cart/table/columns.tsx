
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { addToCart, removeFromCart, RemoveItem } from "@/slices/cartSlice";  
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
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
  // {
  //   accessorKey: "quantity",
  //   header: "Quantity",
  //   cell: ({ row }) => <div>{row.original.quantity}</div>, 
  // },
  {
    accessorKey: 'Quantity',
    header: 'Quantity',
    cell: ({ row }) => {
      const dispatch = useDispatch();

      
      const IncreateItem = () => {
        const cartItem = {
          productID: row.original.productID,
          productName: row.original.productName,
          sellingPrice: row.original.sellingPrice,
          quantity: 1, 
          stock: row.original.stock,
          profitPerItem: row.original.profitPerItem
        };
        dispatch(addToCart(cartItem)); 
      };

    
      const DecreateItem = () => {
        dispatch(removeFromCart(row.original.productID)); 
      };

      return (
        <div className="flex justify-center items-center space-x-4">
          {/* Button to decrease item */}
          <Button
            onClick={DecreateItem}
            className="flex items-center bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition"
          >
          
            <AiOutlineMinusCircle className="w-5 h-5" />
          </Button>&nbsp;&nbsp;
          {row.original.quantity}
          {/* Button to increase item */}
          <Button
            onClick={IncreateItem}
            className="flex items-center bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            
            <AiOutlinePlusCircle className="w-5 h-5" />
          </Button>

         
        </div>
      );
    },
  },
  {
    accessorKey: 'Action',
    header: 'Action',
    cell: ({ row }) => {
      const dispatch = useDispatch();

      const removeItem = () => {
        dispatch(RemoveItem(row.original.productID)); 
      };

      return (
        <div className="flex justify-center items-center space-x-4">
         

          {/* Button to completely remove item */}
          <Button
            onClick={removeItem}
            className="flex items-center bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Remove
          </Button>
        </div>
      );
    },
  }
];
