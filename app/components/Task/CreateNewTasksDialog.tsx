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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import DateTimePickerForm from "@/components/custom/dateTimePicker/DateTimePickerForm";
import { Textarea } from "@/components/ui/textarea";

interface CreateNewTasksDialogProps {
  trigger: React.ReactNode;
  data?: {
    taskName: string;
    taskDescription: string;
    assignTask: string;
    taskPriority: string;
    setReminder: string;
    dueDate: string;
  };
}
const CreateNewTasksDialog: React.FC<CreateNewTasksDialogProps> = ({
  trigger,
}) => {
  const [date, setDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const SelectAssignTaskTo = [
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
  const SelectTaskPriority = [
    {
      name: "most important",
      value: "most important",
    },
    {
      name: "important",
      value: "important",
    },
    {
      name: "not important",
      value: "not important",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[650px]">
        <DialogTitle className="text-lg font-medium">
          Create New Task
        </DialogTitle>
        <hr className="my-2" />
        <DialogDescription className="mt-1 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-full w-[50px] h-[50px] bg-gray-200 flex items-center justify-center">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="Uploaded"
                  className="rounded-full w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              ) : (
                <IoPerson className="text-xl" />
              )}
            </div>
            <button
              className="flex items-center bg-gray-200 text-black px-4 py-2"
              onClick={handleButtonClick}
            >
              <MdOutlineFileUpload />
              &nbsp; Uploads Image
            </button>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <form className="space-y-4">
            <div className="w-full">
              <label
                htmlFor="taskName"
                className="block text-sm font-medium text-black mb-1"
              >
                Task Name
              </label>
              <Input
                type="text"
                id="taskName"
                placeholder="Enter task name here"
                name="taskName"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="taskDescription"
                className="block text-sm font-medium text-black mb-1"
              >
                Task Description
              </label>
              <Textarea
                id="taskDescription"
                placeholder="Enter task description here"
                name="taskDescription"
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="assignTask"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Assign Task to
                </label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select person or enter name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Fruits</SelectLabel> */}
                      {SelectAssignTaskTo.map((item, index) => (
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
                  htmlFor="taskPriority"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Task Priority
                </label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SelectTaskPriority.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="reminder"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Reminder
                </label>
                <DateTimePickerForm />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Due Date
                </label>
                <DateTimePickerForm />
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

export default CreateNewTasksDialog;
