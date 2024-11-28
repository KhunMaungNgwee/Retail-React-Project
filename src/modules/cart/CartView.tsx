import { DataTable } from "@/components/data-table/DataTable";

import { columns } from "./table/columns";

import { useAppSelector } from "@/store";

import CashoutDialog from "../cashier/chunks/CashoutDialog";
import { useState } from "react";

const CartView = () => {
  const cartItems = useAppSelector((state) => state.cart.cart);
  const totalCartItems = useAppSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const totalPrice = useAppSelector((state) =>
    state.cart.cart.reduce(
      (total, item) => (total += item.sellingPrice * item.quantity),
      0
    )
  );

  const [page,setPage]=useState(0)
  const [pageSize,setPageSize]=useState(0)
  const [totalPage,setTotalPage]=useState(0)

  return (
    <>
      <h1 className="text-3xl font-semibold flex items-center justify-between mb-1">
        Cart Detail
      </h1>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">Total Items: {totalCartItems}</p>
        <p className="text-lg font-semibold">Total Price: {totalPrice}MMK</p>
      </div>
      <div className="container mx-auto py-6">
        <DataTable columns={columns} data={cartItems}  page={page}
           pageSize={pageSize}
           totalPage={totalPage}
           onPageChange={setPage} />
      </div>
      <div className="flex justify-center items-center mt-6 mb-2 text-3xl font-semibold">
        <CashoutDialog />
      </div>
    </>
  );
};

export default CartView;
