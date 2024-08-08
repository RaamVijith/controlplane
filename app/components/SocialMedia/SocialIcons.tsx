import React, { useState } from "react";
import { IoCallOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import Email from "../Email";
// import EmailTwo from "../EmailTwo";
import dynamic from "next/dynamic";

const EmailTwo = dynamic(() => import("../EmailTwo"), { ssr: false });
const SocialIcons = () => {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const handleAddEmailClick = () => {
    setIsCardOpen(true);
  };

  const handleEmailCloseCard = () => {
    setIsCardOpen(false);
  };

  const icons = [
    { icon: <GoPlus />, label: "Log" },
    { icon: <IoCallOutline />, label: "Call" },
    { icon: <AiTwotoneMail onClick={handleAddEmailClick} />, label: "Email" },
    { icon: <IoEllipsisHorizontal />, label: "More" },
  ];

  return (
    <>
      <div className="flex space-x-5">
        {icons.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center border border-gray-400 hover:bg-gray-200 hover:text-gray-700 transition rounded-full w-9 h-9 text-slate-500 cursor-pointer">
              {item.icon}
            </div>
            <p className="text-slate-500 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
      {isCardOpen && <EmailTwo onClose={handleEmailCloseCard} />}
    </>
  );
};

export default SocialIcons;
