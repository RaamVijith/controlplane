import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
  return (
    <div className="cursor-default flex border-2 rounded-md border-[#B2B2B2] items-center justify-center px-2 py-1 min-w-[200px] w-[370px] max-w-full">
      <LuSearch size={25} color="#B2B2B2" />
      <input
        className="px-2 w-full outline-none text-gray-800 caret-gray-500 text-sm"
        placeholder="Search"
        type="text"
      />
      <div className="flex gap-2 text-gray-500 font-[600] text-[14px]">
        <div className="bg-gray-200 w-6 text-center">⌘</div>
        <div className="bg-gray-200 w-6 text-center">F</div>
      </div>
    </div>
  );
};

export default SearchBar;
