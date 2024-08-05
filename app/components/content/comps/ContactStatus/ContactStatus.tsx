import React from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import AddContactDialog from "../UserInfoPanel/AddContact";
import { FillButton } from "@/app/components/libs/buttons";
import { IoAdd } from "react-icons/io5";

const VerticalStepper = () => {
  const styles = {
    LineSeparator: () => ({ height: "1rem", backgroundColor: "#3f76ff" }),
    ActiveNode: () => ({
      backgroundColor: "#3f76ff",
    }),
    CompletedNode: () => ({
      backgroundColor: "#3f76ff",
    }),
  };
  const steps = [
    {
      stepLabel: "Contact in our database",
      completed: true,
    },
    {
      stepLabel: "Converted into Lead",
      completed: true,
    },
    {
      stepLabel: "Contacted as Opportunity",
      completed: false,
    },
    {
      stepLabel: "Negotiating",
      completed: false,
    },
    {
      stepLabel: "Deal Closed",
      completed: false,
    },
    {
      stepLabel: "Customer",
      completed: false,
    },
  ];
  return (
    <div className="p-3">
      <div className=" w-[50%] ">
        <AddContactDialog
          mode="add"
          trigger={
            <FillButton>
              <IoAdd />
              <div className="text-sm">Add Contact</div>
            </FillButton>
          }
        />
      </div>

      <Stepper
        styles={styles}
        orientation="vertical"
        steps={steps}
        currentStepIndex={1}
      />
    </div>
  );
};

export default VerticalStepper;
