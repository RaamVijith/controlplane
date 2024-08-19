import { CgProfile } from "react-icons/cg";
import { FaRegBuilding, FaRegHandshake, FaRegLightbulb } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { RiContactsLine } from "react-icons/ri";

export const SideNavOptions = [
  {
    id: 1,
    title: "Contacts",
    Icon: <CgProfile size={24} />,
    path: "/contact",
  },
  {
    id: 2,
    title: "Company",
    Icon: <FaRegBuilding size={24} />,
    path: "/company",
  },
  {
    id: 3,
    title: "Leads",
    Icon: <HiOutlineUserGroup size={24} />,
    path: "/leads",
  },
  {
    id: 4,
    title: "Opportunity",
    Icon: <FaRegLightbulb size={24} />,
    path: "/opportunity",
  },
  {
    id: 5,
    title: "Customer",
    Icon: <FaRegHandshake size={24} />,
    path: "/customer",
  },
  {
    id: 6,
    title: "Settings",
    Icon: <IoMdSettings size={24} />,
    path: "/settings",
  },
  // {
  //   id: 7,
  //   title: "Content",
  // },
];
