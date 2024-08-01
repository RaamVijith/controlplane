import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { GoTriangleDown } from "react-icons/go";

interface UpcomingActivityCardProps {
  data: {
    created?: string;
    time?: string;
    preparedFor?: string;
    description?: string;
    reminder?: string;
    task?: string;
    user?: string;
  }[];
}

const UpcomingActivityCard: React.FC<UpcomingActivityCardProps> = ({
  data,
}) => {
  const [reminderOpen, setReminderOpen] = useState(false);
  const [taskPriorityOpen, setTaskPriorityOpen] = useState(false);
  const [assignedToOpen, setAssignedToOpen] = useState(false);

  const [reminder, setReminder] = useState("reminder");
  const [taskPriority, setTaskPriority] = useState("High");
  const [assignedTo, setAssignedTo] = useState("User");

  const toggleReminderDropdown = () => setReminderOpen(!reminderOpen);
  const toggleTaskPriorityDropdown = () =>
    setTaskPriorityOpen(!taskPriorityOpen);
  const toggleAssignedToDropdown = () => setAssignedToOpen(!assignedToOpen);

  const handleReminderSelect = (option: string) => {
    setReminder(option);
    setReminderOpen(false);
  };

  const handleTaskPrioritySelect = (option: string) => {
    setTaskPriority(option);
    setTaskPriorityOpen(false);
  };

  const handleAssignedToSelect = (option: string) => {
    setAssignedTo(option);
    setAssignedToOpen(false);
  };

  return (
    <>
      {data.map((activity, index) => (
        <div key={index} className="border-[1px] border-gray-300">
          <div className="flex p-4 gap-3">
            <Avatar className="mb-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-[500] text-gray-600">
                Prepare quote for Jenny Wilson
              </div>
              <div className="text-gray-500 text-sm whitespace-pre-wrap">
                {
                  "She's interested in our new product and wants to negotiate the price. Please include our price listings and set up a call."
                }
              </div>
            </div>
          </div>
          <div className="flex m-4">
            <div className="flex flex-col p-4 w-full border-[1px] border-gray-300 gap-2">
              <div className="text-sm font-[500] text-gray-600">Reminder</div>

              <div
                className="flex text-center gap-2 items-center text-sm cursor-pointer"
                onClick={toggleReminderDropdown}
              >
                <div>{reminder}</div>
                <GoTriangleDown size={12} />
              </div>
              {reminderOpen && (
                <div className="bg-white border border-gray-300 mt-1 rounded shadow-lg">
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleReminderSelect("Reminder")}
                  >
                    Reminder
                  </div>
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleReminderSelect("No Reminder")}
                  >
                    No Reminder
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col p-4 w-full border-[1px] md:border-[1px] border-gray-300 gap-2">
              <div className="text-sm font-[500] text-gray-600">
                Task Priority
              </div>

              <div
                className="flex gap-2 items-center text-sm cursor-pointer"
                onClick={toggleTaskPriorityDropdown}
              >
                {/* <div>{taskPriority}</div> */}
                {taskPriority === "High" ? (
                  <div className="flex items-center">
                    <span className="inline-flex h-4 w-4 rounded-full bg-red-400 mr-2" />
                    High
                  </div>
                ) : taskPriority === "Low" ? (
                  <div className="flex items-center">
                    <span className="inline-flex h-4 w-4 rounded-full bg-green-400 mr-2" />
                    Low
                  </div>
                ) : (
                  <div>{taskPriority}</div>
                )}
                <GoTriangleDown size={12} />
              </div>
              {taskPriorityOpen && (
                <div className="bg-white border border-gray-300 mt-1 rounded shadow-lg">
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleTaskPrioritySelect("High")}
                  >
                    <span className=" flex items-center">
                      <span className=" left-0 inline-flex h-4 w-4 rounded-full bg-red-400 mr-2" />
                      High
                    </span>
                  </div>

                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleTaskPrioritySelect("Low")}
                  >
                    <span className=" flex items-center">
                      <span className=" left-0 inline-flex h-4 w-4 rounded-full bg-green-400 mr-2" />
                      Low
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col p-4 w-full gap-2 border-[1px] border-gray-300">
              <div className="text-sm font-[500] text-gray-600">
                Assigned to
              </div>

              <div
                className="flex gap-2 items-center text-sm cursor-pointer"
                onClick={toggleAssignedToDropdown}
              >
                <div>{assignedTo}</div>
                <GoTriangleDown size={12} />
              </div>
              {assignedToOpen && (
                <div className="bg-white border border-gray-300 mt-1 rounded shadow-lg">
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleAssignedToSelect("lucy")}
                  >
                    Lucy Headwood
                  </div>
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleAssignedToSelect("Admin")}
                  >
                    Admin
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UpcomingActivityCard;
