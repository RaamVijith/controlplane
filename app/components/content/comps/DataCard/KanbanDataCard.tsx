import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SlLocationPin } from "react-icons/sl";
import { PiPhoneLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import {
  BsGenderFemale,
  BsGenderMale,
  BsGenderTrans,
  BsThreeDots,
} from "react-icons/bs";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { MdOutlineHistory } from "react-icons/md";
import UsersData from "@/public/data/users";
import { usePanel } from "../UserInfoPanel/UserPanelContext";
import { SiConvertio } from "react-icons/si";
import { MdDeleteOutline } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { BiTransfer } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMailOpenOutline } from "react-icons/io5";
type Activity = {
  id: number;
  remainder: string;
  task_priority: string;
  assigned_to: string;
};

type Note = {
  id: number;
  time: string;
  note: string;
};

type User = {
  id: number;
  name: string;
  gender: string;
  email: string;
  contact: string;
  job_title: string;
  annual_revenue: number;
  status: string;
  location: string;
  company: string;
  country: string;
  category: string;
  activities: Activity[];
  notes: Note[];
};

type UserCardProps = {
  user: User;
};

const DataCard = ({ user }: UserCardProps) => {
  const { setPanelVisible, setPanelData } = usePanel();
  return (
    <div>
      <Card key={user.id} className="mb-3 shadow-lg ">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex items-center gap-3 mb-1">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="absolute bottom-2 right-1 transform translate-x-1/2 translate-y-1/2">
                  <div className="flex items-center justify-center w-5 h-5 bg-slate-100 rounded-full border border-gray-400 ">
                    {user.gender === "Male" && (
                      <BsGenderMale size={11} className="text-gray-600" />
                    )}
                    {user.gender === "Female" && (
                      <BsGenderFemale className="text-gray-400" />
                    )}
                    {user.gender !== "Male" && user.gender !== "Female" && (
                      <BsGenderTrans className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <CardTitle className="text-[18px] text-gray-700">
                  {user.name}
                </CardTitle>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <SlLocationPin /> <p>{user.location}</p>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer rounded-full hover:bg-gray-200 h-8 w-8 p-0 flex items-center justify-center">
                  <BsThreeDots className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                <DropdownMenuItem className="cursor-pointer">
                  <CiEdit className="mr-2" size={20} /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const tmp_data = UsersData.find(
                      (item) => item.id === user.id
                    );

                    setPanelData(tmp_data);
                    setPanelVisible(true);
                  }}
                  className="cursor-pointer"
                >
                  <GrContactInfo className="mr-2" size={20} /> Contact View
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <GrContactInfo className="mr-2" size={20} /> Contact Full View
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <BiTransfer className="mr-2" size={20} /> Convert Contact
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <MdOutlineHistory className="mr-2" size={20} /> History
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <RiDeleteBin5Line className="mr-2 text-red-500" size={20} />{" "}
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <PiPhoneLight className="mr-2" size={20} /> Call
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <IoMailOpenOutline className="mr-2" size={20} /> Mail
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <TfiEmail className="mt-1" /> <p className="mt-1"> {user.email}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <PiPhoneLight className="mt-1" />{" "}
            <p className="mt-1">{user.contact}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <Image
              className="rounded-full transition-all group-hover:scale-110 mt-1"
              alt="profile"
              src=""
              width={24}
              height={24}
            />
            <p className="mt-1">{user.company}</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DataCard;
