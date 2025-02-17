import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCheck } from "react-icons/md";
import { IoChevronDownSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
const ContactProperty = () => {
  const options = [
    // box1
    { label: "New", value: "New" },
    { label: "Existing", value: "Existing" },
    // box2
    { label: "Contacted", value: "Contacted" },
    { label: "Not Contacted", value: "Not Contacted" },
    // box3
    { label: "Qualified", value: "Qualified" },
    { label: "Not Qualified", value: "Not Qualified" },
    // box4
    { label: "Negotiated", value: "Negotiated" },
    { label: "Not Started", value: "Not Started" },
    // box5
    { label: "Closed", value: "Closed" },
    { label: "In review", value: "In review" },
    { label: "Hold", value: "Hold" },
    { label: "Delete", value: "Delete" },
  ];

  // State for managing dropdown visibility and selected option
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown1SelectedOption, setDropdown1SelectedOption] = useState("");
  const dropdown1Ref = useRef<HTMLDivElement>(null);

  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [dropdown2SelectedOption, setDropdown2SelectedOption] = useState("");
  const dropdown2Ref = useRef<HTMLDivElement>(null);

  const [dropdown3Open, setDropdown3Open] = useState(false);
  const [dropdown3SelectedOption, setDropdown3SelectedOption] = useState("");
  const dropdown3Ref = useRef<HTMLDivElement>(null);

  const [dropdown4Open, setDropdown4Open] = useState(false);
  const [dropdown4SelectedOption, setDropdown4SelectedOption] = useState("");
  const dropdown4Ref = useRef<HTMLDivElement>(null);

  const [dropdown5Open, setDropdown5Open] = useState(false);
  const [dropdown5SelectedOption, setDropdown5SelectedOption] = useState("");
  const dropdown5Ref = useRef<HTMLDivElement>(null);
  // Toggle dropdown visibility for each box
  const toggleDropdown1 = () => setDropdown1Open(!dropdown1Open);
  const toggleDropdown2 = () => setDropdown2Open(!dropdown2Open);
  const toggleDropdown3 = () => setDropdown3Open(!dropdown3Open);
  const toggleDropdown4 = () => setDropdown4Open(!dropdown4Open);
  const toggleDropdown5 = () => setDropdown5Open(!dropdown5Open);

  // Handle option selection for each box
  const handleSelectOption1 = (option: string) => {
    setDropdown1SelectedOption(option);
    setDropdown1Open(false);
  };

  const handleSelectOption2 = (option: string) => {
    setDropdown2SelectedOption(option);
    setDropdown2Open(false);
  };

  const handleSelectOption3 = (option: string) => {
    setDropdown3SelectedOption(option);
    setDropdown3Open(false);
  };

  const handleSelectOption4 = (option: string) => {
    setDropdown4SelectedOption(option);
    setDropdown4Open(false);
  };

  const handleSelectOption5 = (option: string) => {
    setDropdown5SelectedOption(option);
    setDropdown5Open(false);
  };

  // Handle clicks outside of dropdown to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdown1Ref.current &&
        !dropdown1Ref.current.contains(event.target as Node)
      ) {
        setDropdown1Open(false);
      }
      if (
        dropdown2Ref.current &&
        !dropdown2Ref.current.contains(event.target as Node)
      ) {
        setDropdown2Open(false);
      }
      if (
        dropdown3Ref.current &&
        !dropdown3Ref.current.contains(event.target as Node)
      ) {
        setDropdown3Open(false);
      }
      if (
        dropdown4Ref.current &&
        !dropdown4Ref.current.contains(event.target as Node)
      ) {
        setDropdown4Open(false);
      }
      if (
        dropdown5Ref.current &&
        !dropdown5Ref.current.contains(event.target as Node)
      ) {
        setDropdown5Open(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderDropdown = (
    open: boolean,
    options: Array<{ label: string; value: string }>,
    handleSelectOption: (option: string) => void
  ) => (
    <div className="absolute z-10 mt-1 w-[135px] h-auto bg-white shadow-lg rounded-md">
      {options.map((option) => (
        <div
          key={option.value}
          className="py-2 px-3 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSelectOption(option.label)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:w-full sm:w-full lg:grid-cols-5">
      {/* Box 1 */}
      <div ref={dropdown1Ref} className="relative flex-grow">
        <div
          className={`flex p-4 border-l border-t border-b items-center justify-center gap-2 w-full text-sm cursor-pointer ${
            dropdown1SelectedOption === "Existing"
              ? "bg-[#ffccd5] text-[#e03f44] border-[#e03f44]"
              : "bg-[#1D62B440] text-[#1D62B4] border-[#1D62B4]"
          }`}
          onClick={toggleDropdown1}
        >
          <MdOutlineCheck />
          <div>{dropdown1SelectedOption || "New"}</div>
          <IoChevronDownSharp />
        </div>
        {dropdown1Open && (
          <div className="absolute z-10 mt-1 w-[135px] h-auto bg-white shadow-lg rounded-md">
            {options.slice(0, 2).map((option) => (
              <div
                key={option.value}
                className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption1(option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Box 2 */}
      <div ref={dropdown2Ref} className="relative flex-grow">
        {/* <div
          className="flex p-4 border border-[#1D62B4] items-center justify-center gap-2 w-full bg-[#1D62B440] text-[#1D62B4]"
          onClick={toggleDropdown2}
        >
          <MdOutlineCheck />
          <div>{dropdown2SelectedOption || "Contacted"}</div>
          <IoChevronDownSharp />
        </div> */}
        <div
          className={`flex p-4 border border-[#1D62B4] items-center justify-center gap-2 w-full text-sm cursor-pointer ${
            dropdown2SelectedOption === "Not Contacted"
              ? "bg-[#ffccd5] text-[#e03f44] border-[#e03f44]"
              : "bg-[#1D62B440] text-[#1D62B4] border-[#1D62B4]"
          }`}
          onClick={toggleDropdown2}
        >
          {dropdown2SelectedOption === "Not Contacted" ? (
            <FaXmark />
          ) : (
            <MdOutlineCheck />
          )}
          <div>{dropdown2SelectedOption || "Contacted"}</div>
          <IoChevronDownSharp />
        </div>
        {dropdown2Open && (
          <div className="absolute z-10 mt-1  w-[135px] h-auto bg-white shadow-lg rounded-md">
            {options.slice(2, 4).map((option) => (
              <div
                key={option.value}
                className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption2(option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Box 3 */}
      <div ref={dropdown3Ref} className="relative flex-grow">
        {/* <div
          className="flex p-4 border border-[#1D62B4] items-center justify-center gap-2 w-full bg-[#1D62B440] text-[#1D62B4]"
          onClick={toggleDropdown3}
        >
          <MdOutlineCheck />
          <div>{dropdown3SelectedOption || "Qualified"}</div>
          <IoChevronDownSharp />
        </div> */}
        <div
          className={`flex p-4 border-t border-b border-[#1D62B4] items-center justify-center gap-2 w-full text-sm cursor-pointer ${
            dropdown3SelectedOption === "Not Qualified"
              ? "bg-[#ffccd5] text-[#e03f44] border-[#e03f44]"
              : "bg-[#1D62B440] text-[#1D62B4] border-[#1D62B4]"
          }`}
          onClick={toggleDropdown3}
        >
          {dropdown3SelectedOption === "Not Qualified" ? (
            <FaXmark />
          ) : (
            <MdOutlineCheck />
          )}
          <div>{dropdown3SelectedOption || "Qualified"}</div>
          <IoChevronDownSharp />
        </div>
        {dropdown3Open && (
          <div className="absolute z-10 mt-1  w-[135px] h-auto bg-white shadow-lg rounded-md">
            {options.slice(4, 6).map((option) => (
              <div
                key={option.value}
                className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption3(option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Box 4 */}
      <div ref={dropdown4Ref} className="relative flex-grow">
        {/* <div
          className="flex p-4 border border-[#1D62B4] items-center justify-center gap-2 w-full bg-[#1D62B440] text-[#1D62B4]"
          onClick={toggleDropdown4}
        >
          <MdOutlineCheck />
          <div>{dropdown4SelectedOption || "Negotiation"}</div>
          <IoChevronDownSharp />
        </div> */}
        <div
          className={`flex p-4 border border-[#1D62B4] items-center justify-center gap-2 w-full text-sm cursor-pointer ${
            dropdown4SelectedOption === "Not Started"
              ? "bg-[#ffccd5] text-[#e03f44] border-[#e03f44]"
              : "bg-[#1D62B440] text-[#1D62B4] border-[#1D62B4]"
          }`}
          onClick={toggleDropdown4}
        >
          {dropdown4SelectedOption === "Not Started" ? (
            <FaXmark />
          ) : (
            <MdOutlineCheck />
          )}
          <div>{dropdown4SelectedOption || "Negotiation"}</div>
          <IoChevronDownSharp />
        </div>
        {dropdown4Open && (
          <div className="absolute z-10 mt-1  w-[135px] h-auto bg-white shadow-lg rounded-md">
            {options.slice(6, 8).map((option) => (
              <div
                key={option.value}
                className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption4(option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Box 5 */}
      <div ref={dropdown5Ref} className="relative flex-grow">
        <div
          className="flex p-4 items-center border-t border-b border-r border-[#1D62B4] justify-center gap-2 w-full bg-[#1D62B440] text-[#1D62B4] text-sm cursor-pointer"
          onClick={toggleDropdown5}
        >
          <MdOutlineCheck />
          <div>{dropdown5SelectedOption || "Closed"}</div>
          <IoChevronDownSharp />
        </div>
        {dropdown5Open && (
          <div className="absolute z-10 mt-1  w-[135px] h-auto bg-white shadow-lg rounded-md">
            {options.slice(8, 12).map((option) => (
              <div
                key={option.value}
                className="py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectOption5(option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactProperty;
