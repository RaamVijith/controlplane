import { useState } from "react";
import { InverseFillButton } from "../../libs/buttons";
import clsx from "clsx";
import { IoAdd } from "react-icons/io5";
import UsersData from "@/public/data/users";
import GridCard from "../comps/DataCard/GridDataCard";
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

const GridFragment = () => {
  const [isSelected, setIsSelected] = useState<number>(1);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(UsersData);
  const ListNavSettings = [
    {
      id: 1,
      title: "All Contacts",
      action: "*",
    },
    {
      id: 2,
      title: "Employee",
      action: "Employee",
    },
    {
      id: 3,
      title: "Partners",
      action: "Partners",
    },
    {
      id: 4,
      title: "Customers",
      action: "Customers",
    },
  ];
  const handleFilterChange = (id: number) => {
    setIsSelected(id);
    const selectedAction =
      ListNavSettings.find((item) => item.id === id)?.action || "*";

    if (selectedAction === "*") {
      setFilteredUsers(UsersData);
    } else {
      setFilteredUsers(
        UsersData.filter((user) => user.category === selectedAction)
      );
    }
  };
  return (
    <div className="block w-full">
      {/* <UserInfoPanel /> */}
      <div className="flex py-6 px-8 border-b-2 justify-between">
        {/* left headersection */}
        <div className="flex">
          {ListNavSettings.map((item) => (
            <div
              key={item.id}
              onClick={() => handleFilterChange(item.id)}
              className={clsx(
                " cursor-pointer  px-4 py-2 rounded-full text-sm text-gray-500 font-bold",
                isSelected === item.id
                  ? "bg-[#eee] text-gray-800"
                  : "hover:text-gray-800"
              )}
            >
              {item.title} (40)
            </div>
          ))}
        </div>
        <InverseFillButton>
          <IoAdd size={16} />
          <div className="text-sm">PlaceHolders</div>
        </InverseFillButton>
      </div>
      <div>
        <GridCard users={filteredUsers} />
      </div>
    </div>
  );
};

export default GridFragment;
