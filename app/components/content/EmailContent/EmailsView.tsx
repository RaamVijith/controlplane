import React from "react";
import EmailContact from "./EmailContact";
import { FillButton } from "../../libs/buttons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaRegNewspaper } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { FaAngleDown } from "react-icons/fa";
import EmailDialog from "./Email";
const EmailsView = () => {
  const [isCardOpen, setIsCardOpen] = React.useState<boolean>(false);
  const handleAddEmailClick = () => {
    setIsCardOpen(true);
  };

  const handleEmailCloseCard = () => {
    setIsCardOpen(false);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[#3f76ff] hover:bg-[#0b4092] gap-2 py-1">
            Create new email <FaAngleDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full ml-8">
          <DropdownMenuGroup>
            <DropdownMenuItem className="pl-3" onClick={handleAddEmailClick}>
              <BsPencil size={17} className="mr-3" />
              Create a new email
            </DropdownMenuItem>
            <DropdownMenuItem className="pl-3">
              <FaRegNewspaper size={17} className="mr-3" />
              Log email activity
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EmailContact />
      {isCardOpen && <EmailDialog onClose={handleEmailCloseCard} />}
    </div>
  );
};

export default EmailsView;
