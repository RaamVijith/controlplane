"use client";
import clsx from "clsx";
import { useState } from "react";
import { TbLayoutGrid, TbLayoutKanban, TbLayoutList } from "react-icons/tb";
import { IoAdd, IoFilterOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FillButton, OutlineButton } from "../../../../../components/libs/buttons";
import AddCompanyDialog from "./AddCompany";
import ListFragmentCompany from "../fragmentsCompany/ListFragmentCompany";

const TabNavigationCompany = () => {
  const [isActive, setIsActive] = useState<number>(1);
  const [activeFrag, setActiveFrag] = useState<React.ReactNode>(
     <ListFragmentCompany />
  );
  const TabSettings = [
    {
      id: 1,
      title: "List",
      Icon: <TbLayoutList />,
      Fragment: <ListFragmentCompany />,
    },
    // {
    //   id: 2,
    //   title: "Kanban",
    //   Icon: <TbLayoutKanban />,
    //   Fragment: <KanbanFragment />,
    // },
    // {
    //   id: 3,
    //   title: "Grid",
    //   Icon: <TbLayoutGrid />,
    //   Fragment: <GridFragment />,
    // },
  ];

  const onFragChange = (id: number, frag: React.ReactNode) => {
    setIsActive(id);
    setActiveFrag(frag);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab nav header */}
      <div className="flex border-b-2 justify-between px-8">
        <div className="flex gap-3">
          {TabSettings.map((item) => (
            <div
              key={item.id}
              onClick={() => onFragChange(item.id, item.Fragment)}
              className={clsx(
                "border-[#0000] border-b-[3px]",
                isActive === item.id && "border-[#1D62B4]"
              )}
            >
              <div
                className={clsx(
                  "flex text-gray-600 items-center justify-center gap-2 cursor-pointer py-6 px-4",
                  isActive === item.id && " text-[#1D62B4]"
                )}
                key={item.id}
              >
                {item.Icon}
                <div className="font-[500] text-sm">{item.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center justify-center gap-3">
          <OutlineButton>
            <IoFilterOutline size={16} />
            <div className="text-sm">Sort By</div>
          </OutlineButton>

          <OutlineButton>
            <FiFilter size={16} />
            <div className="text-sm">Filter</div>
          </OutlineButton>
          <div className="h-10 border-[1px] my-2"></div>
         
          <AddCompanyDialog
            mode="add"
            trigger={
              <FillButton>
                <IoAdd />
                <div className="text-sm">Create Company</div>
              </FillButton>
            }                                                       
          />
        </div>
      </div>
      <div>
        <div className="flex border-b-2 justify-between px-10 py-4 md:hidden">
          <OutlineButton>
            <IoFilterOutline size={16} />
            <div className="text-sm">Sort By</div>
          </OutlineButton>
          <div className="h-10 border-[1px]"></div>
          <OutlineButton>
            <FiFilter size={16} />
            <div className="text-sm">Filter</div>
          </OutlineButton>
          <div className="h-10 border-[1px]"></div>
          <AddCompanyDialog
            mode="add"
            trigger={
              <FillButton>
                <IoAdd />
                <div className="text-sm">Create Company</div>
              </FillButton>
            }                                                       
          />
        </div>
      </div>
      <div className="flex h-full w-full">{activeFrag}</div>
    </div>
  );
};

export default TabNavigationCompany;
