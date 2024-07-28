import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CommonTable } from "@/components/data-table";
import axios from "axios";
import {
  HistoryTable,
  columns,
} from "../content/comps/Table/HistoryColumnTable";
interface AddHistoryDialogProps {
  trigger: React.ReactNode;
}

const History: React.FC<AddHistoryDialogProps> = ({ trigger }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from the URL
    axios
      .get("https://66a6351623b29e17a1a2043e.mockapi.io/api/oject/object")
      .then((response) => {
        // Set the data to state and log it
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[1200px] max-h-[800px]">
          <DialogTitle className="text-lg font-semibold">
            Version History
          </DialogTitle>
          <hr className="my-1" />
          {/* <DialogDescription className="p-0 text-sm text-gray-500"> */}
          <div className="w-full h-[670px] overflow-auto">
            <CommonTable columns={columns} data={data} />
          </div>
          {/* </DialogDescription> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default History;
