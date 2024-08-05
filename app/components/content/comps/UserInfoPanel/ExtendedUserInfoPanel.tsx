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
import { TiVendorMicrosoft } from "react-icons/ti";
import SocialIcons from "@/app/components/SocialMedia/SocialIcons";
import Tabs from "./Tabs";
import Activities from "./Activities";
import { FaArrowCircleRight } from "react-icons/fa";
import ContactStatus from "../ContactStatus/ContactStatus";
import Stepper from "../ContactStatus/ContactStatus";
import VerticalStepper from "../ContactStatus/ContactStatus";
const ExtendedUserInfoPanel = () => {
  const {
    isExtendedUserInfoPanelVisible,
    panelData,
    setExtendedUserInfoPanelVisible,
    setPanelVisible,
  } = usePanel();
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
    // Add your logic
  };
  const handleViewDetails = () => {
    setPanelVisible(true);
    setExtendedUserInfoPanelVisible(false);
  };

  useEffect(() => {
    // Log panelData whenever the component mounts or panelData changes
    console.log("panelData:", panelData);
  }, [panelData]);

  return (
    <>
      {isExtendedUserInfoPanelVisible && setExtendedUserInfoPanelVisible && (
        <div
          onClick={() => setExtendedUserInfoPanelVisible(false)}
          className="absolute flex justify-end top-0 left-0 w-full bg-[#0003] z-10 h-svh"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full sm:w-full md:w-full lg:w-full xl:w-[75%] flex flex-col z-20 "
          >
            {/* <div className="w-[56.5em] md:w-full"> */}
            {/* Top header */}
            <div className="flex justify-between py-6 px-10 border-b-[1px] border-gray-300">
              <div className="flex gap-2 items-center justify-center font-[500]">
                <FaArrowCircleRight size={24} className="text-[#3f76ff]" />
              </div>
              <div
                onClick={handleViewDetails}
                className=" flex cursor-pointer items-center justify-center text-xs font-semibold text-gray-500 px-2 rounded-sm outline outline-[1px] outline-gray-300 hover:bg-[#1D62B4] hover:text-white"
              >
                View contact details
              </div>
            </div>
            <div className="grid grid-cols-12  h-full">
              <div className="col-span-12 md1:col-span-3 border-r pt-4 border-gray-300 ">
                <div className="flex flex-col items-center text-center mt-7">
                  <Avatar className="w-24 h-24 mb-5">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-lg text-slate-600 mb-3">
                    <strong>Jenny Wilson</strong>
                  </p>
                  <div className="flex items-center gap-3 mb-7">
                    <TiVendorMicrosoft size={15} />
                    <p className="text-lg text-slate-400">Microsoft</p>
                  </div>
                  {/* <Badge variant="secondary" className="mb-5">
          <span className=" flex items-center  ">
            <span className=" left-0 inline-flex h-2 w-2 rounded-full bg-green-500 mr-2" />
            <p className="text-slate-400">Last Activity: 2 days ago</p>
          </span>
        </Badge> */}
                  <div className="flex gap-2 items-center justify-center bg-[#eee] px-4 mb-5 rounded-full text-gray-500">
                    <div className="bg-[#5A925F] h-[8px] w-[8px] rounded-full"></div>
                    <div className="flex">
                      {"Last Activity: " + "2 days ago"}
                    </div>
                  </div>
                  <span className="mb-4">
                    <SocialIcons />
                  </span>
                  <Tabs />
                </div>
              </div>
              <div className="col-span-12 md1:col-span-6 border-r border-gray-300">
                <div className="md1:h-[92vh] md1:overflow-y-auto">
                  <Activities />
                </div>
              </div>
              <div className="col-span-12 md1:col-span-3 border-gray-300">
                <VerticalStepper />
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
//
