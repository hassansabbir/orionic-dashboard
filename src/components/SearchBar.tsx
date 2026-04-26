import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <CiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
        placeholder="Search anything..."
      />
    </div>
  );
};

export default SearchBar;
