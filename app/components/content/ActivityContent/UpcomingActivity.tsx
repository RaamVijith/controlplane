import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { FaTasks } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";
import UpcomingActivityCard from "../comps/DataCard/UpcomingCard";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { upcomingData } from "@/public/data/users";
const UpcomingActivity = () => {
  const [isOpen, setIsOpen] = useState<number[]>([]);

  useEffect(() => {
    // Initialize isOpen with all indices
    const initialOpenIndices = upcomingData.map((_, index) => index);
    setIsOpen(initialOpenIndices);
  }, []);

  const toggleAccordion = (index: number) => {
    setIsOpen((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  return (
    <>
      <div className="flex items-center gap-2 text-blue-500">
        <RiCalendarScheduleLine />
        <p className="font-semibold">Upcoming Activities</p>
      </div>
      {upcomingData.map((data, index) => (
        <div key={index} className="w-full rounded-md relative z-10">
          <div
            className="flex justify-between p-4 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between w-full">
              <span className="flex items-center gap-2 text-sm">
                <FaTasks className="text-blue-500" />
                <p className="text-slate-400 font-semibold">Task created by</p>
                <p className="text-slate-400">{data.created}</p>
              </span>
              <span className="hidden lg:flex items-center gap-2 text-sm">
                <p>Due</p>
                <CiCalendarDate className="text-blue-500" size={22} />
                <p>{data.time}</p>
              </span>
            </div>
            <div className="flex items-center ml-2">
              {isOpen.includes(index) ? (
                <MdKeyboardArrowUp className="text-slate-400" />
              ) : (
                <MdKeyboardArrowDown className="text-slate-400" />
              )}
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen.includes(index) ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4 border-t">
              <UpcomingActivityCard data={upcomingData} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UpcomingActivity;
