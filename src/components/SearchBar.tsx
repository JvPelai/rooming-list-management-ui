import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/roomingLists/roomingListsSlice";
import { RootState, AppDispatch } from "../app/store";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.roomingLists.search);

  return (
    <input
      type="text"
      placeholder="Search"
      className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm"
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
    />
  );
};

export default SearchBar;
