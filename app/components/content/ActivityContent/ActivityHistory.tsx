import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
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
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
} from "@/components/ui/timeline";

// import upcomingData
const ActivityHistory = () => {
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
      <div className="flex gap-2 py-2 px-2 items-center text-[#1D62B4] font-[500] mt-7">
        <GoHistory size={18} />
        <div className="cursor-default text-md font-semibold">
          Activity History
        </div>
        <div className="bg-[#1D62B450] px-2 rounded-md cursor-default">20</div>
      </div>
      <Timeline className="mt-4">
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon />
          </TimelineHeader>
          <TimelineContent>
            <TimelineDescription>
              <div className="border-gray-300 border-b-[1px] pb-10">
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={toggleAccordion}
                  >
                    <div className="flex items-center gap-2">
                      {isOpen ? (
                        <GoTriangleUp size={16} />
                      ) : (
                        <GoTriangleDown size={16} />
                      )}
                      <p className="text-gray-600 font-semibold">
                        20 June 2024
                      </p>
                    </div>
                    <p className="text-gray-600 font-semibold">
                      Today 10:10 AM
                    </p>
                  </div>

                  <div
                    className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    <div className="ml-5 border-[1px] border-gray-300">
                      <div className="flex p-4 gap-3">
                        <Avatar className="w-[50px] h-[50px]">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-[500] text-gray-600">
                            Prepare quote for Jenny Wilson
                          </div>
                          <div className="text-gray-500 text-sm whitespace-pre-wrap">
                            {
                              "She's interested in our new product and wants to negotiate the price. Please include our price listings and set up a call."
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex m-4">
                        <div className="flex flex-col p-4 w-full border-[1px] border-gray-300 gap-2">
                          <div className="text-sm font-[500] text-gray-600">
                            Reminder
                          </div>

                          <div
                            className="flex text-center gap-2 items-center text-sm cursor-pointer"
                            onClick={toggleReminderDropdown}
                          >
                            <div>{reminder}</div>
                            <GoTriangleDown size={12} />
                          </div>
                          {reminderOpen && (
                            <div className="bg-white border border-gray-300 mt-1 rounded shadow-lg">
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleReminderSelect("Reminder")}
                              >
                                Reminder
                              </div>
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() =>
                                  handleReminderSelect("No Reminder")
                                }
                              >
                                No Reminder
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col p-4 w-full border-[1px] md:border-[1px] border-gray-300 gap-2">
                          <div className="text-sm font-[500] text-gray-600">
                            Task Priority
                          </div>

                          <div
                            className="flex gap-2 items-center text-sm cursor-pointer"
                            onClick={toggleTaskPriorityDropdown}
                          >
                            {/* <div>{taskPriority}</div> */}
                            {taskPriority === "High" ? (
                              <div className="flex items-center">
                                <span className="inline-flex h-4 w-4 rounded-full bg-green-400 mr-2" />
                                High
                              </div>
                            ) : taskPriority === "Low" ? (
                              <div className="flex items-center">
                                <span className="inline-flex h-4 w-4 rounded-full bg-red-400 mr-2" />
                                Low
                              </div>
                            ) : (
                              <div>{taskPriority}</div>
                            )}
                            <GoTriangleDown size={12} />
                          </div>
                          {taskPriorityOpen && (
                            <div className="bg-white border border-gray-300 mt-1 rounded shadow-lg">
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleTaskPrioritySelect("High")}
                              >
                                <span className=" flex items-center">
                                  <span className=" left-0 inline-flex h-4 w-4 rounded-full bg-green-400 mr-2" />
                                  High
                                </span>
                              </div>

                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleTaskPrioritySelect("Low")}
                              >
                                <span className=" flex items-center">
                                  <span className=" left-0 inline-flex h-4 w-4 rounded-full bg-red-400 mr-2" />
                                  Low
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col p-4 w-full gap-2 border-[1px] border-gray-300">
                          <div className="text-sm font-[500] text-gray-600">
                            Assigned to
                          </div>

                          <div
                            className="flex gap-2 items-center text-sm cursor-pointer"
                            onClick={toggleAssignedToDropdown}
                          >
                            <div>{assignedTo}</div>
                            <GoTriangleDown size={12} />
                          </div>
                          {assignedToOpen && (
                            <div className="bg-white border border-gray-300 mt-1 rounded shadow-lg">
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleAssignedToSelect("lucy")}
                              >
                                Lucy Headwood
                              </div>
                              <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleAssignedToSelect("Admin")}
                              >
                                Admin
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
};

export default ActivityHistory;
