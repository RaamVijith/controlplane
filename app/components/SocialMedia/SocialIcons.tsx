import React, { useState } from "react";
import { IoCallOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import dynamic from "next/dynamic";
import { HiOutlineMail } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import AddContactDialog from "../content/comps/UserInfoPanel/AddContact";
import { BiSolidEdit } from "react-icons/bi";
import History from "../History/History";
import { MdOutlineHistory } from "react-icons/md";
import Delete from "../Delete";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiPhone, FiPlus } from "react-icons/fi";
const EmailDialog = dynamic(() => import("../content/EmailContent/Email"), {
  ssr: false,
});
const SocialIcons = () => {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const handleAddEmailClick = () => {
    setIsCardOpen(true);
  };

  const handleEmailCloseCard = () => {
    setIsCardOpen(false);
  };

  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const icons = [
    { icon: <FiPlus />, label: "Log" },
    { icon: <FiPhone />, label: "Call" },
    {
      icon: <HiOutlineMail size={19} onClick={handleAddEmailClick} />,
      label: "Email",
    },
    // { icon: <IoEllipsisHorizontal />, label: "More" },
    {
      icon: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-center border border-gray-400 hover:bg-gray-200 hover:text-gray-700 transition rounded-full w-9 h-9 text-slate-500 cursor-pointer">
              <BsThreeDots />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>Email Options</DropdownMenuLabel> */}
            {/* <DropdownMenuItem>Add New Email</DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleMenuItemClick}
            >
              <AddContactDialog
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
            <DropdownMenuItem
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
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleMenuItemClick}
            >
              <Delete
                trigger={
                  <span className="pl-2 gap-3 flex items-center justify-center">
                    <RiDeleteBin5Line className="text-red-500" size={20} />
                    Delete
                  </span>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      label: "More",
    },
  ];

  return (
    <>
      <div className="flex space-x-5">
        {icons.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center border border-gray-400 hover:bg-gray-200 hover:text-gray-700 transition rounded-full w-9 h-9 text-slate-500 cursor-pointer">
              {item.icon}
            </div>
            <p className="text-slate-500 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
      {isCardOpen && <EmailDialog onClose={handleEmailCloseCard} />}
    </>
  );
};

export default SocialIcons;
