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
  DropdownMenuContent,
  DropdownMenuItem,
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
import { IoIosArrowBack, IoIosArrowForward, IoMdMale } from "react-icons/io";
import {BsThreeDots } from "react-icons/bs";
import {IoLocationOutline,} from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { BiDollar } from "react-icons/bi";
import clsx from "clsx";
import CompanyData from "@/public/data/companies";
import { getCountryCode } from "@/public/data/countryCode";
import { FaAngleDown } from "react-icons/fa";
import Delete from "@/app/components/common/Delete";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import dynamic from "next/dynamic";
import CreateCompanyDialog from "../companyInfoPanel/AddCompany";
import AddDataCompany from "../NodataComponent/AddDataCompany";
import { HiViewColumns } from "react-icons/hi2";
import { IoMdRefresh } from "react-icons/io";
import { LuExpand } from "react-icons/lu";
import SideSheetCompany from "../componentsCompany/ShideSheetCompany";

// const EmailDialog = dynamic(() => import("../../../EmailContent/Email"), {
//   ssr: false,
// });

const data: Companies[] = CompanyData;

export type Companies = {
  id: number;
  companyName: string;
  industryType: string;
  region: string;
  priliminaryContact: string;
  email: string;
  phone: string;
  mobile: string;
  uniqueNumber: number;
  revenue: number;
  image: string;
  country: string;
  state: string;
  city: string;
  timeZone: string;
  address: string;
  createdBy: string;
  createdAt: string;
  status: boolean;
};
type DataTableProps = {
  companies: Companies[];
};

const DataTableCompany: React.FC<DataTableProps> = ({ companies }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      mobile: false,
      address: false,
      createdBy: false,
      createdAt: false,
      state: false,
      city: false,
      timeZone: false,
    });
  const [rowSelection, setRowSelection] = React.useState({});
  const [isCardOpen, setIsCardOpen] = React.useState<boolean>(false);

  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const columns: ColumnDef<Companies>[] = [
    // Company Name
    {
      accessorKey: "companyName",
      meta: "Company Name",
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
            Company Name
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => {
        const companyName = row.getValue("companyName") as string;
        const firstInitial = companyName.charAt(0).toUpperCase();
        const id = Number(row.id);
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
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={`/companies/${id+1}.jpg`}
                alt="@shadcn"
              />
              <AvatarFallback>{firstInitial}</AvatarFallback>
            </Avatar>
            <div className="capitalize text-sm">{row.getValue("companyName")}</div>
          </div>
        );
      },
    },
    // Unique Number
    {
      accessorKey: "uniqueNumber",
      meta: "Unique Number",
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
            Unique No
            <RiExpandUpDownLine />
          </Button>
        );
      },

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="capitalize">{row.getValue("uniqueNumber")}</div>
        </div>
      ),
    },
    // Email
    {
      accessorKey: "email",
      meta: "Email",
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
        <div className="cursor-pointer lowercase flex gap-2 text-gray-500 items-center">
          <HiOutlineMail size={20} />
          <div>{row.getValue("email")}</div>
        </div>
      ),
    },
    // Phone
    {
      accessorKey: "phone",
      meta:"Phone",
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
          <FiPhone className="text-[16px] lg:text-[20px]" />
          <div className="lowercase">{row.getValue("phone")}</div>
        </div>
      ),
    },
    // Mobile
    {
      accessorKey: "mobile",
      meta:"Mobile",
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
            Mobile
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
          <FiPhone className="text-[16px] lg:text-[20px]" />
          <div className="lowercase">{row.getValue("mobile")}</div>
        </div>
      ),
    },
    // industry type
    {
      accessorKey: "industryType",
      meta:"Industry Type",
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
          Industry Type
          <RiExpandUpDownLine />
        </Button>
      ),

      cell: ({ row }) => (
        <div
          className={clsx(
            "capitalize text-center p-[1px] px-2 rounded-sm w-fit",
            row.getValue("industryType") === "Manufecture"
              ? "text-[#4167ED] bg-[#4167ED20]"
              : row.getValue("industryType") === "Retail"
              ? "text-[#7F3E9F] bg-[#7F3E9F20]"
              : "text-[#C5873D] bg-[#C5873D20]"
          )}
        >
          {row.getValue("industryType")}
        </div>
      ),
    },
    // Country
    {
      accessorKey: "country",
      meta:"Country",
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
    // State
    {
      accessorKey: "state",
      meta:"State",
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
            State
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center text-gray-500">
          <IoLocationOutline className="text-[16px] lg:text-[20px]" />
          <div className="capitalize">{row.getValue("state")}</div>
        </div>
      ),
    },
    // City
    {
      accessorKey: "city",
      meta:"City",
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
            City
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center text-gray-500">
          <IoLocationOutline className="text-[16px] lg:text-[20px]" />
          <div className="capitalize">{row.getValue("city")}</div>
        </div>
      ),
    },
    // Region
    {
      accessorKey: "region",
      meta:"Region",
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
            Region
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-2 items-center text-gray-500">
          <IoLocationOutline className="text-[16px] lg:text-[20px]" />
          <div className="capitalize">{row.getValue("region")}</div>
        </div>
      ),
    },
    // Time Zone
    {
      accessorKey: "timeZone",
      meta:"Time Zone",
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
            Time Zone
            <RiExpandUpDownLine />
          </Button>
        );
      },

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="capitalize text-sm">{row.getValue("timeZone")}</div>
        </div>
      ),
    },
    // Revenue
    {
      accessorKey: "revenue",
      meta:"Revenue",
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
            Revenue
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center ">
          <BiDollar className="text-[16px] lg:text-[20px]" />
          <div className="capitalize">{row.getValue("revenue")}</div>{" "}
        </div>
      ),
    },
    // Created By
    {
      accessorKey: "createdBy",
      meta:"Created By",
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
            Created By
            <RiExpandUpDownLine />
          </Button>
        );
      },
      cell: ({ row }) => {
        const createdBy = row.getValue("createdBy") as string;
        const firstInitial = createdBy.charAt(0).toUpperCase();
        return (
          <div className="flex gap-2 items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={`/users/${row.getValue("id")}.jpg`}
                alt="@shadcn"
              />
              <AvatarFallback>{firstInitial}</AvatarFallback>
            </Avatar>
            <div className="capitalize text-sm">{createdBy}</div>
          </div>
        );
      },
    },
    // Created At
    {
      accessorKey: "createdAt",
      meta:"Created At",
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
            Created At
            <RiExpandUpDownLine />
          </Button>
        );
      },

      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="capitalize">{row.getValue("createdAt")}</div>
        </div>
      ),
    },
    // status
    {
      accessorKey: "status",
      meta:"Status",
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
        <Button className="p-[1px] text-sm" variant="ghost">
          Status
        </Button>
      ),

      cell: ({ row }) => (
        <div className="flex items-center">
          {row.getValue("status") === true ? (
            <FaCircleCheck className="text-green-800 text-[16px] lg:text-[20px]" />
          ) : (
            <IoMdCloseCircle className="text-red-700 text-[16px] lg:text-[20px]" />
          )}
        </div>
      ),
    },
    // Action
    {
      accessorKey: "id",
      meta: "Action",
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
                    <CreateCompanyDialog
                      mode="edit"
                      trigger={
                        <span className="pl-2 gap-3 flex items-center justify-center">
                          <BiSolidEdit className="text-black" size={20} />
                          {/* <Image
                            src="/icons/edit.png"
                            alt="edit.png"
                            // className="w-5 h-5"
                            width={18}
                            height={18}
                          /> */}
                          Edit
                        </span>
                      }
                    />
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
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
                    <span className="pl-2 gap-3 flex items-center justify-center">
                      <GrContactInfo className="" size={20} /> Contact View
                    </span>
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
                    <span className="pl-2 gap-3 flex items-center justify-center">
                      <GrContactInfo className="" size={20} /> Contact Full View
                    </span>
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMenuItemClick}
                  >
                    <ConvertContact
                      trigger={
                        <span className="pl-2 gap-3 flex items-center justify-center">
                          <BiTransfer className="" size={20} />
                          Convert Contact
                        </span>
                      }
                    />
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMenuItemClick}
                  >
                    <History
                      trigger={
                        <span className="pl-2 gap-3 flex items-center justify-center">
                          <MdOutlineHistory className="" size={20} /> History
                        </span>
                      }
                    />
                  </DropdownMenuItem> */}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleMenuItemClick}
                  >
                    <Delete
                      trigger={
                        <span className="pl-2 gap-3 flex items-center justify-center">
                          <RiDeleteBin5Line
                            className="text-red-500"
                            size={20}
                          />
                          Delete
                        </span>
                      }
                    />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="pl-2 gap-3 flex items-center justify-center">
                      <FiPhone className="" size={20} /> Call
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleAddEmailClick}
                  >
                    <span className="pl-2 gap-3 flex items-center justify-center">
                      <HiOutlineMailOpen size={20} /> Mail
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* {isCardOpen && <EmailDialog onClose={handleEmailCloseCard} />} */}
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
    data: companies,
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
    // initialState: {
    //   columnVisibility: {
    //     id: false,
    //     companyName:false //hide the id column by default
    //   },
    //   expanded: true, //expand all rows by default

    // },
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

  const handleAddEmailClick = () => {
    setIsCardOpen(true);
  };

  const handleEmailCloseCard = () => {
    setIsCardOpen(false);
  };
  return (
    <div className="w-full py-4 px-8 gap-5 ">
      <div className="w-full justify-end  flex p-2 flex-row gap-2">
        {/* <CustomCollumnMaker table={table} /> */}
        <IoMdRefresh className="hover:text-blue-800 cursor-pointer text-[14px]" />

        <SideSheetCompany
          trigger={
            <HiViewColumns className="hover:text-blue-800 cursor-pointer text-[14px]" />
          }
          table={table}
        />
        <LuExpand className="hover:text-blue-800 cursor-pointer text-[14px]" />
      </div>

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
            <div className="flex-grow flex items-center justify-center gap-2">
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
        <>
          <AddDataCompany buttonText="Add Company" />
        </>
      )}
    </div>
  );
};

export default DataTableCompany;
