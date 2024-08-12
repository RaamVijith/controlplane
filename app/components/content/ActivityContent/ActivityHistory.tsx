import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import upcomingData
const ActivityHistory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSectionOpen, setIsSectionOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };
  return (
    <>
      <div className="flex gap-2 py-2 px-2 items-center text-[#1D62B4] font-[500] mt-7">
        <span onClick={toggleSection} className="cursor-pointer">
          {isSectionOpen ? (
            <MdOutlineKeyboardArrowUp size={21} />
          ) : (
            <MdKeyboardArrowDown size={21} />
          )}
        </span>
        <Image
          src="/icons/acthistory.png"
          alt="acthistory.png"
          width={18}
          height={18}
        />
        <div className="cursor-default text-md font-semibold">
          Activity History
        </div>
        <div className="bg-[#1D62B450] px-2 rounded-md cursor-default">20</div>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isSectionOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
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
                      className="flex justify-between items-center cursor-pointer mb-2"
                      onClick={toggleAccordion}
                    >
                      <div className="flex items-center gap-2">
                        {isOpen ? (
                          <MdOutlineKeyboardArrowUp size={16} />
                        ) : (
                          <MdKeyboardArrowDown size={16} />
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
                        <div className="flex mt-4 mx-4">
                          <div className="flex flex-col p-4 w-full border-[1px] border-gray-300 gap-2">
                            <label className="block text-sm font-medium text-gray-600">
                              Reminder
                            </label>
                            <Select defaultValue="reminder">
                              <SelectTrigger className="w-full border-none outline-none flex items-center justify-start gap-1 p-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {/* <SelectLabel>Fruits</SelectLabel> */}
                                  <SelectItem value="reminder">
                                    Reminder
                                  </SelectItem>
                                  <SelectItem value="noreminder">
                                    No Reminder
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col p-4 w-full border-[1px] md:border-[1px] border-gray-300 gap-2">
                            <label className="block text-sm font-medium text-gray-600">
                              Task Priority
                            </label>
                            <Select defaultValue="high">
                              <SelectTrigger className="w-full border-none outline-none flex items-center justify-start gap-1 p-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {/* <SelectLabel>Fruits</SelectLabel> */}
                                  <SelectItem value="high">
                                    <div className="flex items-center">
                                      <span className="inline-flex h-4 w-4 rounded-full bg-green-400 mr-2" />
                                      High
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="low">
                                    <div className="flex items-center">
                                      <span className="inline-flex h-4 w-4 rounded-full bg-red-400 mr-2" />
                                      Low
                                    </div>
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col p-4 w-full gap-2 border-[1px] border-gray-300">
                            <label
                              // htmlFor="firstName"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Assigned to
                            </label>
                            <Select defaultValue="lucy">
                              <SelectTrigger className="w-full border-none outline-none flex items-center justify-start gap-1 p-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {/* <SelectLabel>Fruits</SelectLabel> */}
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="lucy">
                                    Lucy Anderson
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
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
      </div>
    </>
  );
};

export default ActivityHistory;
