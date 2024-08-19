import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TiVendorMicrosoft } from "react-icons/ti";
import SocialIcons from "@/app/components/SocialMedia/SocialIcons";
import { Tabs } from "@/components/ui/tabs";

const IndividualView = () => {
  return (
    <div className="flex flex-row w-full">
      <div className="flex w-[30%] h-[100vh] border-r p-[2%] justify-center">
        <div className=" flex flex-col   h-full">
          <div className="col-span-12 md1:col-span-3 pt-4 border-gray-300 border-b">
            <div className="flex flex-col items-center text-center mt-7">
              <Avatar className="w-24 h-24 mb-5">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg text-slate-600 mb-3">
                <strong>Jenny Wilson</strong>
              </p>
              <div className="flex items-center gap-3 mb-7">
                <TiVendorMicrosoft size={15} />
                <p className="text-lg text-slate-400">Microsoft</p>
              </div>
              <div className="flex gap-2 items-center justify-center bg-[#eee] px-4 mb-5 rounded-full text-gray-500">
                <div className="bg-[#5A925F] h-[8px] w-[8px] rounded-full"></div>
                <div className="flex text-xs">
                  {"Last Activity: " + "2 days ago"}
                </div>
              </div>
              <span className="mb-4">
                <SocialIcons />
              </span>
            </div>
          </div>
          
        </div>
      </div>

      <div className="bg-slate-100 h-full w-full"> content2</div>
    </div>
  );
};

export default IndividualView;
