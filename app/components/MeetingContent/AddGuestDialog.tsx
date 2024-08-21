import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { FaRegUser } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GuestData = [
  {
    id: 1,
    name: "Alexandra Cox",
  },
  {
    id: 2,
    name: "Brian Garza",
  },
  {
    id: 3,
    name: "Adam Schultz",
  },
  {
    id: 4,
    name: "Sonia Jacobs",
  },
  {
    id: 5,
    name: "Natalie Lopez",
  },
  {
    id: 6,
    name: "Renee Hudson",
  },

];

interface Guests {
  trigger: React.ReactNode;
}

const AddGuestDialog: React.FC<Guests> = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[450px]">
        <DialogTitle className="text-lg font-medium flex flex-row gap-1 items-center">
        <FaRegUser />
          Add Guest</DialogTitle>
        <hr className="my-1" />
        <DialogDescription className="mt-1 mb-4 text-sm text-gray-500">
          <form className="space-y-4">
            <div className="w-full">
              <Label
                htmlFor="subject"
                className="block text-sm font-medium text-black mb-1"
              >
                Select A Guest
              </Label>
              {/* <Input
              type="text"
              id="subject"
              placeholder="Enter message here"
              name="subject"
            /> */}
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a guest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>North America</SelectLabel> */}
                      {/* <SelectItem value="select all">
                      <div className="flex flex-row gap-3 items-center">

                      <Checkbox
                              className="border-gray-300"
                            //   checked={row.getIsSelected()}
                            //   onCheckedChange={(value) =>
                            //     row.toggleSelected(!!value)
                            //   }
                              aria-label="Select row"
                            />
                            <div className="capitalize text-sm">Sellect All </div>
                            </div>
                      </SelectItem> */}
                      {GuestData.map((item, index) => (
                        <SelectItem key={index} value={item.name}>
                          <div className="flex flex-row gap-3 items-center">
                            {/* <Checkbox
                              className="border-gray-300"
                            //   checked={row.getIsSelected()}
                            //   onCheckedChange={(value) =>
                            //     row.toggleSelected(!!value)
                            //   }
                              aria-label="Select row"
                            /> */}
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src={`/users/${item.id + 1}.jpg`}
                                alt="@shadcn"
                              />
                            </Avatar>
                            <div className="capitalize text-sm">
                              {item.name}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </DialogDescription>
        {/* Add your form or other content here */}
        <div className="mt-4 flex flex-col md:flex-row justify-end md:space-x-2">
          <DialogClose asChild>
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md w-full md:w-1/2">
              Cancel
            </button>
          </DialogClose>
          <button className="px-4 py-2 bg-black text-white rounded-md w-full md:w-1/2">
            Save
          </button>
        </div>
      </DialogContent>
      {/* </Dialog.Portal> */}
    </Dialog>
  );
};

export default AddGuestDialog;
