import React, { useState } from "react";
import ActivityHeader from "../../ActivityContent/Activity";
import { FaSearch } from "react-icons/fa";
import Activity from "../../ActivityContent/Activity";
import { Input } from "@/components/ui/input";
import EmailsView from "../../EmailContent/EmailsView";
import NotesView from "../../NotesContent/NotesView";
import MeetingView from "../../MeetingContent/MeetingView";

const Activities = () => {
  const [activeTab, setActiveTab] = useState("Activity");
  const tabs = ["Activity", "Emails", "Notes", "Meetings"];
  return (
    <>
      <div className="flex items-center relative ">
        <FaSearch className="absolute left-3 text-gray-500" size={16} />
        <Input
          type="text"
          className="pl-10 pr-3 py-6 mt-1 w-full border-none focus:outline-none focus:ring focus:border-slate-200"
          placeholder="Search emails, activities, notes and more"
        />
      </div>
      <hr className="my-2" />

      <div className="w-full">
        <div className="flex justify-around border-b border-gray-200 p-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-center border border-[#1D62B4] text-[#1D62B4] ${
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
          {activeTab === "Emails" && (
            <div>
              <EmailsView />
            </div>
          )}
          {activeTab === "Notes" && (
            <div>
              <NotesView />
            </div>
          )}
          {activeTab === "Meetings" && (
            <div>
              <MeetingView />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Activities;
