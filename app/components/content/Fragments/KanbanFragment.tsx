import UsersData from "@/public/data/users";
import { CardHeader } from "@/components/ui/card";
import { useEffect, useState, useMemo } from "react";
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
type GroupedUsers = {
  [category: string]: User[];
};
import clsx from "clsx";
import { FaAngleDown } from "react-icons/fa";
import { usePanel } from "../comps/UserInfoPanel/UserPanelContext";
import AddData from "../comps/NodataComponent/AddData";
import DataCard from "../comps/DataCard/KanbanDataCard";
const groupByCategory = (data: User[]): GroupedUsers => {
  return data.reduce((acc: GroupedUsers, user: User) => {
    if (!acc[user.category]) {
      acc[user.category] = [];
    }
    acc[user.category].push(user);
    return acc;
  }, {} as GroupedUsers);
};

const KanbanFragment = () => {
  const [groupedUsers, setGroupedUsers] = useState<GroupedUsers>({});
  const [visibleCategories, setVisibleCategories] = useState<{
    [category: string]: boolean;
  }>({});
  const { setPanelVisible, setPanelData } = usePanel();

  useEffect(() => {
    const grouped = groupByCategory(UsersData);
    setGroupedUsers(grouped);

    // visibility of category cards
    const initialVisibility = Object.keys(grouped).reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {} as { [category: string]: boolean });
    setVisibleCategories(initialVisibility);
  }, []);

  const toggleVisibility = (category: string) => {
    setVisibleCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  if (Object.keys(groupedUsers).length === 0) {
    return (
      <div className="w-full">
        <AddData buttonText="Add Contact" />;
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto space-x-3 p-3 h-[80vh] w-full">
      {Object.keys(groupedUsers).map((category) => {
        const isVisible = visibleCategories[category];
        return (
          <div key={category} className="w-[350px] flex-shrink-0 ">
            {/* <div className="mb-3 shadow-lg rounded-md"> */}
            <div className="mb-3 shadow-md rounded-md">
              {/* <CardHeader className="bg-slate-100 p-3"> */}
              <CardHeader className="bg-white p-3">
                <div className="flex items-center justify-between">
                  <h6
                    onClick={() => toggleVisibility(category)}
                    className={clsx(
                      "p-1 rounded-md font-semibold cursor-pointer",
                      category === "Customers"
                        ? "text-[#4167ED] bg-[#4167ED20]"
                        : category === "Employee"
                        ? "text-[#7F3E9F] bg-[#7F3E9F20]"
                        : "text-[#C5873D] bg-[#C5873D20]"
                    )}
                  >
                    {category}
                  </h6>
                  <div className="flex items-center">
                    <p className="cursor-default text-gray-500 font-semibold bg-slate-200 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                      {groupedUsers[category].length}
                    </p>
                    {/* &nbsp;
                  <FaAngleDown /> */}
                  </div>
                </div>
              </CardHeader>
            </div>
            <div
              className={clsx("transition-all duration-300 ease-in", {
                "max-h-0 overflow-hidden": !isVisible,
                "max-h-screen": isVisible,
              })}
            >
              {groupedUsers[category].map((user) => (
                <DataCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanFragment;

// <Card className="w-[400px] mx-3 my-3">
// <Card className="">
//   <CardHeader>
//     <CardTitle></CardTitle>
//     <CardDescription>
//       Deploy your new project in one-click.
//     </CardDescription>
//   </CardHeader>
//   <CardContent></CardContent>
//   <CardFooter className="flex justify-between">
//     <p>Hello</p>
//   </CardFooter>
// </Card>
// </Card>
