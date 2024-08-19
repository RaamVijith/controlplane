"use client";

import UserInfoPanel from "@/test/UserInfoPanel";
import { UserPanelProvider } from "../components/content/UserInfoPanel/UserPanelContext";
import ExtendedUserInfoPanel from "../components/content/UserInfoPanel/ExtendedUserInfoPanel";
import SideNav from "../components/sidenav/SideNav";
import { useState } from "react";
import LeadsMainPage from "./leadsComponents/LeadsMainPage";

export default function Leads() {
  const [data, setData] = useState<null | object>({});
  const [visibility, setVisibility] = useState(false);
  const value = { data, setData, visibility, setVisibility };
  return (
    <main className="flex relative h-full w-full">
      <UserPanelProvider>
        <UserInfoPanel />
        <ExtendedUserInfoPanel />
        <SideNav />
        <LeadsMainPage/>
      </UserPanelProvider>
    </main>
  );
}
