import { ProductType } from "@/api/product/types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { addToCart, removeFromCart } from "@/slices/cartSlice";
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import { toast } from "@/hooks/use-toast";

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
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div>{row.original.stock}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = useAppSelector((state) => {
        const currentItem = state.cart.cart.find(
          (item) => item.productID === row.original.productID
        );
        return currentItem ? currentItem.quantity : 0;
      });
      return <div>{quantity}</div>;
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }: { row: { original: ProductType } }) => {
      const dispatch = useDispatch();

      // Extract quantity from the cart
      const quantity = useAppSelector((state) => {
        const currentItem = state.cart.cart.find(
          (item) => item.productID === row.original.productID
        );
        return currentItem ? currentItem.quantity : 0;
      });

      // Pre-create cartItem outside the button handlers
      const cartItem = {
        productID: row.original.productID,
        productName: row.original.productName,
        sellingPrice: row.original.sellingPrice,
        quantity: 1,
        stock: row.original.stock,
        profitPerItem: row.original.profitPerItem,
      };

      const handleIncreateItem = () => {
        if (quantity + cartItem.quantity > cartItem.stock) {
          toast({
            title: "Error",
            description: "Cannot add more items than available in stock!",
            variant: "destructive",
          });
          return;
        }

        dispatch(addToCart(cartItem));
      };

      const handleDecreateItem = () => {
        dispatch(removeFromCart(row.original.productID));
      };

      return (
        <div className="flex justify-center items-center space-x-4">
          <Button
            onClick={()=>handleDecreateItem()}
            className="text-center bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-700 transition"
          >
            <AiOutlineShoppingCart className="w-5 h-5" />
            <AiOutlineMinusCircle className="w-5 h-5" />
          </Button>
          <Button
            onClick={()=>handleIncreateItem()}
            className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            <AiOutlineShoppingCart className="w-5 h-5" />
            <AiOutlinePlusCircle className="w-5 h-5" />
          </Button>
        </div>
      );
    },
  },
];
