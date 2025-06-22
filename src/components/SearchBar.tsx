import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/roomingLists/roomingListsSlice";
import { AppDispatch } from "../app/store";
import SearchSVG from "../assets/Frame 4193.svg";
import { debounce } from "lodash";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState("");

  const debouncedDispatch = useCallback(
    debounce((value: string) => {
      dispatch(setSearch(value));
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedDispatch(value);
  };
  return (
    <div className="relative w-full md:w-1/3">
      <img
        src={SearchSVG}
        alt="search"
        className="absolute left-1 top-1/2 transform -translate-y-1/2 w-7 h-7 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-10 pr-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
