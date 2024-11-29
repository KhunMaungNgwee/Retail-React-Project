import React, { useMemo, useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./table/columns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import api from "@/api";
import { format } from "date-fns"; // Use date-fns for date formatting
import {
  GetAllOrderWithProductModel,
  ProductOrderWithPaginationResDTO,
} from "@/api/order/types";

const ManagerView = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [page, SetPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, SetStartDate] = useState('');
  const [endDate, SetEndDate] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();

  // Update startDate and endDate when `date` changes
  useEffect(() => {
    if (date?.from) {
      SetStartDate(format(date.from, "yyyy-MM-dd")); // Format the date for API
    } else {
      SetStartDate('');
    }

    if (date?.to) {
      SetEndDate(format(date.to, "yyyy-MM-dd"));
    } else {
      SetEndDate('');
    }
  }, [date]);

  const { data } = api.order.fetchAllProductOrder.useQuery([
    page,
    pageSize,
    startDate,
    endDate,
  ]);

  console.log("THis is the data",data)

  const ProductOrderData = useMemo(
    (): ProductOrderWithPaginationResDTO<GetAllOrderWithProductModel> => {
      const defaultData: ProductOrderWithPaginationResDTO<GetAllOrderWithProductModel> = {
        items: [],
        totalPages: 1,
        totalCount: 0,
        page: 1,
        pageSize: 10,
        totalRevenue: 0,
        totalProfit: 0,
      };
      return { ...defaultData, ...data };
    },
    [data]
  );

  const totalRevenue = useMemo(() => ProductOrderData.totalRevenue, [ProductOrderData]);
  const totalProfit = useMemo(() => ProductOrderData.totalProfit, [ProductOrderData]);

  return (
    <>
      
      <div className="flex justify-between mb-1">
        <div className="text-lg font-semibold">Total Revenue: {totalRevenue} MMK</div>


        <div className={cn("grid gap-2 bg-black", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>


        <div className="text-lg font-semibold">Total Profit: {totalProfit} MMK</div>
      </div>
      <div className="container mx-auto py-5">
        <DataTable
          columns={columns}
          data={ProductOrderData.items || []}
          page={page}
          pageSize={pageSize}
          totalPage={ProductOrderData.totalPages || 0}
          onPageChange={SetPage}
        />
      </div>
    </>
  );
};

export default ManagerView;
