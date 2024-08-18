import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";

interface CreateNewChatProps {
  trigger: React.ReactNode;
  data?: {
    subject: string;
    message: string;
  };
}
const CreateNewChat: React.FC<CreateNewChatProps> = ({ trigger }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[650px]">
        <DialogTitle className="text-lg font-medium">
          Create New Chat
        </DialogTitle>
        <hr className="my-2" />
        <DialogDescription className="mt-1 mb-4 text-sm text-gray-500">
          <form className="space-y-4">
            <div className="w-full">
              {/* SearchBar */}
              <div className="relative ">
                {/* Search Icon */}
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {/* Input Field */}
                <Input
                  placeholder="Search name hear"
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-black mb-1"
              >
                Subject
              </label>
              <Input
                type="text"
                id="subject"
                placeholder="Enter message here"
                name="subject"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="chatMessage"
                className="block text-sm font-medium text-black mb-1"
              >
                Chat Message
              </label>

              <Textarea
                id="chatMessage"
                placeholder="Enter message here"
                name="chatMessage"
              />
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

export default CreateNewChat;
