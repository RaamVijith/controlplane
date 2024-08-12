import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegStickyNote, FaTasks } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { RiCalendarScheduleLine, RiDeleteBin5Line } from "react-icons/ri";
import UpcomingActivityCard from "../comps/DataCard/UpcomingCard";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { upcomingData } from "@/public/data/users";
import clsx from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Delete from "../../Delete";
import { IoMdSend } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { Button } from "@/components/ui/button";
import AddNoteDialog from "../comps/UserInfoPanel/NewNote";

const NotesContent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [taskPriorityOpen, setTaskPriorityOpen] = useState(false);
  const [assignedToOpen, setAssignedToOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };
  const [reminder, setReminder] = useState("reminder");
  const [taskPriority, setTaskPriority] = useState("High");
  const [assignedTo, setAssignedTo] = useState("User");

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
      <div className="border-gray-300 border-b-[1px] pb-10">
        <div className="flex items-center justify-between mr-2">
          <div className="flex gap-2 py-2 px-2 items-center text-[#1D62B4] font-[500]">
            <span onClick={toggleSection} className="cursor-pointer">
              {isSectionOpen ? (
                <MdOutlineKeyboardArrowUp size={21} />
              ) : (
                <MdKeyboardArrowDown size={21} />
              )}
            </span>
            <FaRegStickyNote size={18} />
            <div className="cursor-default text-md font-semibold">Notes</div>
            <div className="bg-[#1D62B450] px-2 rounded-md cursor-default">
              20
            </div>
          </div>
          <div>
            <AddNoteDialog
              trigger={
                <Button
                  variant="outline"
                  className="flex cursor-pointer items-center justify-center text-sm text-gray-500 p-1 rounded-sm outline outline-[1px] outline-gray-200 hover:bg-slate-300 hover:text-black"
                >
                  Add new note
                </Button>
              }
            />
          </div>
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
                <MdOutlineKeyboardArrowUp size={16} />
              ) : (
                <MdKeyboardArrowDown size={16} />
              )}

              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Avatar className="w-[25px] h-[25px]">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-gray-600">Note by Lucy Lockwood</p>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-2 text-sm">
                <CiCalendarDate className="text-gray-500" size={22} />
                <p>10/10/2021 10:10 AM</p>
              </span>
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

          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="mx-2 border-[1px] border-gray-300">
              <div className="text-gray-500 text-sm whitespace-pre-wrap p-3 border-b-[1px] border-gray-300">
                {
                  "She's interested in our new product and wants to negotiate the price. Please include our price listings and set up a call."
                }
              </div>
              <div>
                <div className="py-4 px-3 flex items-center gap-1 border-b-[1px] border-gray-300">
                  <span>
                    <Avatar className="w-[20px] h-[20px]">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </span>
                  <span className="text-[13px] text-black font-semibold">
                    Lucy Lockwood
                  </span>
                  <span className="text-[13px] text-gray-500">
                    im missing a file access, i need to assist with your work.
                    Thankyou. your good.
                  </span>
                </div>
              </div>
              <div className="mb-1 relative">
                <Textarea
                  placeholder="Type your message here."
                  className="rounded-none pr-10 border-none"
                />
                <IoMdSend
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  size={20} // Adjust the size as needed
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesContent;
