import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegStickyNote, FaTasks } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { RiCalendarScheduleLine, RiDeleteBin5Line } from "react-icons/ri";
import UpcomingActivityCard from "../comps/DataCard/UpcomingCard";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
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
import AvatarGroup from "@/components/ui/AvatarGroup";
import { CgAttachment } from "react-icons/cg";
import { BiMessageRounded } from "react-icons/bi";
const MeetingContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [taskPriorityOpen, setTaskPriorityOpen] = useState(false);
  const [assignedToOpen, setAssignedToOpen] = useState(false);

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
        <div className="flex items-center justify-between">
          <div className="flex gap-2 py-2 px-2 items-center text-[#1D62B4] font-[500]">
            <FaRegStickyNote size={18} />
            <div className="cursor-default text-md font-semibold">Meetings</div>
          </div>
          <div>
            <div className="flex cursor-pointer items-center justify-center text-sm text-gray-500 p-1 rounded-sm outline outline-[1px] outline-gray-200 hover:bg-slate-300 hover:text-black">
              Log new meetings
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex justify-between items-center py-2 px-2 cursor-pointer"
            onClick={toggleAccordion}
          >
            <div className="flex items-center gap-2">
              {isOpen ? (
                <GoTriangleUp size={16} />
              ) : (
                <GoTriangleDown size={16} />
              )}

              <p>Monthly Product Discussion</p>
            </div>

            <div className="flex items-center gap-2">
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
              <div className="p-3 flex items-center justify-between text-xs">
                <p className="font-semibold">Notes</p>
                <p>1/12/2023 at 10:00AM - 1/12/2024 at 10:15AM </p>
              </div>
              <div className="text-gray-500 text-sm whitespace-pre-wrap p-3">
                {
                  "She's interested in our new product and wants to negotiate the price. Please include our price listings and set up a call."
                }
              </div>
              <div className="p-3 flex items-center gap-2">
                <AvatarGroup />
                <CgAttachment />
                <BiMessageRounded />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingContent;
