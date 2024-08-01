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
// import FlagSelector from "../../Selector/FlagSelector";
import { Country, State, City } from "country-state-city";
import Flag from "react-world-flags";
import { FaMapMarkerAlt } from "react-icons/fa";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { CiLocationOn } from "react-icons/ci";
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
  // country selector
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
      value: "customers",
      name: "Customers",
    },
  ];

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity("");
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

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
              <div className="w-1/2 md:w-1/2">
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
              <div className="w-1/2 md:w-1/2">
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
              <div className="w-1/2 md:w-1/2">
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
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
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
            </div>
            {/*  */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Country
                </label>

                <Select onValueChange={handleCountryChange}>
                  <SelectTrigger className="w-full relative">
                    {selectedCountry && (
                      <Flag
                        code={selectedCountry}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
                      />
                    )}
                    <span className={`ml-8 ${!selectedCountry && "pl-3"}`}>
                      {selectedCountry
                        ? countries.find(
                            (country) => country.isoCode === selectedCountry
                          )?.name
                        : "Select Country"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Country</SelectLabel>
                      {countries.map((country) => (
                        <SelectItem
                          key={country.isoCode}
                          value={country.isoCode}
                        >
                          <div className="flex items-center">
                            <Flag
                              code={country.isoCode}
                              className="w-5 h-5 mr-2"
                            />
                            {country.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-black mb-1"
                >
                  State
                </label>
                <Select
                  onValueChange={handleStateChange}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger className="w-full relative">
                    <CiLocationOn className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <span className={`ml-8 ${!selectedState && "pl-3"}`}>
                      {selectedState
                        ? states.find(
                            (state) => state.isoCode === selectedState
                          )?.name
                        : selectedCountry
                        ? "Select State"
                        : "Select a Country First"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select State</SelectLabel>
                      {states.map((state) => (
                        <SelectItem key={state.isoCode} value={state.isoCode}>
                          <div className="flex items-center">{state.name}</div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-black mb-1"
              >
                City
              </label>
              <Select
                onValueChange={handleCityChange}
                disabled={!selectedState}
              >
                <SelectTrigger className="w-full relative">
                  <CiLocationOn className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <span className={`ml-8 ${!selectedCity && "pl-3"}`}>
                    {selectedCity
                      ? cities.find((city) => city.name === selectedCity)?.name
                      : selectedState
                      ? "Select City"
                      : "Select a State First"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select City</SelectLabel>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        <div className="flex items-center">{city.name}</div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/*  */}
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
