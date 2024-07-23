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
    <div className="flex w-full h-full justify-start items-center gap-3  px-8 py-3 cursor-pointer hover:bg-[#0002] transition-all">
      <div>{Icon ? Icon : <RiSquareFill size={24} />}</div>
      {menuState && <div>{title}</div>}
    </div>
  );
};

export default NavItem;
