import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { columns } from "@/modules/cashier/table/columns";
import { useAppSelector, useAppDispatch } from "@/store";
import { toast } from "@/hooks/use-toast";
import { purchaseProduct } from "@/api/order";
import { PurchaseProductInput } from "@/api/order/types";
import { useState } from "react";
import { clearCart } from "@/slices/cartSlice";

const CashoutDialog = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch(); 

  const cartItems = useAppSelector((state) => state.cart.cart);
  const totalCartItems = useAppSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const totalPrice = useAppSelector((state) =>
    state.cart.cart.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    )
  );
  const [page,setPage]=useState(0)
  const [pageSize,setPageSize]=useState(0)
  const [totalPage,setTotalPage]=useState(0)

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const addRevenueAndProfit = () => {
    const revenue = totalPrice;
    const profit = cartItems.reduce((acc, item) => {
      const profitPerItem = item.sellingPrice - item.profitPerItem;
      return acc + profitPerItem * item.quantity;
    }, 0);

    setTotalRevenue((prev) => prev + revenue);
    setTotalProfit((prev) => prev + profit);
  };

  const { mutate: PurchaseProduct } = purchaseProduct.useMutation({
    onMutate: () => {
      toast({ title: "Processing payment..." });
    },
    onSuccess: () => {
      toast({
        title: "Transaction successful!",
        description: `Total: ${totalPrice.toFixed(2)} MMK`,
        variant: "success",
      });
      addRevenueAndProfit();
      dispatch(clearCart()); // Clear cart on success
      setDialogOpen(false); // Close the dialog
    },
    onError: (error) => {
      toast({
        title: "Transaction failed",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const purchase = (products: PurchaseProductInput) => {
    const productsArray = Array.isArray(products) ? products : [products];
    PurchaseProduct(productsArray);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center mt-6 mb-2 text-3xl font-semibold">
          <Button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400" 
            onClick={() => setDialogOpen(true)} disabled={cartItems.length===0}
          >
            Process to Payment
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto mb-6">
          <DataTable columns={columns}
           data={cartItems || []}
           page={page}
           pageSize={pageSize}
           totalPage={totalPage}
           onPageChange={setPage}
            />
        </div>
        {/* Total Price */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-semibold">Total Quantity:</p>
          <p className="text-lg font-semibold text-gray-700">
            {totalCartItems}
          </p>
          <br />
          <p className="text-lg font-semibold">Total Price:</p>
          <p className="text-lg font-semibold text-gray-700">
            {totalPrice.toFixed(2)} MMK
          </p>
        </div>
        {/* Cash Out Button */}
        <div className="text-center">
          <Button
            onClick={() => purchase(cartItems)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            CashOut
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashoutDialog;
