"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import DateTimePickerForm from "@/components/custom/dateTimePicker/DateTimePickerForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LogCallDialogProps {
  trigger: React.ReactNode;
  data?: {
    callName: string;
    notes: string;
    startDate: string;
    endDate: string;
    callTo: string;
    callBy: string;
  };
}
const LogCallDialog: React.FC<LogCallDialogProps> = ({ trigger }) => {
  const [date, setDate] = useState<Date>();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const SelectCallTo = [
    {
      id: 1,
      name: "Alexandra Cox",
      value: "Alexandra Cox",
    },
    {
      id: 2,
      name: "Brian Garza",
      value: "Brian Garza",
    },
    {
      id: 3,
      name: "Adam Schultz",
      value: "Adam Schultz",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[650px]">
        <DialogTitle className="text-lg font-medium">Log A Call</DialogTitle>
        <hr className="my-2" />
        <DialogDescription className="mt-1 mb-4 text-sm text-gray-500">
          <form className="space-y-4">
            <div className="w-full">
              <label
                htmlFor="callName"
                className="block text-sm font-medium text-black mb-1"
              >
                Name the Call
              </label>
              <Input
                type="text"
                id="callName"
                placeholder="Enter name here"
                name="callName"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-black mb-1"
              >
                Notes
              </label>

              <Textarea
                id="notes"
                placeholder="Enter message here"
                name="notes"
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="reminder"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Start Date and Time
                </label>
                <DateTimePickerForm />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-black mb-1"
                >
                  End Date and Time
                  </label>
                <DateTimePickerForm />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="callTo"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Call to
                </label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select person or enter name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Fruits</SelectLabel> */}
                      {SelectCallTo.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          <div className="flex gap-2 items-center">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src={`/users/${item.id}.jpg`}
                                alt="@shadcn"
                              />
                              <AvatarFallback>{item.name}</AvatarFallback>
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
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="callBy"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Call by
                </label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select person or enter name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SelectCallTo.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                           <div className="flex gap-2 items-center">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src={`/users/${item.id}.jpg`}
                                alt="@shadcn"
                              />
                              <AvatarFallback>{item.name}</AvatarFallback>
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

export default LogCallDialog;
