import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaSearch } from "react-icons/fa";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";

interface SideSheetCompanyProps {
  trigger: React.ReactNode;
  table: any;
}
const SideSheetCompany: React.FC<SideSheetCompanyProps> = ({
  trigger,
  table,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Columns</SheetTitle>
          <DropdownMenuSeparator />

          <SheetDescription>
            Search Columns
            {/* SearchBar */}
            <div className="relative max-w-sm mt-1 mb-3">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Filter by Name"
                value={searchInput}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </SheetDescription>
        </SheetHeader>
        <>
          <div className="rounded">
            <div className="px-1 ">
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: table.getIsAllColumnsVisible(),
                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                  }}
                />{" "}
                Select All 
              </label>
            </div>
            {/* {table.getAllLeafColumns().map((column: any) => {
              return (
                <div key={column.id} className="px-1 py-1  ">
                  <label>
                    <input
                      {...{
                        type: "checkbox",
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{" "}
                    {column.meta}
                  </label>
                </div>
              );
            })} */}
            {table.getAllColumns().map((column: any) => {
              return (
                <div key={column.id} className="px-1 py-1  ">
                  <label>
                    <input
                      {...{
                        type: "checkbox",
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{" "}

                    {(column.columnDef.meta as string) || column.id} 
                  </label>
                </div>
              );
            })}
          </div>
        </>

        <div className="flex flex-row justify-end w-full gap-2 items-end pt-1 ">
          <SheetClose asChild>
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md ">
              Cancel
            </button>
          </SheetClose>
          <button className="px-6 py-2 bg-black text-white rounded-md ">
            Save
          </button>{" "}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideSheetCompany;
