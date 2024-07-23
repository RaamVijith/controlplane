"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import NavItem from "./NavItem";
import { useState } from "react";
import Link from "next/link";
import { SideNavOptions } from "../config";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setIsNavOpen(true);
      }}
      onMouseLeave={() => {
        setIsNavOpen(false);
      }}
      className="bg-[#f7f7f7] space-y-14 text-[#3a3a3a] w-24 hover:w-60"
    >
      {/* logo */}
      <Link
        href={"/"}
        className="flex mx-8 my-6 w-full items-center justify-start gap-3 font-[700]"
      >
        <Image alt="logo" src={Logo} width={32} />
        {isNavOpen && <div className="text-black">DataNue</div>}
      </Link>

      {/* navigation items */}
      <Link href={"/"} className="flex flex-col font-[400]">
        {SideNavOptions.map((item) => (
          <NavItem
            key={item.id}
            title={item.title}
            Icon={item?.Icon}
            menuState={isNavOpen}
          />
        ))}
      </Link>
    </div>
  );
};

export default SideNav;
