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
import { IoPerson } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiLocationOn } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FlagSelector from "../../Selector/FlagSelector";

interface AddContactDialogProps {
  trigger: React.ReactNode;
  mode: "add" | "edit";
  contactData?: {
    firstName: string;
    lastName: string;
    category: string;
    email: string;
    company: string;
    birthDate: Date;
    gender: string;
    country: string;
    occupation: string;
    mode: string;
  };
}
const AddContactDialog: React.FC<AddContactDialogProps> = ({
  trigger,
  mode,
  contactData,
}) => {
  const [date, setDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");

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

  const Selection = [
    {
      value: "employee",
      name: "Employee",
    },
    {
      value: "partners",
      name: "Partners",
    },
    {
      value: "partners",
      name: "Partners",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {/* <Dialog.Portal> */}
      {/* <Dialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" /> */}
      <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[650px]">
        <DialogTitle className="text-lg font-medium">
          {mode === "add" ? "Create New Contact" : "Update Contact"}
        </DialogTitle>
        <hr className="my-2" />
        <DialogDescription className="mt-2 mb-4 text-sm text-gray-500">
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
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  First Name
                </label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name here"
                  name="firstName"
                  defaultValue={contactData?.firstName || ""}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Last Name
                </label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name here"
                  name="firstName"
                  defaultValue={contactData?.lastName || ""}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="contactCategories"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Contact Categories
                </label>

                <Select defaultValue={contactData?.category || ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Fruits</SelectLabel> */}
                      {Selection.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Email
                </label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter email here"
                  name="email"
                  defaultValue={contactData?.email || ""}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Phone
                </label>
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid #C7C8CC",
                  }}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Company
                </label>
                <Input
                  type="text"
                  id="company"
                  placeholder="Enter company name here"
                  name="company"
                  defaultValue={contactData?.company || ""}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Birth Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Occupation
                </label>
                <Input
                  type="text"
                  id="occupation"
                  placeholder="Enter occupation here"
                  name="occupation"
                  defaultValue={contactData?.occupation || ""}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-black mb-1"
              >
                Gender
              </label>
              <RadioGroup
                defaultValue={contactData?.gender || "male"}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="r1" />
                  <label htmlFor="r1">Male</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="r2" />
                  <label htmlFor="r2">Female</label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Country
                </label>
                <FlagSelector />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-black mb-1"
                >
                  City
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <CiLocationOn className="text-gray-500" />
                  </span>
                  <Input
                    type="text"
                    id="city"
                    placeholder="Enter City"
                    name="city"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-black mb-1"
              >
                Address
              </label>
              <Input
                type="text"
                id="address"
                placeholder="Enter address here"
                name="address"
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
            {mode === "add" ? "Save" : "Update"}
          </button>
        </div>
      </DialogContent>
      {/* </Dialog.Portal> */}
    </Dialog>
  );
};

export default AddContactDialog;
