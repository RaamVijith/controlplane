import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { TiVendorMicrosoft } from "react-icons/ti";
interface ConvertContactProps {
  trigger: React.ReactNode;
}
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AddContactDialog from "./AddContact";
import { IoAdd } from "react-icons/io5";
import { Button } from "@/components/ui/button";
const ConvertContact: React.FC<ConvertContactProps> = ({ trigger }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false);

  return (
    <>
      {/* <Dialog open={isConvertDialogOpen} onOpenChange={setIsConvertDialogOpen}> */}
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="fixed bg-white py-2 px-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[650px]">
          <DialogTitle className="text-lg font-medium">
            Convert Contact
          </DialogTitle>
          <hr className="my-1" />
          <DialogDescription className="mt-2 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="text-[15px] text-gray-700">Jenny Willson</div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <TiVendorMicrosoft /> <p>Microsoft</p>
                </div>
              </div>
            </div>

            {/* <div className="m-1 grid gap-3 grid-cols-1 md:grid-cols-3 items-center"> */}
            <div className="flex flex-col md:flex-row md:space-x-4 w-full">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="convertto"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Convert To
                </label>
                <Select onValueChange={(value) => setSelectedCategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="contacts">Contacts</SelectItem>
                      <SelectItem value="leads">Leads</SelectItem>
                      <SelectItem value="opportunity">Opportunity</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center items-center md:mb-4">OR</div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="newContact"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Create new Contact
                </label>
                <Input
                  type="text"
                  id="newContact"
                  placeholder="Enter name here"
                  name="newContact"
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            {/* </div> */}
          </DialogDescription>

          <div className="mt-4 flex flex-col md:flex-row justify-end md:space-x-2">
            <DialogClose asChild>
              <Button
                variant="secondary"
                className="px-4 py-2 bg-gray-200 text-black rounded-md w-full md:w-1/2"
              >
                Cancel
              </Button>
            </DialogClose>

            {selectedCategory ? (
              <Button className="px-4 py-2 bg-black text-white rounded-md w-full md:w-1/2">
                Save Changes
              </Button>
            ) : (
              <AddContactDialog
                mode="add"
                trigger={
                  <Button className="px-4 py-2 bg-black text-white rounded-md w-full md:w-1/2">
                    Next
                  </Button>
                }
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConvertContact;
