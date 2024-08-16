import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FillButton } from "../../libs/buttons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";

const GeneralNotification = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      {/* <p>This is the content for the Inbox tab.</p> */}
      <div className="w-full p-2">
        <div className="flex items-center justify-between cursor-pointer p-1">
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
          <div className="flex items-center gap-2">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer rounded-full hover:bg-gray-200 h-8 w-8 p-0 flex items-center justify-center">
                    <BsThreeDots className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem>
                    <Image
                      src="/icons/accept.png"
                      alt="accept.png"
                      width={13}
                      height={13}
                      className="mx-2"
                    />
                    Accept
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Image
                      src="/icons/cancel.png"
                      alt="accept.png"
                      width={13}
                      height={13}
                      className="mx-2"
                    />{" "}
                    Decline
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <hr className="mt-1 border border-slate-100" />
    </div>
  );
};

export default GeneralNotification;
