import React from "react";
import { RiSquareFill } from "react-icons/ri";

interface INavItem {
  title: string;
  Icon?: React.ReactNode;
  active?: boolean;
  menuState: boolean;
}

const NavItem: React.FC<INavItem> = ({ title, Icon, active, menuState }) => {
  return (
    // <div
    //   className={`flex w-full h-full justify-start items-center gap-3 px-8 py-3 cursor-pointer transition-all ${
    //     active
    //       ? "bg-gray-400 text-white rounded-md"
    //       : "hover:bg-[#0002] rounded-md"
    //   }`}
    // >
    //   <div>{Icon ? Icon : <RiSquareFill size={24} />}</div>
    //   {menuState && <div>{title}</div>}
    // </div>
    <div
      className={`relative flex w-full h-full items-center gap-3 px-8 py-3 cursor-pointer transition-all ${
        active ? "bg-gray-400 text-white" : "hover:bg-[#0002]"
      }`}
    >
      <div
        className={`w-1.5 bg-gray-600 absolute left-0 top-0 bottom-0 transition-all transform ${
          active ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div>{Icon ? Icon : <RiSquareFill size={24} />}</div>
      {menuState && <div>{title}</div>}
    </div>
  );
};

export default NavItem;
