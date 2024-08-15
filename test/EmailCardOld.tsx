// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { CiCalendarDate } from "react-icons/ci";
// import { FaTasks } from "react-icons/fa";
// import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
// import { RiCalendarScheduleLine, RiDeleteBin5Line } from "react-icons/ri";
// import UpcomingActivityCard from "../comps/DataCard/UpcomingCard";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { upcomingData } from "@/public/data/users";
// import clsx from "clsx";
// import { Textarea } from "@/components/ui/textarea";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Delete from "../../Delete";
// import { IoMdSend } from "react-icons/io";
// import { GoHistory } from "react-icons/go";

// const icons = [
//   {
//     id: 1,
//     icon: <MdKeyboardArrowLeft size={18} />,
//     link: "",
//   },
//   {
//     id: 2,
//     icon: <MdKeyboardArrowRight size={18} />,
//     link: "",
//   },
//   {
//     id: 3,
//     icon: <RiDeleteBin5Line size={18} />,
//     link: "",
//   },
// ];

// const EmailContact = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [reminderOpen, setReminderOpen] = useState(false);
//   const [taskPriorityOpen, setTaskPriorityOpen] = useState(false);
//   const [assignedToOpen, setAssignedToOpen] = useState(false);

//   const [reminder, setReminder] = useState("reminder");
//   const [taskPriority, setTaskPriority] = useState("High");
//   const [assignedTo, setAssignedTo] = useState("User");

//   const toggleReminderDropdown = () => setReminderOpen(!reminderOpen);
//   const toggleTaskPriorityDropdown = () =>
//     setTaskPriorityOpen(!taskPriorityOpen);
//   const toggleAssignedToDropdown = () => setAssignedToOpen(!assignedToOpen);

//   const handleReminderSelect = (option: string) => {
//     setReminder(option);
//     setReminderOpen(false);
//   };

//   const handleTaskPrioritySelect = (option: string) => {
//     setTaskPriority(option);
//     setTaskPriorityOpen(false);
//   };

//   const handleAssignedToSelect = (option: string) => {
//     setAssignedTo(option);
//     setAssignedToOpen(false);
//   };
//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleMenuItemClick = (event: React.MouseEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   return (
//     <>
//       <div className="border-gray-300 border-b-[1px] pb-10 mt-4">
//         {/* <div className="flex gap-2 py-2 px-2 items-center text-[#1D62B4] font-[500]">
//           <GoHistory size={18} />
//           <div className="cursor-default text-md font-semibold">
//             Activity History
//           </div>
//         </div> */}
//         <div>
//           <div
//             className="flex justify-between items-center py-2 px-2 cursor-pointer"
//             onClick={toggleAccordion}
//           >
//             <div className="flex items-center gap-2">
//               {isOpen ? (
//                 <GoTriangleUp size={20} />
//               ) : (
//                 <GoTriangleDown size={20} />
//               )}

//               <span className="gap-2 text-sm text-gray-600">
//                 {/* <FaTasks className="text-blue-500" /> */}
//                 <p className="text-gray-600 text-md font-semibold">
//                   Thank you for contacting us Jenny
//                 </p>
//                 <p className="text-gray-600 text-sm">by Lucy Lockwood</p>
//               </span>
//             </div>
//           </div>

//           <div
//             className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
//               isOpen ? "max-h-screen" : "max-h-0"
//             }`}
//           >
//             <div className="mx-5 border-[1px] border-gray-300">
//               <div className="flex justify-between items-center">
//                 <div className="flex p-4 gap-3 ">
//                   <Avatar className="w-[50px] h-[50px]">
//                     <AvatarImage
//                       src="https://github.com/shadcn.png"
//                       alt="@shadcn"
//                     />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="font-semibold text-gray-600 text-sm">
//                       Jenny Wilson
//                     </div>
//                     <div className="text-gray-500 text-sm">
//                       to Lucy Lookwood
//                     </div>
//                     <div className="text-gray-500 text-sm">
//                       10 June 2024 10:00AM
//                     </div>
//                   </div>
//                 </div>{" "}
//                 <div className="flex p-4 gap-3 ">
//                   {icons.map((icon, id) => (
//                     <div
//                       key={id}
//                       className="rounded-full w-8 h-8 border border-slate-400 flex items-center justify-center hover:bg-slate-300"
//                     >
//                       {icon.icon}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <hr className="border-1" />
//               <div className="p-3">
//                 <p className="text-sm mb-2">Hello Lucy,</p>
//                 <p className="text-sm">
//                   Lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry. Lorem Ipsum has been the industrys
//                   standard dummy text ever since the 1500s, when an unknown
//                   printer took a galley of type and scrambled it to make a type
//                   specimen book. It has survived not only five centuries, but
//                   also the leap into electronic typesetting, remaining
//                   essentially unchanged. It was popularised in the 1960s with
//                   the release of Letraset sheets containing Lorem Ipsum
//                   passages, and more recently with desktop publishing software
//                   like Aldus PageMaker including versions of Lorem Ipsum.
//                 </p>
//                 <p className="text-sm mt-2">
//                   Best <br />
//                   Daniele
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmailContact;
