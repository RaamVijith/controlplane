import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FillButton, InverseFillButton } from "../../libs/buttons";
import UsersData from "@/public/data/users";
import UserInfoPanel from "../comps/UserInfoPanel/UserInfoPanel";
import DataTable from "../comps/ContactTable/Table";
import SearchBar from "../comps/SearchBar";
import { FaEllipsisV, FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import AddCategoryDialog from "../comps/UserInfoPanel/AddCategory";
import { MdMoreHoriz, MdOutlineDelete, MdOutlineRefresh } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

// const users: Users[] = UsersData;
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
  const [searchInput, setSearchInput] = useState("");
  const [isIconMenuOpen, setIsIconMenuOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  // const usersheader = [
  //   { name: "Name", uid: "name" },
  //   { name: "Email", uid: "email" },
  //   { name: "Phone", uid: "contact" },
  //   { name: "Category", uid: "category" },
  //   { name: "Location", uid: "location" },
  //   { name: "Gender", uid: "gender" },
  //   { name: "Action", uid: "action" },
  // ];
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
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Dynamic filtering logic
  let displayedUsers = UsersData;

  // Filter by category
  if (isSelected !== 1) {
    const category = ListNavSettings.find(
      (item) => item.id === isSelected
    )?.title;
    if (category) {
      displayedUsers = displayedUsers.filter(
        (user) => user.category === category
      );
    }
  }

  // Filter by search input for the "Name" column
  displayedUsers = displayedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const toggleIconMenu = () => {
    setIsIconMenuOpen(!isIconMenuOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
      setIsIconMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const filteredData = getFilteredData();
  return (
    <div className="block w-full">
      {/* <UserInfoPanel /> */}
      <div className="flex py-6 px-8 border-b-2 justify-between items-center">
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
              {item.title} (40)
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          {/* Horizontal Icon */}
          <div className="relative" ref={iconRef}>
            <div
              className="cursor-pointer rounded-full hover:bg-gray-200 h-8 w-8 p-0 flex items-center justify-center ml-3"
              onClick={toggleIconMenu}
            >
              <BsThreeDots size={20} />
            </div>

            {/* Icons with Animation */}
            <div
              className={`flex items-center gap-3 absolute right-full top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
                isIconMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <MdOutlineRefresh
                className="text-gray-400 cursor-pointer hover:text-gray-700"
                size={20}
              />
              <MdOutlineDelete
                className="text-gray-400 cursor-pointer hover:text-gray-700"
                size={20}
              />
            </div>
          </div>
          {/* SearchBar */}
          <div className="relative max-w-sm">
            {/* Search Icon */}
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {/* Input Field */}
            <Input
              placeholder="Filter by Name"
              value={searchInput}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <AddCategoryDialog
            trigger={
              <InverseFillButton>
                <IoAdd size={16} />
                <div className="text-sm">Add Categories</div>
              </InverseFillButton>
            }
          />
        </div>
      </div>
      <div>
        <DataTable users={displayedUsers} />
      </div>
    </div>
  );
};

export default ListFragment;
