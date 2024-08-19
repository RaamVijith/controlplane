"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import NavItem from "./NavItem";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SideNavOptions } from "../config";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const mainNavOptions = SideNavOptions.filter(
    (item) => item.title !== "Settings"
  );
  const settingsOption = SideNavOptions.find(
    (item) => item.title === "Settings"
  );

  return (
    // <div
    //   onMouseEnter={() => {
    //     setIsNavOpen(true);
    //   }}
    //   onMouseLeave={() => {
    //     setIsNavOpen(false);
    //   }}
    //   className="bg-[#f7f7f7] space-y-14 text-[#3a3a3a] w-24 hover:w-60"
    // >
    //   {/* logo */}
    //   <Link
    //     href={"/"}
    //     className="flex mx-8 my-6 w-full items-center justify-start gap-3 font-[700]"
    //   >
    //     <Image alt="logo" src={Logo} width={32} />
    //     {isNavOpen && <div className="text-black">DataNue</div>}
    //   </Link>

    //   {/* navigation items */}
    //   <Link href={"/"} className="flex flex-col font-[400]">
    //     {SideNavOptions.map((item) => (
    //       <NavItem
    //         key={item.id}
    //         title={item.title}
    //         Icon={item?.Icon}
    //         menuState={isNavOpen}
    //       />
    //     ))}
    //   </Link>
    // </div>
    <div
      onMouseEnter={() => setIsNavOpen(true)}
      onMouseLeave={() => setIsNavOpen(false)}
      // className="bg-[#f7f7f7] space-y-14 text-[#3a3a3a] w-24 hover:w-60"
      className="bg-[#f7f7f7] space-y-14 text-[#3a3a3a] w-24 hover:w-60 flex flex-col justify-between h-screen"
    >
      <div>
        {/* logo */}
        <Link
          href={"/"}
          className="flex mx-8 my-6 w-full items-center justify-start gap-3 font-[700]"
        >
          <Image alt="logo" src={Logo} width={32} />
          {isNavOpen && <div className="text-black">DataNue</div>}
        </Link>

        {/* navigation items */}
        <div className="flex flex-col font-[400]">
          {mainNavOptions.map((item) => (
            <Link href={item.path} key={item.id}>
              <NavItem
                title={item.title}
                Icon={item.Icon}
                menuState={isNavOpen}
                active={pathname === item.path}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* settings option */}
      <div className="mb-6">
        <Link href={settingsOption?.path || "#"} key={settingsOption?.id}>
          <NavItem
            title={settingsOption?.title || "Settings"}
            Icon={settingsOption?.Icon}
            menuState={isNavOpen}
            active={pathname === settingsOption?.path}
          />
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
