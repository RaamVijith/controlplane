import { VscBell } from "react-icons/vsc";
import ActionItem from "./ActionItem";
import { IoChevronDownSharp, IoHelpCircleOutline } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Notifications from "./UserInfoPanel/Notifications";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex px-10 py-3 justify-between items-center border-b-2">
      <SearchBar />
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger>
            <ActionItem
              title="Notifications"
              Icon={<FaRegBell size={20} />}
              className="hidden md:flex"
            />
          </PopoverTrigger>
          <PopoverContent className="w-[450px]">
            <div className="flex items-center justify-between">
              <p>Notifications</p>
              <p>Mark all as read</p>
            </div>
            <Notifications />
          </PopoverContent>
        </Popover>
        <ActionItem
          title="Help Center"
          Icon={<MdHelpOutline size={20} />}
          className="hidden md:flex"
        />
        {/* Profile Menu */}
        <div className="group cursor-pointer flex justify-center items-center text-gray-600 transition-all ">
          {/* <div className="rounded-full mr-3 w-[20px] h-[20px] overflow-hidden">
            <Image
              className="rounded-full transition-all group-hover:scale-110"
              alt="profile"
              src={"/users/dp.jpg"}
              width={24}
              height={24}
            />
          </div> */}
          <Avatar className="w-6 h-6 mr-2 overflow-hidden">
            <AvatarImage src="/users/dp.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm hidden md:flex">Dana Morris</div>
          <div
            onClick={toggleDropdown}
            className="group-hover:bg-[#0002] p-2 m-1 rounded-full"
          >
            <IoChevronDownSharp />
          </div>
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute top-16 right-12 bg-white border border-gray-200 rounded-lg shadow-lg w-40"
            >
              <ul className="flex flex-col text-left p-2">
                <li className="p-2 gap-3 hover:bg-gray-100 cursor-pointer text-sm flex items-center">
                  <CgProfile size={20} />
                  Profile
                </li>
                <li className="p-2 gap-3 hover:bg-gray-100 cursor-pointer text-sm flex items-center md:hidden">
                  <FaRegBell size={20} />
                  Notifications
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center md:hidden">
                  <MdHelpOutline size={20} />
                  &nbsp; Help Center
                </li>
                <li className="p-2 gap-3 hover:bg-gray-100 cursor-pointer text-sm flex items-center">
                  <IoMdSettings size={20} />
                  Settings
                </li>
                <li className="p-2 gap-3 hover:bg-gray-100 cursor-pointer text-sm flex items-center">
                  <RiLogoutBoxLine size={20} />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
