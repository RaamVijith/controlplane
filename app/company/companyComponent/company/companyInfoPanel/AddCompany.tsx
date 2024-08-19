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
import { CiLocationOn } from "react-icons/ci";
import { PiBuildingOfficeBold } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import Flag from "react-world-flags";


import TimezoneSelect, { type ITimezone } from "react-timezone-select"


interface AddContactDialogProps {
  trigger: React.ReactNode;
  mode: "add" | "edit";
  // change 
  contactData?: {
    companyName: string;
    industryType: string;
    region: string;
    contact: string;
    identification: string;
    email: string;
    company: string;
    resume: string;
    country: string;
    mode: string;
  };
}
const CreateCompanyDialog: React.FC<AddContactDialogProps> = ({
  trigger,
  mode,
  contactData,
}) => {
  const [date, setDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");

  // country selector
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // TimeZone Select
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  )

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

  const IndustrySelection = [
    {
      value: "type1",
      name: "type1",
    },
    {
      value: "type2",
      name: "type2",
    },
    {
      value: "type3",
      name: "type3",
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
    setSelectedTimezone("");

  };

  const handleTimezoneChange = (value: string) => {
    setSelectedTimezone(value);
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

      <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[650px] overflow-y-scroll max-h-screen">
        <DialogTitle className="text-lg font-medium">
          {mode === "add" ? "Create New Company" : "Update Company Details"}
        </DialogTitle>
        <hr className="my-2" />
        <DialogDescription className="mt-2 mb-4 text-sm text-gray-500">
          <div className="flex justify-between items-center">
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
            <div className="flex flex-row items-center gap-2">
              <div className="flex gap-4 items-baseline ">
                <PiBuildingOfficeBold size={36} className="text-gray-900 cursor-pointer mb-1"/>
                </div>

                <Switch />

              
            </div>
          </div>

          <form className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Company Name
                </label>
                <Input
                  type="text"
                  id="companyName"
                  placeholder="Enter company name"
                  name="companyName"
                  defaultValue={contactData?.companyName || ""}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="industryType"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Industry Type
                </label>

                <Select defaultValue={contactData?.industryType || ""}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Industry Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Fruits</SelectLabel> */}
                      {IndustrySelection.map((item, index) => (
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
                  htmlFor="region"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Region
                </label>
                <Input
                  type="text"
                  id="region"
                  placeholder="Enter region"
                  name="region"
                  defaultValue={contactData?.region || ""}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Priliminary Contact
                </label>
                <Input
                  type="text"
                  id="contact"
                  placeholder="Enter contact details"
                  name="contact"
                  defaultValue={contactData?.contact || ""}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter email "
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
                  htmlFor="mobile"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Mobile
                </label>
                <PhoneInput
                  country={"us"}
                  value={mobile}
                  onChange={(mobile) => setMobile(mobile)}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid #C7C8CC",
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="Identification"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Unique Number
                </label>
                <Input
                  type="text"
                  id="Identification"
                  placeholder="Enter details here"
                  name="identification"
                  defaultValue={contactData?.identification || ""}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Revenue
                </label>
                <Input
                  type="text"
                  id="resume"
                  placeholder="resume"
                  name="resume"
                  defaultValue={contactData?.resume || ""}
                />
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

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
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
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-black mb-1"
                >
                  TimeZone
                </label>
                <Select
                  onValueChange={handleTimezoneChange}
                >
                  <SelectTrigger className="w-full relative">
                    <div> Select Timezone</div>
                  
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select TimeZone</SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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

export default CreateCompanyDialog;
