import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiCalendarDate, CiStar } from "react-icons/ci";
import { FaRegImage, FaRegStar, FaTasks } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { RiCalendarScheduleLine, RiDeleteBin5Line } from "react-icons/ri";
import UpcomingActivityCard from "../comps/DataCard/UpcomingCard";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowUp,
  MdPushPin,
} from "react-icons/md";
import { upcomingData } from "@/public/data/users";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Delete from "../../Delete";
import { IoMdSend } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { PiDotsThreeBold } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";

const icons = [
  {
    id: 1,
    icon: <MdKeyboardArrowLeft size={18} />,
    link: "",
  },
  {
    id: 2,
    icon: <MdKeyboardArrowRight size={18} />,
    link: "",
  },
  {
    id: 3,
    icon: <RiDeleteBin5Line size={18} />,
    link: "",
  },
];

const EmailContact = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [taskPriorityOpen, setTaskPriorityOpen] = useState(false);
  const [assignedToOpen, setAssignedToOpen] = useState(false);

  const [reminder, setReminder] = useState("reminder");
  const [taskPriority, setTaskPriority] = useState("High");
  const [assignedTo, setAssignedTo] = useState("User");
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  const toggleReminderDropdown = () => setReminderOpen(!reminderOpen);
  const toggleTaskPriorityDropdown = () =>
    setTaskPriorityOpen(!taskPriorityOpen);
  const toggleAssignedToDropdown = () => setAssignedToOpen(!assignedToOpen);

  const handleReminderSelect = (option: string) => {
    setReminder(option);
    setReminderOpen(false);
  };

  const handleTaskPrioritySelect = (option: string) => {
    setTaskPriority(option);
    setTaskPriorityOpen(false);
  };

  const handleAssignedToSelect = (option: string) => {
    setAssignedTo(option);
    setAssignedToOpen(false);
  };
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <div className="border-gray-300 border-b-[1px] pb-10 mt-4">
        <div className="flex gap-2 py-2 px-2 items-center text-[#1D62B4] font-[500]">
          <span onClick={toggleSection} className="cursor-pointer">
            {isSectionOpen ? (
              <MdOutlineKeyboardArrowUp size={21} />
            ) : (
              <MdKeyboardArrowDown size={21} />
            )}
          </span>
          <HiOutlineMail size={18} />
          <div className="cursor-default text-md font-semibold">Emails</div>
        </div>

        <div
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isSectionOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div
            className="flex justify-between items-center py-2 px-2 cursor-pointer"
            onClick={toggleAccordion}
          >
            <div className="flex items-center gap-2">
              {isOpen ? (
                <MdOutlineKeyboardArrowUp size={20} />
              ) : (
                <MdKeyboardArrowDown size={20} />
              )}

              <span className="gap-2 text-sm text-gray-600">
                {/* <FaTasks className="text-blue-500" /> */}
                <p className="text-gray-600 text-md font-semibold">
                  Jenny Wilson
                </p>
                {/* <p className="text-gray-600 text-sm">by Lucy Lockwood</p> */}
              </span>
            </div>
          </div>

          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="mx-5 border-[1px] border-gray-300 rounded-md shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex p-4 gap-3 ">
                  <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="font-semibold flex items-center text-gray-600 text-sm">
                    Jenny Wilson
                  </div>
                </div>
                <div className="text-gray-500 text-sm p-4">
                  10 June 2024 10:00AM
                </div>
              </div>
              {/* <hr className="border-1" /> */}
              <div className="p-4">
                <p className="text-sm mb-2 font-semibold">
                  Start a blog to reach your creative peak
                </p>
                <p className="text-sm text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className="flex justify-between items-center pt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-6 border border-gray-300 rounded-full flex items-center justify-center shadow-md">
                      <MdPushPin size={12} /> <p className="text-xs">+4</p>
                    </div>
                    <div className="w-12 h-6 border border-gray-300  rounded-full flex items-center justify-center shadow-md">
                      <FaRegImage size={12} /> <p className="text-xs">+4</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRegStar size={20} className="shadow-md" />
                    <span>
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
                            <Delete
                              trigger={
                                <span className="pl-2 gap-1 flex items-center justify-center">
                                  <RiDeleteBin5Line
                                    className="mr-2 text-red-500"
                                    size={20}
                                  />{" "}
                                  Delete
                                </span>
                              }
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailContact;
