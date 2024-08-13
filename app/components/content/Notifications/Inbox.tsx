import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FillButton } from "../../libs/buttons";

const InboxNotification = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      {/* <p>This is the content for the Inbox tab.</p> */}
      <div className="w-full p-1 ">
        <div
          className={`flex items-center justify-between cursor-pointer ${
            isExpanded ? "" : "bg-slate-100"
          }`}
          onClick={handleCardClick}
        >
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="w-12 h-12 mr-2 overflow-hidden">
                <AvatarImage src="/users/dp.jpg" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-1 block w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <p className="ml-2 text-sm text-gray-800">
                Polly Edited Contact Page
              </p>
              <p className="ml-2 text-xs text-gray-600">40 mins ago</p>
            </div>
          </div>
          <div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        {/* Expanded content with buttons */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="ml-16 mt-2 flex justify-start space-x-2">
            <Button variant="outline" className="rounded-md">
              <div className="text-sm">Decline</div>
            </Button>
            <Button className="rounded-md bg-[#3f76ff] text-white hover:bg-[#0b4092]">
              <div className="text-sm">Accept</div>
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-b border-slate-200" />
    </div>
  );
};

export default InboxNotification;
