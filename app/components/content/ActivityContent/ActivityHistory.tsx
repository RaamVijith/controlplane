import React from "react";

import { FaHistory } from "react-icons/fa";
import UpcomingActivityCard from "../comps/DataCard/UpcomingCard";
import { upcomingData } from "@/public/data/users";
// import upcomingData
const ActivityHistory = () => {
  return (
    <div>
      <div className="flex items-center gap-2 text-blue-500 mt-4 mb-4">
        <FaHistory />
        <p className="font-semibold">Activity History</p>
      </div>

      <UpcomingActivityCard data={upcomingData} />
    </div>
  );
};

export default ActivityHistory;
