"use client";

import { useState } from "react";
import { UserPanelProvider } from "../components/content/comps/UserInfoPanel/UserPanelContext";
import UserInfoPanel from "../components/content/comps/UserInfoPanel/UserInfoPanel";
import SideNav from "../components/sidenav/SideNav";
import MainPage from "../components/content/MainPage";
import ExtendedUserInfoPanel from "../components/content/comps/UserInfoPanel/ExtendedUserInfoPanel";

export default function Home() {
  const [data, setData] = useState<null | object>({});
  const [visibility, setVisibility] = useState(false);
  const value = { data, setData, visibility, setVisibility };
  return (
    <main className="flex relative h-full w-full">
      {/* side nav */}
      <UserPanelProvider>
        <UserInfoPanel />
        <ExtendedUserInfoPanel />
        <SideNav />
        <MainPage />
      </UserPanelProvider>
    </main>
  );
}
