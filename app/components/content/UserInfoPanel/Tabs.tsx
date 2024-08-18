"use client";
import React, { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("leads");
  return (
    <div className="w-full flex flex-col">
      <div className="flex border-b border-gray-200 w-full">
        <button
          className={`flex-grow px-10 py-2 -mb-px text-sm font-medium focus:outline-none ${
            activeTab === "leads"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("leads")}
        >
          Contact Info
        </button>
        <button
          className={`flex-grow px-10 py-2 -mb-px text-sm font-medium focus:outline-none ${
            activeTab === "address"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("address")}
        >
          Address Info
        </button>
      </div>
      <div className="mt-4 text-left p-4">
        {activeTab === "leads" ? (
          <div className="pl-2">
            {/* Leads Info content goes here */}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-400 mb-1"
            >
              Email
            </label>
            <p className="text-sm mb-3">dennay@email.com</p>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-400 mb-1"
            >
              Phone
            </label>
            <p className="text-sm mb-3">(201)-555-5555</p>
            <label
              htmlFor="leadOwner"
              className="block text-sm font-medium text-slate-400 mb-1"
            >
              Lead Owner
            </label>
            <p className="text-sm mb-3">Lucy Lockwood</p>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-slate-400 mb-1"
            >
              Job Title
            </label>
            <p className="text-sm mb-3">Manager</p>
            <label
              htmlFor="annualRevenue"
              className="block text-sm font-medium text-slate-400 mb-1"
            >
              Annual Revenue
            </label>
            <p className="text-sm mb-3">400,000 USD</p>
            <label
              htmlFor="createdOn"
              className="block text-sm font-medium text-slate-400 mb-1"
            >
              Created On
            </label>
            <p className="text-sm mb-3">Aug 8th 2024 08:08:00 AM</p>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Address Info content goes here */}
            <SlLocationPin size={20} className="text-gray-500" />
            <p className="text-gray-500 text-md ">
              12005 Main St <br /> Suite# 100 <br /> Frisco. Texas 75085 USA{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
