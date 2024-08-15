import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { CommonTable } from "@/components/HistoryTable/data-table";

import axios from "axios";
// import {
//   HistoryTable,
//   columns,
// } from "../../../components/HistoryTable/HistoryColumnTable";
import { FaCompress, FaExpand } from "react-icons/fa";
import { HistoryDetailsTable } from "./HistoryDetailsTable";
import { columns } from "./HistoryDetailsColumn";
import HistoryDataCard from "./HistoryDataCard";
// import { columns } from "./AuditLogColumn";
// import { AuditTable } from "./AuditTable";
// import { columns } from "@/components/HistoryTable/HistoryColumnTable";

interface AddHistoryDetailsProps {
  trigger: React.ReactNode;
}

const HistoryData: React.FC<AddHistoryDetailsProps> = ({ trigger }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [dataLength, setDataLength] = useState<number>(0);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const datavalues = [
    { name: "Action", previousValue: "", latestValue: "Added" },
    { name: "Created by", previousValue: "", latestValue: "Adam Williams" },
    { name: "Status", previousValue: "", latestValue: "Active" },
    {
      name: "Workspace Name",
      previousValue: "",
      latestValue: "testing_testing",
    },
    {
      name: "Created at",
      previousValue: "",
      latestValue: "July 23rd, 2024 2:05:33 PM",
    },
    { name: "Description", previousValue: "", latestValue: "test" },
  ];
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent
          className={`fixed bg-white rounded-md shadow-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] transition-all duration-300 ${
            isExpanded ? "w-full h-full max-w-full max-h-full" : ""
          }`}
        >
          {/* <div className="flex flex-col h-full"> */}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              <div className="flex items-center">
                {/* <button
                  type="button"
                  onClick={toggleExpand}
                  className="hover:text-gray-200 transition-transform duration-300 pr-2"
                >
                  {isExpanded ? (
                    <FaCompress
                      className="text-black transform hover:scale-110"
                      size={18}
                    />
                  ) : (
                    <FaExpand
                      className="text-black transform hover:scale-110"
                      size={18}
                    />
                  )}
                </button> */}
                History Details
                {/* <span className="bg-[#1D62B450] ml-2 rounded-md cursor-default px-1">
                  {dataLength}
                </span> */}
              </div>
              <hr className="my-3" />
            </DialogTitle>
            <div className="card bg-gray-100 p-3 rounded-md shadow-md">
              <div className="flex items-center justify-between p-2">
                <p className="text-left flex-1 text-sm">Field Name</p>
                <p className="text-left flex-1 text-sm">Previous Data Value</p>
                <p className="text-left flex-1 text-sm">Latest Data Value</p>
              </div>
            </div>
            {datavalues.map((item, index) => (
              <HistoryDataCard
                key={index}
                fieldName={item.name}
                prevValue={item.previousValue}
                latestValue={item.latestValue}
              />
            ))}
          </DialogHeader>

          {/* <DialogDescription className="text-sm text-gray-500"> */}
          {/* <div className="w-full h-full overflow-auto"> */}

          {/* </div> */}

          {/* </DialogDescription> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HistoryData;
