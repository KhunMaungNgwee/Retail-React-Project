import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  pageSize: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  pageSize,
  totalPage,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPage,
    state: {
      pagination: { pageIndex: page - 1, pageSize },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updateOrValue: Updater<PaginationState>) => {
      const paginationState =
        typeof updateOrValue === "function"
          ? updateOrValue({ pageIndex: 0, pageSize: 10 })
          : updateOrValue;
      onPageChange(paginationState.pageIndex + 1);
    },
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-800 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-center">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-4 py-4">
        <Button
          className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(page - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-lg font-medium text-gray-800">Page {page} of {totalPage} </span>
        <Button
          className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(page + 1)}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
