import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegImage, FaRegStar, FaTasks } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { RiCalendarScheduleLine, RiDeleteBin5Line } from "react-icons/ri";
// import UpcomingActivityCard from "../DataCard/UpcomingCard";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowUp,
  MdPushPin,
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
import Delete from "../common/Delete";
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

const contentList = [
  {
    id: 1,
    avatar: "",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. n unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
  {
    id: 2,
    avatar: "",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. n unknown printer took a galley of type and scrambled it to make a type specimen book",
  },
];

// import upcomingData
const ActivityHistory = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
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
                      <div
                        className=" border-[1px] border-gray-300 rounded-md shadow-lg"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
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
                          {/* <div className="text-gray-500 text-sm p-4">
                            10 June 2024 10:00AM
                          </div> */}
                          <span className="p-4">
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
                        {/* <hr className="border-1" /> */}
                        <div className="px-4 pb-4 mt-1">
                          <p className="text-sm mb-2 font-semibold">
                            Start a blog to reach your creative peak
                          </p>{" "}
                          {/*  */}
                          <p className="text-sm text-gray-400">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                          {/*  */}
                          <div className="flex mt-3 shadow-md">
                            <div className="flex flex-col p-2 w-full border-[1px] border-gray-300 gap-2 ">
                              <label className="block text-sm font-medium text-gray-600 ml-2">
                                Reminder
                              </label>
                              <Select defaultValue="reminder">
                                <SelectTrigger className="w-full ml-2 border-none outline-none flex items-center justify-start gap-1 p-0">
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

                            <div className="flex flex-col p-2 w-full border-[1px] md:border-[1px] border-gray-300 gap-2">
                              <label className="block text-sm font-medium text-gray-600 ml-2 ">
                                Task Priority
                              </label>
                              <Select defaultValue="high">
                                <SelectTrigger className="w-full ml-2  border-none outline-none flex items-center justify-start gap-1 p-0">
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

                            <div className="flex flex-col p-2 w-full gap-2 border-[1px] border-gray-300">
                              <label
                                // htmlFor="firstName"
                                className="block text-sm font-medium text-gray-600 ml-2 "
                              >
                                Assigned to
                              </label>
                              <Select defaultValue="lucy">
                                <SelectTrigger className="w-full ml-2 border-none outline-none flex items-center justify-start gap-1 p-0">
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
                          {contentList.map((content, index) => (
                            <div key={index}>
                              <div className="flex items-start space-x-2 mt-4 relative">
                                <div className="relative flex flex-col items-center">
                                  <Avatar className="w-[32px] h-[32px]">
                                    <AvatarImage
                                      src="https://github.com/shadcn.png"
                                      alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                </div>
                                <p className="text-sm text-gray-400">
                                  {content.text}
                                </p>
                              </div>
                              <hr className="mt-2 border border-slate-100" />
                            </div>
                          ))}
                          <div
                            className={`px-4 pb-4 mt-1 transition-opacity duration-300 ease-in-out ${
                              isHovered
                                ? "opacity-100 max-h-40"
                                : "opacity-0 max-h-0"
                            }`}
                          >
                            <div className="flex items-center space-x-2 mt-3">
                              <Avatar className="w-[32px] h-[32px]">
                                <AvatarImage
                                  src="https://github.com/shadcn.png"
                                  alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="flex-grow relative">
                                <Textarea
                                  placeholder="Type your message here."
                                  className="rounded-none pr-10 w-full"
                                />
                                <IoMdSend
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                  size={20}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-3">
                            <div className="flex items-center gap-3 ">
                              <div className="w-12 h-6 border border-gray-300 rounded-full flex items-center justify-center shadow-md">
                                <MdPushPin size={12} />{" "}
                                <p className="text-xs">+4</p>
                              </div>
                              <div className="w-12 h-6 border border-gray-300  rounded-full flex items-center justify-center shadow-md">
                                <FaRegImage size={12} />{" "}
                                <p className="text-xs">+4</p>
                              </div>
                            </div>

                            <FaRegStar size={20} className="shadow-md" />
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
