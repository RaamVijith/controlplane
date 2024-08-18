import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import InboxNotification from "./Inbox";
import GeneralNotification from "./General";
import ArchivedNotification from "./Archived";
// import { Settings } from 'react-feather';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("Inbox");

  const tabs = [
    { name: "Inbox", notificationCount: 4 },
    { name: "General", notificationCount: 4 },
    { name: "Archived", notificationCount: 0 },
  ];

  return (
    <>
      <div className="flex items-center justify-between space-x-4 mt-3">
        {/* Left side tabs */}
        <div className="flex items-center space-x-0">
          {tabs.map((tab, index) => (
            <div key={tab.name} className="flex items-center">
              <div
                className={`relative cursor-pointer px-3 py-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  activeTab === tab.name
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <span className="flex items-center">
                  <span className="mr-2 text-sm ">{tab.name}</span>
                  <span
                    className={`text-xs rounded-full w-5 h-5 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out ${
                      activeTab === tab.name
                        ? "bg-black text-white"
                        : "bg-white text-gray-500 border border-gray-300"
                    }`}
                  >
                    {tab.notificationCount}
                  </span>
                </span>
                {index < tabs.length - 1 && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-5 border-r border-gray-300"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right side settings icon */}
        <div className="ml-auto">
          <IoIosSettings
            className="cursor-pointer text-gray-600 hover:text-gray-900 transition-all duration-300"
            size={20}
          />
        </div>
      </div>
      <hr className="border-t border-gray-300" />

      {/* Content below the tabs */}
      <div className="mt-2">
        {activeTab === "Inbox" && <InboxNotification />}
        {activeTab === "General" && <GeneralNotification />}
        {activeTab === "Archived" && <ArchivedNotification />}
      </div>
    </>
  );
};

export default Notifications;
