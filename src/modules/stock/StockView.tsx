import { useAppSelector } from "@/store";
import api from "@/api";
import { DataTable } from "@/components/data-table/DataTable";
import { useEffect, useState } from "react";
import { columns } from "./table/columns";
import { NavLink } from "react-router-dom";
import {  AiOutlineShoppingCart } from "react-icons/ai";

const StockView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, refetch } = api.product.getAllProductsWithPagination.useQuery([
    page,
    pageSize,
  ]);

  useEffect(() => {
    refetch();
  }, [page]);
  const totalCartItems = useAppSelector((state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)
  );
  console.log(data?.page);
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl font-semibold">Stocks</h1>
        <NavLink to={"/cart-page"}>
          <div className="relative flex items-center justify-center">
            {/* Shopping Cart Icon with subtle animation */}
            <AiOutlineShoppingCart className="text-2xl" />

            {/* Badge for Total Items */}
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-green-500 px-2 py-[2px] text-xs text-white font-semibold shadow-md">
                {totalCartItems}
              </span>
            )}
          </div>
        </NavLink>
      </div>

      <div className="container mx-auto py-3">
        <DataTable
          columns={columns}
          data={data?.items || []}
          page={page}
          pageSize={pageSize}
          totalPage={data?.totalPages || 0}
          onPageChange={setPage}
        />
      </div>
    </>
  );
};

export default StockView;
