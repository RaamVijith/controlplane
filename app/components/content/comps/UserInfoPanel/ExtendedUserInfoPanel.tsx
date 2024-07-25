import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaRegStickyNote } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { LuArrowRightFromLine } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineCheck } from "react-icons/md";
import { PiPhoneLight } from "react-icons/pi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";
import { VscBell, VscSend } from "react-icons/vsc";
import { usePanel } from "./UserPanelContext";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiEdit } from "react-icons/ci";
import Switch from "react-switch";
import ContactProperty from "../../Selector/ContactProperty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const ExtendedUserInfoPanel = () => {
  const {
    isExtendedUserInfoPanelVisible,
    panelData,
    setExtendedUserInfoPanelVisible,
  } = usePanel();
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
    // Add your logic
  };

  return (
    <>
      {isExtendedUserInfoPanelVisible && setExtendedUserInfoPanelVisible && (
        <div
          onClick={() => setExtendedUserInfoPanelVisible(false)}
          className="absolute flex justify-end top-0 left-0 w-full bg-[#0003] z-10 h-svh"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full sm:w-full md:w-full lg:w-[90%] flex flex-col z-20 overflow-y-scroll"
          >
            {/* <div className="w-[56.5em] md:w-full"> */}
            {/* Top header */}
            <div className="flex justify-between py-4 px-10 border-b-[1px] border-gray-300">
              <div className="flex gap-2 items-center justify-center text-[#1D62B4] font-[500]">
                <LuArrowRightFromLine />
                <div className="cursor-default text-sm">Lead Preview</div>
              </div>
              <div className=" flex cursor-pointer items-center justify-center text-xs font-semibold text-gray-500 px-2 rounded-sm outline outline-[1px] outline-gray-300 hover:bg-[#1D62B4] hover:text-white">
                View full details
              </div>
            </div>
            <div className="grid grid-cols-12 px-10 h-full">
              <div className="col-span-12 md:col-span-2 border-r border-gray-300 ">
                <div className="flex items-center justify-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 border-r border-gray-300">
                Content for the middle column
              </div>
              <div className="col-span-12 md:col-span-3 border-gray-300">
                Content for the third column
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ExtendedUserInfoPanel;
