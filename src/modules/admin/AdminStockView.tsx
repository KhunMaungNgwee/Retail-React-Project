
import api from "@/api";
import { DataTable } from "@/components/data-table/DataTable";
import { useEffect, useMemo, useState } from "react";
import { columns } from "./table/columns";
import AddProductDialog from "@/components/dialog/AddProductDialog";



const AdminStockView = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isFetching,refetch } =
    api.product.getAllProductsWithPagination.useQuery([page, pageSize]);
  useEffect(() => {
    refetch()
  } , [page])

  const Data = useMemo(() => {
    return isFetching ? [] : data?.items || [];
  }, [data, isFetching]);
  return (
    <>
   
     <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl font-semibold">Stocks</h1>
         <AddProductDialog  />
      </div>

      <div className="container mx-auto py-3">
        <DataTable
          columns={columns}
          data={Data}
          page={page}
          pageSize={pageSize}
          totalPage={data?.totalPages || 0}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}

export default AdminStockView