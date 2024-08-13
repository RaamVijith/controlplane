import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { IoIosSettings } from "react-icons/io";
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
                className={`relative cursor-pointer px-3 py-2 transition-all duration-300 ${
                  activeTab === tab.name
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                <span className="flex items-center">
                  <span className="mr-2">{tab.name}</span>
                  <span
                    className={`text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
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
        {activeTab === "Inbox" && (
          <div>
            {/* <p>This is the content for the Inbox tab.</p> */}
            <div className="w-full p-1 ">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="w-12 h-12 mr-2 overflow-hidden">
                      <AvatarImage src="/users/dp.jpg" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 block w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <p className="ml-2">hellow sdsddsdsdsddsdd</p>
                    <p className="ml-2">hellow sdsddsdsdsddsdd</p>
                  </div>
                </div>
                <div>hello</div>
              </div>
            </div>
            <hr className="border-b border-slate-200" />
          </div>
        )}
        {activeTab === "General" && (
          <div>
            <h2 className="text-xl font-semibold">General Content</h2>
            <p>This is the content for the General tab.</p>
          </div>
        )}
        {activeTab === "Archived" && (
          <div>
            <h2 className="text-xl font-semibold">Archived Content</h2>
            <p>This is the content for the Archived tab.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;
