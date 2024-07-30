"use client";
import * as React from "react";
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
import Flag from "react-world-flags";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiExpandUpDownLine, RiDeleteBin5Line } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiPhoneLight } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { BsGenderFemale, BsGenderMale, BsThreeDots } from "react-icons/bs";
import { IoAdd, IoMailOpenOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import Image from "next/image";
import clsx from "clsx";
import UsersData from "@/public/data/users";
import { usePanel } from "../UserInfoPanel/UserPanelContext";
import { getCountryCode } from "@/public/data/countryCode";
import { FaAngleDown } from "react-icons/fa";
import AddContactDialog from "../UserInfoPanel/AddContact";
import AddData from "../NodataComponent/AddData";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineHistory } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { BiTransfer } from "react-icons/bi";
import ConvertContact from "../UserInfoPanel/ConvertContact";
import Email from "@/app/components/Email";
import History from "@/app/components/History/History";
import Delete from "@/app/components/Delete";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data: Users[] = UsersData;

export type Users = {
  id: number;
  name: string;
  gender: string;
  email: string;
  contact: string;
  job_title: string;
  annual_revenue: number;
  status: string;
  location: string;
  company: string;
  country: string;
  category: string;
  activities: {
    id: number;
    remainder: string;
    task_priority: string;
    assigned_to: string;
  }[];
  notes: {
    id: number;
    time: string;
    note: string;
  }[];
};
type DataTableProps = {
  users: Users[];
};
const DataTable: React.FC<DataTableProps> = ({ users }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isCardOpen, setIsCardOpen] = React.useState<boolean>(false);

  const { setPanelVisible, setPanelData, setExtendedUserInfoPanelVisible } =
    usePanel();

  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const columns: ColumnDef<Users>[] = [
    {
      accessorKey: "name",
      header: ({ table, column }) => {
        return (
          //<Checkbox
          //   checked={
          //     table.getIsAllPageRowsSelected() ||
          //     (table.getIsSomePageRowsSelected() && 'indeterminate')
          //   }
          //   onCheckedChange={(value) =>
          //     table.toggleAllPageRowsSelected(!!value)
          //   }
          //   aria-label="Select all"
          // />
          // <div
          //   className="flex items-center gap-2 cursor-pointer select-none"
          //   onClick={() =>
          //     column.toggleSorting(column.getIsSorted() === "asc")
          //   }
          // >
          //   Name
          //   <RiExpandUpDownLine />
          // </div>
          <Button
            className="p-[1px] text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        const firstInitial = name.charAt(0).toUpperCase();
        return (
          <div className="flex gap-2 items-center">
            <Checkbox
              className="border-gray-300"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
            {/* <Image
            className="rounded-full transition-all group-hover:scale-110"
            alt="profile"
            src={`/users/${row.getValue("id")}.jpg`}
            width={24}
            height={24}
          /> */}
            <Avatar className="w-5 h-5">
              <AvatarImage
                src={`/users/${row.getValue("id")}.jpg`}
                alt="@shadcn"
              />
              <AvatarFallback>{firstInitial}</AvatarFallback>
            </Avatar>
            <div className="capitalize text-sm">{name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          // <div
          //   className="flex items-center gap-2 cursor-pointer select-none"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // >
          //   Email
          //   <RiExpandUpDownLine />
          // </div>
          <Button
            className="p-[1px] text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="cursor-pointer lowercase flex gap-2 items-center">
          <TfiEmail />
          <div>{row.getValue("email")}</div>
        </div>
      ),
    },
    {
      accessorKey: "contact",
      header: ({ column }) => {
        return (
          // <div
          //   className="flex items-center gap-2 cursor-pointer select-none"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // >
          //   <div>Phone</div>
          //   <RiExpandUpDownLine />
          // </div>
          <Button
            className="p-[1px] text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <RiExpandUpDownLine />
          </Button>
        );
      },
      // This code for extension separation
      //   cell: ({ row }) => {
      //     const contact = row.getValue("contact") as string;
      //     const [mainContact, ext] = contact.split("x");
      //     return (
      //       <div className="flex flex-col gap-1 text-gray-500">
      //         <div className="flex gap-2 items-center">
      //           <PiPhoneLight className="text-[16px] lg:text-[20px]" />
      //           <div className="lowercase">{mainContact}</div>
      //         </div>
      //         {ext && <div className="text-gray-400">ext: {ext}</div>}
      //       </div>
      //     );
      //   },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center text-gray-500">
          <PiPhoneLight className="text-[16px] lg:text-[20px]" />
          <div className="lowercase">{row.getValue("contact")}</div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        //   {
        //   return (
        //     <div
        //       className="flex items-center gap-2 cursor-pointer select-none"
        //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        //     >
        //       Category
        //       <RiExpandUpDownLine />
        //     </div>
        //   );
        // },
        // <div
        //   className="flex items-center gap-2 cursor-pointer select-none"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        //   Category
        //   <RiExpandUpDownLine />
        // </div>
        <Button
          className="p-[1px] text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <RiExpandUpDownLine />
        </Button>
      ),

      cell: ({ row }) => (
        <div
          className={clsx(
            "capitalize text-center p-[1px] px-2 rounded-sm w-fit",
            row.getValue("category") === "Customers"
              ? "text-[#4167ED] bg-[#4167ED20]"
              : row.getValue("category") === "Employee"
              ? "text-[#7F3E9F] bg-[#7F3E9F20]"
              : "text-[#C5873D] bg-[#C5873D20]"
          )}
        >
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "country",
      header: ({ column }) => {
        return (
          // <div
          //   className="flex items-center gap-2 cursor-pointer select-none"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // >
          //   Country
          //   <RiExpandUpDownLine />
          // </div>
          <Button
            className="p-[1px] text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Country
            <RiExpandUpDownLine />
          </Button>
        );
      },

      cell: ({ row }) => {
        const countryName = row.getValue("country") as string;
        const countryCode = getCountryCode(countryName);
        return (
          <div className="flex items-center gap-2">
            {countryCode && <Flag code={countryCode} className="h-3" />}
            <span>{countryName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "company",
      header: ({ column }) => {
        return (
          // <div
          //   className="flex items-center gap-2 cursor-pointer select-none"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // >
          //   Company
          //   <RiExpandUpDownLine />
          // </div>
          <Button
            className="p-[1px] text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Company
            <RiExpandUpDownLine />
          </Button>
        );
      },

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full transition-all group-hover:scale-110"
            alt="profile"
            src={`/users/${row.getValue("id")}.jpg`}
            width={20}
            height={20}
          />
          <div className="capitalize">{row.getValue("company")}</div>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => {
        return (
          // <div
          //   className="flex items-center gap-2 cursor-pointer select-none"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // >
          //   <div>Location</div>
          //   <RiExpandUpDownLine />
          // </div>
          <Button
            className="p-[1px] text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Location
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center text-gray-500">
          <SlLocationPin className="text-[16px] lg:text-[20px]" />
          <div className="capitalize">{row.getValue("location")}</div>
        </div>
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => {
        return (
          // <div
          //   className="flex items-center gap-2 cursor-pointer select-none"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // >
          //   <div>Gender</div>
          //   <RiExpandUpDownLine />
          // </div>
          <Button
            className="p-[1px] text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gender
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center text-gray-500">
          {row.getValue("gender") === "Male" ? (
            <BsGenderMale className="text-[16px] lg:text-[20px]" />
          ) : (
            <BsGenderFemale className="text-[16px] lg:text-[20px]" />
          )}
          <div className="capitalize">{row.getValue("gender")}</div>
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text cursor-default">Action</div>,
      cell: ({ row }) => {
        // const amount = parseFloat(row.getValue("amount"));

        // // Format the amount as a dollar amount
        // const formatted = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        // }).format(amount);

        return (
          <>
            <div className="flex gap-2 items-center text-right font-medium">
              {/* <div className="items-center px-2 py-2 gap-2 border border-gray-300 rounded-md hover:bg-gray-300 cursor-pointer hidden md:flex">
              <PiPhoneLight className="text-[16px] lg:text-[20px] hidden md:flex" />
            </div>
            <div className="items-center px-2 py-2 gap-2 border border-gray-300 rounded-md hover:bg-gray-300 cursor-pointer hidden md:flex">
              <IoMailOpenOutline className="text-[16px] lg:text-[20px] hidden md:flex" />
            </div> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer rounded-full hover:bg-gray-200 h-8 w-8 p-0 flex items-center justify-center">
                    <BsThreeDots className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMenuItemClick}
                  >
                    <AddContactDialog
                      mode="edit"
                      trigger={
                        <span className="flex items-center justify-center">
                          <CiEdit className="mr-2 text-black" size={20} /> Edit
                        </span>
                      }
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const tmp_data = UsersData.find(
                        (item) => item.id === row.getValue("id")
                      );

                      setPanelData(tmp_data);
                      setPanelVisible(true);
                      setExtendedUserInfoPanelVisible(false);
                    }}
                    className="cursor-pointer"
                  >
                    <GrContactInfo className="mr-2" size={20} /> Contact View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const tmp_data = UsersData.find(
                        (item) => item.id === row.getValue("id")
                      );

                      setPanelData(tmp_data);
                      setExtendedUserInfoPanelVisible(true);
                      setPanelVisible(false);
                    }}
                    className="cursor-pointer"
                  >
                    <GrContactInfo className="mr-2" size={20} /> Contact Full
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMenuItemClick}
                  >
                    <ConvertContact
                      trigger={
                        <span className="flex items-center justify-center">
                          <BiTransfer className="mr-2" size={20} />
                          Convert Contact
                        </span>
                      }
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMenuItemClick}
                  >
                    <History
                      trigger={
                        <span className="flex items-center justify-center">
                          <MdOutlineHistory className="mr-2" size={20} />{" "}
                          History
                        </span>
                      }
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMenuItemClick}
                  >
                    <Delete
                      trigger={
                        <span className="flex items-center justify-center">
                          <RiDeleteBin5Line
                            className="mr-2 text-red-500"
                            size={20}
                          />{" "}
                          Delete
                        </span>
                      }
                    />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <PiPhoneLight className="mr-2 " size={20} /> Call
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleAddCategoryClick}
                  >
                    <IoMailOpenOutline className="mr-2 " size={20} /> Mail
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {isCardOpen && <Email onClose={handleCloseCard} />}
          </>
        );
      },
    },
  ];

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: users,
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

  const handleAddCategoryClick = () => {
    setIsCardOpen(true);
  };

  const handleCloseCard = () => {
    setIsCardOpen(false);
  };
  return (
    <div className="w-full py-4 px-8">
      {table.getRowModel().rows?.length ? (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </TableHead>
                    ))}
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
        // <div className="h-full w-full flex items-center justify-center">
        //   <div className="text-center text-gray-800">No results.</div>
        // </div>
        <AddData buttonText="Add Contact" />
      )}
    </div>
  );
};

export default DataTable;
