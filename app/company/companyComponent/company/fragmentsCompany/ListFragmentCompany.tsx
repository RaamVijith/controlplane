import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FillButton, InverseFillButton } from "../../../../../components/libs/buttons";
import UsersData from "@/public/data/users";
import CompanyData from "@/public/data/companies";
// import UserInfoPanel from "../../UserInfoPanel/UserInfoPanel";
// import DataTable from "../../ContactTable/Table";
import DataTableCompany from "../CompanyTable/TableCompany";
// import SearchBar from "../../SearchBar";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
// import AddCategoryDialog from "../../UserInfoPanel/AddCategory";
// import CreateCompanyDialog from "../../UserInfoPanel/AddCompany";
import CreateNewChat from "../demoDialogBoxes/CreateNewChat";
import LogCallDialog from "../demoDialogBoxes/LogCallDialog";
// import AddContactDialog from "../../UserInfoPanel/AddContact";
import CreateNewTasksDialog from "../demoDialogBoxes/CreateNewTasksDialog";
import { IoMdRefresh } from "react-icons/io";
import { HiViewColumns } from "react-icons/hi2";
import SideSheetCompany from "../componentsCompany/ShideSheetCompany";
import Testing from "../CompanyTable/Testing";
// const users: Users[] = UsersData;
// type Activity = {
//   id: number;
//   remainder: string;
//   task_priority: string;
//   assigned_to: string;
// };

// type Note = {
//   id: number;
//   time: string;
//   note: string;
// };

// type Users = {
//   id: number;
//   name: string;
//   gender: string;
//   email: string;
//   contact: string;
//   job_title: string;
//   annual_revenue: number;
//   status: string;
//   location: string;
//   company: string;
//   country: string;
//   category: string;
//   activities: Activity[];
//   notes: Note[];
// };

const ListFragmentCompany = () => {
  const [isSelected, setIsSelected] = useState<number>(1);
  const [searchInput, setSearchInput] = useState("");

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
      title: "All Companies",
      action: "*",
    },
    // {
    //   id: 2,
    //   title: "Manufecture",
    //   action: "manufecture",
    // },{
    //   id: 3,
    //   title: "Retail",
    //   action: "retail",
    // },{
    //   id: 4,
    //   title: "Software",
    //   action: "software",
    // },
  ];

  const handleNavClick = (id: number) => {
    setIsSelected(id);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Dynamic filtering logic
  let displayedCompanies = CompanyData;

  // Filter by industry type
  if (isSelected !== 1) {
    const industryType = ListNavSettings.find(
      (item) => item.id === isSelected
    )?.title;
    if (industryType) {
      displayedCompanies = displayedCompanies.filter(
        (company) => company.industryType === industryType
      );
    }
  }

  // Filter by search input for the "Company Name" column
  displayedCompanies = displayedCompanies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
      company.country.toLowerCase().includes(searchInput.toLowerCase()) ||
      company.city.toLowerCase().includes(searchInput.toLowerCase()) ||
      company.industryType.toLowerCase().includes(searchInput.toLowerCase())
  );

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
              {item.title} (4)
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
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
          {/* <AddCategoryDialog
            trigger={
              <InverseFillButton>
                <IoAdd size={16} />
                <div className="text-sm">Add Categories</div>
              </InverseFillButton>
            }
          /> */}

          {/* Demo dialogBoxes */}
          {/* <AddContactDialog
          mode='add'
          trigger={
            <InverseFillButton>
              <IoAdd size={16} />
              <div className="text-sm">Add Contact</div>
            </InverseFillButton>
          }
          /> */}

          <CreateNewChat
            trigger={
              <InverseFillButton>
                <div className="text-sm">Create New Chat</div>
              </InverseFillButton>
            }
          />
          <LogCallDialog
            trigger={
              <InverseFillButton>
                <div className="text-sm">Log A Call</div>
              </InverseFillButton>
            }
          />
          <CreateNewTasksDialog
            trigger={
              <InverseFillButton>
                <div className="text-sm">Create New task</div>
              </InverseFillButton>
            }
          />

          {/* ------------------ */}
          {/* right side buttons */}
          {/* <SideSheetCompany
            trigger={
              <HiViewColumns className="hover:text-blue-800 cursor-pointer" />
            }
          /> */}
        </div>
      </div>
      <div>
        <DataTableCompany companies={displayedCompanies} />
      </div>
    </div>
  );
};

export default ListFragmentCompany;
