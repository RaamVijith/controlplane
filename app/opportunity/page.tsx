"use client";

import { useState } from "react";
import { UserPanelProvider } from "../components/content/UserInfoPanel/UserPanelContext";
import UserInfoPanel from "../components/content/UserInfoPanel/UserInfoPanel";
import SideNav from "../components/sidenav/SideNav";
import MainPage from "../components/content/MainPage";
import ExtendedUserInfoPanel from "../components/content/UserInfoPanel/ExtendedUserInfoPanel";
import CreateEmailTemplate from "./createTemplates/CreateTemplates";

export default function Opportunity() {
  const [data, setData] = useState<null | object>({});
  const [visibility, setVisibility] = useState(false);
  const value = { data, setData, visibility, setVisibility };
  return (
    <main className="flex relative h-full w-full">
      {/* side nav */}
      <UserPanelProvider>
        <UserInfoPanel/>
        <ExtendedUserInfoPanel/>
        <SideNav />
        <CreateEmailTemplate/>
      </UserPanelProvider>
      
    </main>
  );
}
