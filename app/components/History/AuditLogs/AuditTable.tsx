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
// import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { MdDownload, MdViewColumn } from "react-icons/md";
import * as XLSX from "xlsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isExpanded: boolean;
}

export function AuditTable<TData, TValue>({
  columns,
  data,
  isExpanded,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    objecttype: false,
    activity: false,
    ipaddress: false,
    network: false,
    version: false,
    city: false,
    region: false,
    country: false,
    postal: false,
    latitude: false,
    longitude: false,
    timezone: false,
    org: false,
    browser: false,
    createdby: false,
    updatedby: false,
    updatedat: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: isExpanded ? 9 : 8,
  });

  useEffect(() => {
    const savedVisibility = localStorage.getItem("columnVisibility");
    if (savedVisibility) {
      setColumnVisibility(JSON.parse(savedVisibility));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  useMemo(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: isExpanded ? 9 : 8,
    }));
  }, [isExpanded]);

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

  const handleDownload = () => {
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
      <div className="flex justify-between items-center pb-2">
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
          <Image
            src="/icons/Vector.png"
            alt="Vector.png"
            width={15}
            height={15}
            onClick={handleDownload}
          />
        </div>
        <div className="flex items-center gap-2">
          {/* <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-none">
                  <MdViewColumn
                    className="text-gray-400 cursor-pointer hover:text-gray-700"
                    size={20}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Customize Column</SheetTitle>
                  <hr />
                </SheetHeader>
                <div className="px-3 mt-4">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center px-2 py-2 cursor-pointer capitalize "
                      >
                        <Checkbox
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => {
                            column.toggleVisibility(!!value);
                          }}
                          id={column.id}
                          className="data-[state=checked]:bg-[#3f76ff] data-[state=checked]:border-[#3f76ff]"
                        />
                        <label
                          htmlFor={column.id}
                          className="ml-2 text-sm text-gray-600"
                        >
                          {column.id}
                        </label>
                      </div>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-none">
                  <MdViewColumn
                    className="text-gray-400 cursor-pointer hover:text-gray-700"
                    size={20}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Customize Column</SheetTitle>
                  <hr />
                  <label
                    // htmlFor="firstName"
                    className="block text-md font-medium text-black mb-1"
                  >
                    Search Columns
                  </label>
                  <input
                    type="text"
                    placeholder="Search Columns"
                    className="mt-2 p-1 border rounded w-full bg-slate-200"
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value.toLowerCase())
                    }
                  />
                </SheetHeader>
                <div className="px-3 mt-4">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .filter((column) =>
                      column.id.toLowerCase().includes(searchQuery)
                    )
                    .sort((a, b) => {
                      const aMatches = a.id.toLowerCase().includes(searchQuery);
                      const bMatches = b.id.toLowerCase().includes(searchQuery);
                      if (aMatches && !bMatches) return -1;
                      if (!aMatches && bMatches) return 1;
                      return 0;
                    })
                    .map((column) => (
                      <div
                        key={column.id}
                        className="flex items-center px-2 py-2 cursor-pointer capitalize "
                      >
                        <Checkbox
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => {
                            column.toggleVisibility(!!value);
                          }}
                          id={column.id}
                          className="data-[state=checked]:bg-[#3f76ff] data-[state=checked]:border-[#3f76ff]"
                        />
                        <label
                          htmlFor={column.id}
                          className="ml-2 text-sm text-gray-600"
                        >
                          {column.id}
                        </label>
                      </div>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="relative max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Filter"
              value={
                (table.getColumn("objecttype")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("objecttype")
                  ?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col h-full"> */}
      <div
        className={clsx("flex-1 max-h-[650px] overflow-auto", {
          "max-w-[1150px]": !isExpanded,
          "max-w-[1850px]": isExpanded,
        })}
      >
        <div className="rounded-md border max-h-[600px] overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
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
      </div>
      {/* <div className="flex items-center justify-center space-x-2 py-4"> */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-800">
            {`${
              table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              1
            }-${Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )} of ${table.getFilteredRowModel().rows.length} Results`}
          </div>
          {isExpanded && (
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
                  {[9, 20, 30, 40, 50].map((pageSize) => (
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
          )}
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
  );
}
