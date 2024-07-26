import React from "react";
import AddContactDialog from "../UserInfoPanel/AddContact";
import { FillButton } from "@/app/components/libs/buttons";
import { IoAdd } from "react-icons/io5";
interface AddDataProps {
  buttonText: string;
}
const AddData: React.FC<AddDataProps> = ({ buttonText }) => {
  return (
    <div className="h-[50vh] text-center flex items-center justify-center w-full">
      <div>
        <h2 className="text-[25px]">
          <strong>Expand Your Network!</strong>
        </h2>
        <p className="text-sm text-gray-500">
          It looks like your contact list is off to a quiet start.
          <br />
          Add your contacts now to stay connected and stay <br />
          organized.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <AddContactDialog
            mode="add"
            trigger={
              <FillButton className="w-[10rem]">
                <IoAdd />
                <div className="text-sm">{buttonText}</div>
              </FillButton>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddData;
