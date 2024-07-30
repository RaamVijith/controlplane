"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { usePanel } from "../UserInfoPanel/UserPanelContext";
import clsx from "clsx";
import { FaAngleDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import AddData from "../NodataComponent/AddData";

// export type ContactUsersProp = {
//   id: number;
//   name: string;
//   gender: string;
//   email: string;
//   contact: string;
//   job_title: string;
//   annual_revenue: number;
//   status: string;
//   location: string;
//   company: string;
//   country: string;
//   category: string;
//   activities: {
//     id: number;
//     remainder: string;
//     task_priority: string;
//     assigned_to: string;
//   }[];
//   notes: {
//     id: number;
//     time: string;
//     note: string;
//   }[];
// };
interface ContactUsersProp<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function CDataTable<TData, TValue>({
  columns,
  data,
}: ContactUsersProp<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { setPanelVisible, setPanelData, setExtendedUserInfoPanelVisible } =
    usePanel();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    pageCount: pagination.pageSize,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
  });
  const paginationButtons = [];
  for (let i = 0; i < table.getRowCount() / pagination.pageSize; i++) {
    paginationButtons.push(
      <button
        className={clsx(
          "px-4 py-2 rounded-lg",
          i === pagination.pageIndex
            ? "bg-black text-white"
            : "hover:bg-gray-200 "
        )}
        key={i}
        onClick={() => table.setPageIndex(i)}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <div className="w-full py-4 px-8">
      {table.getRowModel().rows?.length ? (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
              <TableBody>
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
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex gap-2 text-sm text-muted-foreground items-center justify-center">
              <div className="text-gray-800">{"Show"}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer h-8 w-8 flex items-center justify-center border-2 border-gray-400 gap-2 px-[28px] py-[8px] rounded-md">
                    <div>{table.getState().pagination.pageSize}</div>
                    <div>
                      <FaAngleDown />
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <DropdownMenuItem
                      key={pageSize}
                      onClick={() => {
                        table.setPageSize(Number(pageSize));
                      }}
                      className="cursor-pointer"
                      defaultValue={pageSize}
                    >
                      {pageSize}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="text-gray-800">{"Row"}</div>
            </div>
            <div className="flex gap-2 items-center justify-center space-x-2">
              <Button
                className={clsx(
                  "bg-gray-100",
                  !table.getCanPreviousPage() && "text-gray-400"
                )}
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <IoIosArrowBack />
              </Button>
              <div className="flex flex-row gap-2">
                {paginationButtons.map((u) => u)}
              </div>
              <Button
                className={clsx(
                  "bg-gray-100",
                  !table.getCanNextPage() && "text-gray-400"
                )}
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <IoIosArrowForward />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <AddData buttonText="Add Contact" />
      )}
    </div>
  );
}
