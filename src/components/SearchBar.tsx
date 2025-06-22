import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/roomingLists/roomingListsSlice";
import { RootState, AppDispatch } from "../app/store";
import SearchSVG from "../assets/Frame 4193.svg";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.roomingLists.search);

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
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
