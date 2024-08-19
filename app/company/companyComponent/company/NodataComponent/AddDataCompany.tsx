import React from "react";
// import AddContactDialog from "../../UserInfoPanel/AddContact";
import { FillButton } from "../../../../../components/libs/buttons";
import { IoAdd } from "react-icons/io5";
import CreateCompanyDialog from "../companyInfoPanel/AddCompany";
interface AddDataProps {
  buttonText: string;
}
const AddDataCompany: React.FC<AddDataProps> = ({ buttonText }) => {
  return (
    <div className="h-[50vh] text-center flex items-center justify-center w-full">
      <div>
        <h2 className="text-[25px]">
          <strong>Add Your Company Details Hear!</strong>
        </h2>
        <p className="text-sm text-gray-500">
          
          Add your company details now to stay connected and stay <br />
          organized.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <CreateCompanyDialog
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

export default AddDataCompany;
