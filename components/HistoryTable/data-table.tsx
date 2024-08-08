"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  PaginationState,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDown, FaFilter, FaSearch } from "react-icons/fa";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdDownload } from "react-icons/md";
import * as XLSX from "xlsx";
import Image from "next/image";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CommonTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 7,
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
    //   state to pass the data to table
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

  const handleDownload = () => {
    // each pagination download
    // const tableData = table.getRowModel().rows.map((row) => {
    // full pagination download
    const tableData = table.getPrePaginationRowModel().rows.map((row) => {
      return row
        .getVisibleCells()
        .reduce((acc: { [key: string]: any }, cell) => {
          acc[cell.column.id] = cell.getValue();
          return acc;
        }, {});
    });

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };
  return (
    <>
      {/* Search Bar Filter */}
      {/* <div className="sticky top-0 z-10 bg-white pb-4"> */}
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-3">
          <p className="text-md">
            <strong>Period</strong>
          </p>
          <div>
            <Select>
              <SelectTrigger className="w-[180px] text-sm p-1 pl-4 h-8 border outline-none focus:ring-0">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="one">1 Hour</SelectItem>
                  <SelectItem value="three">3 Hour</SelectItem>
                  <SelectItem value="six">6 Hour</SelectItem>
                  <SelectItem value="nine">9 Hour</SelectItem>
                  <SelectItem value="twelve">12 Hour</SelectItem>
                  <SelectItem value="twentyfour">24 Hour</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* <FaFilter /> */}
          {/* <AiOutlineExpandAlt /> */}
          <Image
            src="/icons/Vector.png"
            alt="Vector.png"
            width={15}
            height={15}
            onClick={handleDownload}
          />
          {/* <MdDownload onClick={handleDownload} size={20} /> */}
        </div>

        <div className="relative max-w-sm mt-4">
          {/* Search Icon */}
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {/* Input Field */}
          <Input
            placeholder="Filter"
            value={
              (table.getColumn("objectType")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("objectType")?.setFilterValue(event.target.value)
            }
            className="pl-10"
          />
        </div>
      </div>
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
      <div className="flex items-center justify-center space-x-2 py-4">
        {/* <div className="flex gap-2 text-sm text-muted-foreground items-center justify-center">
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
              {[7, 14, 21, 28, 34].map((pageSize) => (
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
        </div> */}
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
  );
}
