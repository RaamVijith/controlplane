import clsx from "clsx";
import { useContext, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { InverseFillButton } from "../../libs/buttons";
import UsersData from "@/public/data/users";
import UserInfoPanel from "../comps/UserInfoPanel/UserInfoPanel";
import DataTable from "../comps/Table/Table";
import SearchBar from "../comps/SearchBar";
import Email from "../../Email";

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

type Users = {
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

const ListFragment = () => {
  const [isSelected, setIsSelected] = useState<number>(1);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>(UsersData);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const usersheader = [
    { name: "Name", uid: "name" },
    { name: "Email", uid: "email" },
    { name: "Phone", uid: "contact" },
    { name: "Category", uid: "category" },
    { name: "Location", uid: "location" },
    { name: "Gender", uid: "gender" },
    { name: "Action", uid: "action" },
  ];
  const ListNavSettings = [
    {
      id: 1,
      title: "All Contacts",
      action: "*",
    },
    {
      id: 2,
      title: "Employee",
      action: "employee",
    },
    {
      id: 3,
      title: "Partners",
      action: "partners",
    },
    {
      id: 4,
      title: "Customers",
      action: "customers",
    },
  ];

  const handleNavClick = (id: number) => {
    setIsSelected(id);
    if (id === 1) {
      // All Contacts selected, show all users
      setFilteredUsers(UsersData);
    } else {
      // Filter users based on category
      const category = ListNavSettings.find((item) => item.id === id)?.title;
      if (category) {
        const filtered = UsersData.filter((user) => user.category === category);
        console.log("Filtered Users:", filtered);
        setFilteredUsers(filtered);
      }
    }
  };
  const handleAddCategoryClick = () => {
    setIsCardOpen(true);
  };

  const handleCloseCard = () => {
    setIsCardOpen(false);
  };

  // const filteredData = getFilteredData();
  return (
    <div className="block w-full">
      {/* <UserInfoPanel /> */}
      <div className="flex py-6 px-8 border-b-2 justify-between">
        {/* left headersection */}
        <div className="flex">
          {ListNavSettings.map((item) => (
            <div
              key={item.id}
              className={clsx(
                " cursor-pointer  px-4 py-2 rounded-full text-sm text-gray-500 font-bold",
                isSelected === item.id
                  ? "bg-[#eee] text-gray-800"
                  : "hover:text-gray-800"
              )}
              onClick={() => handleNavClick(item.id)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1">
          <SearchBar />
          <InverseFillButton onClick={handleAddCategoryClick}>
            <IoAdd size={16} />
            <div className="text-sm">Add Categories</div>
          </InverseFillButton>
        </div>
      </div>
      <div>
        <DataTable users={filteredUsers} />
      </div>
      {isCardOpen && <Email onClose={handleCloseCard} />}
    </div>
  );
};

export default ListFragment;
