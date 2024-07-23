import { VscBell } from "react-icons/vsc";
import ActionItem from "./ActionItem";
import { IoChevronDownSharp, IoHelpCircleOutline } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import { CiUser, CiSettings, CiLogout } from "react-icons/ci";
import SearchBar from "./SearchBar";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <div className="flex px-10 py-6 justify-between items-center border-b-2">
      <SearchBar />
      <div className="flex gap-2">
        <ActionItem
          title="Notifications"
          Icon={<VscBell size={24} />}
          className="hidden md:flex"
        />
        <ActionItem
          title="Help Center"
          Icon={<IoHelpCircleOutline size={24} />}
          className="hidden md:flex"
        />
        {/* Profile Menu */}
        <div className="group cursor-pointer flex justify-center items-center text-gray-600 transition-all">
          <div className="rounded-full mr-3 w-[20px] h-[20px] overflow-hidden">
            <Image
              className="rounded-full transition-all group-hover:scale-110"
              alt="profile"
              src={"/users/dp.jpg"}
              width={20}
              height={20}
            />
          </div>
          <div className="text-sm hidden md:flex">Dana Morris</div>
          <div
            onClick={toggleDropdown}
            className="group-hover:bg-[#0002] p-2 m-1 rounded-full"
          >
            <IoChevronDownSharp />
          </div>
          {dropdownVisible && (
            <div className="absolute top-16 right-12 bg-white border border-gray-200 rounded-lg shadow-lg w-40">
              <ul className="flex flex-col text-left p-2">
                <li className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center">
                  <CiUser size={16} />
                  &nbsp; Profile
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center md:hidden">
                  <VscBell size={16} />
                  &nbsp; Notifications
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center md:hidden">
                  <IoHelpCircleOutline size={16} />
                  &nbsp; Help Center
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center">
                  <CiSettings size={16} />
                  &nbsp; Settings
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center">
                  <CiLogout size={16} />
                  &nbsp; Logout
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
