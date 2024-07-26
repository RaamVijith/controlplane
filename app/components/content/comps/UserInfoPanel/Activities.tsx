import React, { useState } from "react";
import ActivityHeader from "../../ActivityContent/Activity";
import { FaSearch } from "react-icons/fa";
import Activity from "../../ActivityContent/Activity";

const Activities = () => {
  const [activeTab, setActiveTab] = useState("Activity");
  const tabs = ["Activity", "Emails", "Notes", "Meetings"];
  return (
    <>
      <div className="flex items-center relative">
        <FaSearch className="absolute left-3 text-gray-500" size={16} />
        <input
          type="text"
          className="pl-10 pr-3 py-4 w-full rounded-md focus:outline-none focus:ring focus:border-slate-200"
          placeholder="Search emails, activities, notes and more"
        />
      </div>
      <hr className="my-2" />

      <div className="w-full">
        <div className="flex justify-around border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-center border border-blue-500 text-blue-500 ${
                activeTab === tab
                  ? "bg-blue-100 font-medium"
                  : "hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">
          {activeTab === "Activity" && (
            <div>
              <Activity />
            </div>
          )}
          {activeTab === "Emails" && <div>{/* <Email /> */}Email</div>}
          {activeTab === "Notes" && <div>Notes Content</div>}
          {activeTab === "Meetings" && <div>Meetings Content</div>}
        </div>
      </div>
    </>
  );
};

export default Activities;
