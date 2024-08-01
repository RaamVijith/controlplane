import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import Flag from "react-world-flags";
// import ReactFlagsSelect from "react-flags-select";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiLocationOn } from "react-icons/ci";
const FlagSelector: React.FC = () => {
  // const [selected, setSelected] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

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
    <div className="flex flex-col space-y-1">
      <label htmlFor="country" className="block text-sm font-medium text-black">
        Country
      </label>
      <div className="flex flex-wrap md:flex-nowrap space-y-2 md:space-y-0">
        <div className="w-full md:w-1/2 md:pr-2">
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
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    <div className="flex items-center">
                      <Flag code={country.isoCode} className="w-5 h-5 mr-2" />
                      {country.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/2 md:pl-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-black"
          >
            State
          </label>
          <Select onValueChange={handleStateChange} disabled={!selectedCountry}>
            <SelectTrigger className="w-full relative">
              <CiLocationOn className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <span className={`ml-8 ${!selectedState && "pl-3"}`}>
                {selectedState
                  ? states.find((state) => state.isoCode === selectedState)
                      ?.name
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

      <label htmlFor="city" className="block text-sm font-medium text-black">
        City
      </label>
      <div className="relative">
        <Select onValueChange={handleCityChange} disabled={!selectedState}>
          <SelectTrigger className="w-full relative">
            <FaMapMarkerAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
    </div>
  );
};

export default FlagSelector;
