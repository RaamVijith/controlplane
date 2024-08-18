"use client";

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
import { getCountryCode } from "@/public/data/countryCode";
import UsersData from "@/public/data/users";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";
import { BsGenderFemale, BsGenderMale, BsThreeDots } from "react-icons/bs";
import { PiPhoneLight } from "react-icons/pi";
import { RiDeleteBin5Line, RiExpandUpDownLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import Flag from "react-world-flags";
import AddContactDialog from "./AddContact";
import { CiEdit } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import ConvertContact from "../convertContact/ConvertContact";
import { BiTransfer } from "react-icons/bi";
import History from "@/app/components/History/History";
import { MdOutlineHistory } from "react-icons/md";
import Delete from "@/app/components/common/Delete";
import { IoMailOpenOutline } from "react-icons/io5";

export type ContactUserColumns = {
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
const handleMenuItemClick = (event: React.MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
};
// const { setPanelVisible, setPanelData, setExtendedUserInfoPanelVisible } =
// usePanel();
export const columns: ColumnDef<ContactUserColumns>[] = [
  {
    accessorKey: "name",
    header: ({ table, column }) => {
      return (
        <div className="flex gap-2 items-center">
          {/* <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              /> */}
          {/* <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              > */}
          <Button
            className="p-0 text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <RiExpandUpDownLine />
          </Button>

          {/* </div> */}
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Checkbox
          className="border-gray-300"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <Image
          className="rounded-full transition-all group-hover:scale-110"
          alt="profile"
          src={`/users/${row.getValue("id")}.jpg`}
          width={24}
          height={24}
        />
        <div className="capitalize">{row.getValue("name") + ""}</div>
      </div>
    ),
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
          className="p-0 text-sm"
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
          className="p-0 text-sm"
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
    header: ({ column }) => {
      return (
        <Button
          className="p-0 text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <RiExpandUpDownLine />
        </Button>
      );
    },

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
        <Button
          className="p-0 text-sm"
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
        <Button
          className="p-0 text-sm"
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
        <Button
          className="p-0 text-sm"
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
        <Button
          className="p-0 text-sm"
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
    id: "actions",
    header: () => <div className="text">Action</div>,
    enableHiding: false,
    cell: ({ row }) => {
      //   const user = row.original;
      const amount = parseFloat(row.getValue("amount"));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <BsThreeDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(UsersData.id)}
            >
              Copy user ID
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
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
              <GrContactInfo className="mr-2" size={20} /> Contact View
            </DropdownMenuItem> */}
            {/* <DropdownMenuItem
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
              <GrContactInfo className="mr-2" size={20} /> Contact Full View
            </DropdownMenuItem> */}
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
                    <MdOutlineHistory className="mr-2" size={20} /> History
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
                    <RiDeleteBin5Line className="mr-2 text-red-500" size={20} />{" "}
                    Delete
                  </span>
                }
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <PiPhoneLight className="mr-2 " size={20} /> Call
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IoMailOpenOutline className="mr-2 " size={20} /> Mail
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
