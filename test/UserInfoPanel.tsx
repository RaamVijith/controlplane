import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaRegStickyNote } from "react-icons/fa";
import { GoBell, GoTriangleDown } from "react-icons/go";
import { LuArrowRightFromLine } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineCheck } from "react-icons/md";
import { PiPhoneLight } from "react-icons/pi";
import { RiCalendarScheduleLine, RiDeleteBin5Line } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";
import { VscBell, VscSend } from "react-icons/vsc";
import { usePanel } from "./UserPanelContext";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiEdit } from "react-icons/ci";
import Switch from "react-switch";
import ContactProperty from "../../Selector/ContactProperty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddContactDialog from "./AddContact";
import { BiSolidEdit } from "react-icons/bi";
import Delete from "@/app/components/Delete";
import Email from "@/app/components/Email";
const UserInfoPanel = () => {
  const {
    isPanelVisible,
    panelData,
    setPanelVisible,
    setExtendedUserInfoPanelVisible,
  } = usePanel();
  const [isChecked, setIsChecked] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [taskPriorityOpen, setTaskPriorityOpen] = useState(false);
  const [assignedToOpen, setAssignedToOpen] = useState(false);

  const [reminder, setReminder] = useState("reminder");
  const [taskPriority, setTaskPriority] = useState("High");
  const [assignedTo, setAssignedTo] = useState("User");

  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

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
  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
    // Add your logic
  };

  const handleViewFullDetails = () => {
    setPanelVisible(false); // Hide the current panel if needed
    setExtendedUserInfoPanelVisible(true);
    // This might involve setting a state in a parent component or context
  };

  const handleMenuItemClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleAddEmailClick = () => {
    setIsCardOpen(true);
  };

  const handleEmailCloseCard = () => {
    setIsCardOpen(false);
  };
  return (
    <>
      {isPanelVisible && panelData && (
        <div
          onClick={() => setPanelVisible(false)}
          className="absolute flex justify-end top-0 left-0 w-full bg-[#0003] z-10 h-svh"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full md:w-full lg:w-[80%] xl:w-[50%] flex flex-col z-20 overflow-y-scroll"
          >
            <div className="w-full">
              {/* Top header */}
              <div className="flex justify-between py-4 px-10 border-b-[1px] border-gray-300">
                <div className="flex gap-2 items-center justify-center text-[#1D62B4] font-[500]">
                  <LuArrowRightFromLine />
                  <div className="cursor-default text-sm">Contact View</div>
                </div>
                <div
                  onClick={handleViewFullDetails}
                  className=" flex cursor-pointer items-center justify-center text-xs font-semibold text-gray-500 px-2 rounded-sm outline outline-[1px] outline-gray-300 hover:bg-[#1D62B4] hover:text-white"
                >
                  View full details
                </div>
              </div>

              {/* user info box */}
              <div className="flex flex-col px-10 py-8 gap-10 border-b-[1px] border-slate-300 text-xs 2xl:text-sm">
                <div className=" border border-slate-300">
                  {/* top part */}
                  <div className="flex justify-between border-b-[1px] border-slate-300 p-4 text-xs">
                    <div className="flex gap-2 items-center">
                      <Avatar>
                        <AvatarImage
                          src={`/users/${panelData.id}.jpg`}
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex gap-4 items-center">
                          <div className="text-gray-700 font-[500]">
                            <strong>{panelData.name}</strong>
                          </div>
                          <div className="flex gap-2 items-center justify-center bg-[#eee] px-4 py-1 rounded-full text-gray-500">
                            <div className="bg-[#5A925F] h-[10px] w-[10px] rounded-full"></div>
                            <div className="flex">
                              {"Last Activity: " + "2 days ago"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <div className="flex items-center gap-2 ">
                            <TfiEmail />
                            <div>{panelData.email}</div>
                          </div>
                          {/* <div className="bg-gray-700 h-[5px] w-[5px] rounded-full"></div> */}
                          <div className="flex gap-2 items-center text-[12px]">
                            <PiPhoneLight className="text-[16px] lg:text-[20px]" />
                            <div>{panelData.contact}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex text-gray-700 items-center justify-center gap-2">
                      <div className="hidden sm:flex items-center justify-center p-2 border border-gray-600 rounded-full hover:bg-gray-200 cursor-pointer text-[16px]">
                        <PiPhoneLight />
                      </div>
                      <div
                        className="hidden sm:flex items-center justify-center p-2 border border-gray-600 rounded-full hover:bg-gray-200 cursor-pointer text-[16px]"
                        onClick={handleAddEmailClick}
                      >
                        <TfiEmail />
                      </div>
                      <div className="hidden sm:flex items-center justify-center p-2 border border-gray-600 rounded-full hover:bg-gray-200 cursor-pointer text-[16px]">
                        <VscSend />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="items-center justify-center p-2 border border-gray-600 rounded-full hover:bg-gray-200 cursor-pointer text-[16px]">
                            <RxDotsHorizontal />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <span className="pl-2 gap-3 flex items-center justify-center">
                              <GoBell size={20} className="text-black" />{" "}
                              Notification
                            </span>

                            <Switch
                              onChange={handleSwitchChange}
                              checked={isChecked}
                              uncheckedIcon={false}
                              checkedIcon={false}
                              width={25}
                              height={15}
                              className="ml-2"
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer sm:hidden">
                            <PiPhoneLight size={16} className="mr-2" /> Call
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer sm:hidden"
                            onClick={handleAddEmailClick}
                          >
                            <TfiEmail size={16} className="mr-2" /> Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer sm:hidden">
                            <VscSend size={16} className="mr-2" /> Send
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleMenuItemClick}
                          >
                            <AddContactDialog
                              mode="edit"
                              trigger={
                                <span className="pl-2 gap-3 flex items-center justify-center">
                                  <BiSolidEdit
                                    className="text-black"
                                    size={20}
                                  />
                                  Edit
                                </span>
                              }
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleMenuItemClick}
                          >
                            <Delete
                              trigger={
                                <span className="pl-2 gap-3 flex items-center justify-center">
                                  <RiDeleteBin5Line
                                    className="text-red-500"
                                    size={20}
                                  />
                                  Delete
                                </span>
                              }
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* bottom part */}

                  <div className="flex">
                    <div className="flex items-center justify-center w-full flex-col border-r-[1px] border-t-0 p-4 gap-1">
                      <div className="text-sm text-gray-500">
                        Contact Owner{" "}
                      </div>
                      <div className="text-sm">{panelData.name}</div>
                    </div>
                    <div className="flex items-center justify-center w-full flex-col border-r-[1px] border-t-0 p-4 gap-1">
                      <div className="text-sm text-gray-500">Company</div>
                      <div className="text-sm">{panelData.name}</div>
                    </div>
                    <div className="flex items-center justify-center w-full flex-col border-r-[1px] border-t-0 p-4 gap-1">
                      <div className="text-sm text-gray-500">Job Title</div>
                      <div className="text-sm">{panelData.job_title}</div>
                    </div>
                    <div className="flex items-center justify-center w-full flex-col border-t-0 p-4 gap-1">
                      <div className="text-sm text-gray-500">
                        Annual revenue
                      </div>
                      <div className="text-sm">{panelData.annual_revenue}</div>
                    </div>
                  </div>
                </div>

                {/* <div className="flex border-[2px] border-[#1D62B4] tems-center cursor-default">
                  <div className="flex p-4 border-r-2 border-[#1D62B4] items-center justify-center gap-2 w-full bg-[#1D62B440] text-[#1D62B4]">
                    <MdOutlineCheck />
                    <div>New</div>
                  </div>
                  <div className="flex p-4 border-r-2 border-[#1D62B4] items-center justify-center gap-2 w-full bg-[#1D62B440] text-[#1D62B4]">
                    <MdOutlineCheck />
                    <div>Contacted</div>
                  </div>
                  <div className="flex p-4 border-r-2 border-[#1D62B4] items-center justify-center gap-2 w-full bg-[#1D62B4] text-white">
                    <MdOutlineCheck />
                    <div>Qualified</div>
                  </div>
                  <div className="flex p-4 border-r-2 border-[#1D62B4] items-center justify-center gap-2 w-full text-gray-500">
                    <MdOutlineCheck />
                    <div>Negotiation</div>
                  </div>
                  <div className="flex p-4 border-r-2 items-center justify-center gap-2 w-full text-gray-500">
                    <MdOutlineCheck />
                    <div>Closed</div>
                  </div>
                </div> */}
                <ContactProperty />
              </div>
              {isCardOpen && <Email onClose={handleEmailCloseCard} />}
              {/* <div className="py-4 px-10">
                <UpcomingActivity />
              </div> */}
              <div className="border-gray-300 border-b-[1px] pb-10">
                <div className="flex justify-between py-4 px-10 ">
                  <div className="flex gap-2 items-center justify-center text-[#1D62B4] font-[500]">
                    <RiCalendarScheduleLine />
                    <div className="cursor-default text-sm">
                      Upcoming Activities
                    </div>
                    <div className="bg-[#1D62B450] px-2 rounded-md">
                      {panelData.activities.length}
                    </div>
                  </div>
                  <div className=" flex cursor-pointer items-center justify-center text-xs font-semibold text-gray-500 px-2 rounded-sm outline outline-[1px] outline-gray-300 hover:bg-[#1D62B4] hover:text-white">
                    View all activities
                  </div>
                </div>
                {panelData.activities.map((activity: any) => (
                  <div
                    key={activity.id}
                    className="mx-10 border-[1px] border-gray-300"
                  >
                    <div className="flex p-4 gap-3">
                      <Avatar className="mb-5">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
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
                    <div className="flex m-4 border-[1px] border-gray-300">
                      <div className="flex flex-col p-4 w-full border-r-[1px] border-gray-300 gap-2">
                        <div className="text-sm font-[500] text-gray-600">
                          Reminder
                        </div>
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
                              onClick={() =>
                                handleReminderSelect("No Reminder")
                              }
                            >
                              No Reminder
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col p-4 w-full border-r-[1px] border-gray-300 gap-2">
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
                              <span className="flex items-center">
                                <span className="inline-flex h-4 w-4 rounded-full bg-red-400 mr-2" />
                                High
                              </span>
                            </div>
                            <div
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => handleTaskPrioritySelect("Low")}
                            >
                              <span className="flex items-center">
                                <span className="inline-flex h-4 w-4 rounded-full bg-green-400 mr-2" />
                                Low
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col p-4 w-full gap-2">
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
                              onClick={() =>
                                handleAssignedToSelect("Lucy Headwood")
                              }
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
              </div>

              <div>
                <div className="flex justify-between py-4 px-10 ">
                  <div className="flex gap-2 items-center justify-center text-[#1D62B4] font-[500]">
                    <FaRegStickyNote />
                    <div className="cursor-default text-sm">Notes</div>
                    <div className="bg-[#1D62B450] px-2 rounded-md">
                      {panelData.notes.length}
                    </div>
                  </div>
                  <div className=" flex cursor-pointer items-center justify-center text-xs font-semibold text-gray-500 px-2 rounded-sm outline outline-[1px] outline-gray-300 hover:bg-[#1D62B4] hover:text-white">
                    Add new note
                  </div>
                </div>

                <div className="flex flex-col gap-8 pb-10">
                  {panelData.notes.map((note: any) => (
                    <div
                      key={note.id}
                      className="mx-10 border-[1px] border-gray-300"
                    >
                      <div>
                        <div className="flex gap-2 justify-between px-4 py-6">
                          <div className="flex gap-2 items-center justify-center">
                            <FaRegStickyNote color="#1D62B4" />
                            <div className="text-sm text-gray-600">
                              {`Note by ${panelData.name}`}
                            </div>
                          </div>

                          <div className="flex gap-2 items-center text-gray-600">
                            <AiOutlineCalendar />
                            <div className="text-sm 2xl:text-xl">
                              {note.time}
                            </div>
                            <RxDotsHorizontal size={20} />
                          </div>
                        </div>

                        <div className="p-4 text-gray-600 border-t-[1px] border-gray-300">
                          {note.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfoPanel;
