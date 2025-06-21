import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, Status } from "../features/roomingLists/roomingListsSlice";
import { RootState, AppDispatch } from "../app/store";
import FilterSvg from "../assets/Group.svg";

const FilterPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.roomingLists.filters);
  const [open, setOpen] = useState(false);

  const handleFilterChange = (status: Status) => {
    const newFilters = filters.includes(status)
      ? filters.filter((f) => f !== status)
      : [...filters, status];
    dispatch(setFilters(newFilters));
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => setOpen(!open)}
        >
          Filter
          <img className='ml-3 4' src={FilterSvg} alt="filter" />
        </button>
      </div>
      {open && (
        <div className="origin-top-right absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {(
              [
                "Active",
                "Closed",
                "Cancelled",
                "completed",
                "received",
                "archived",
                "confirmed",
                "Confirmed",
              ] as Status[]
            ).map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={filters.includes(status)}
                  onChange={() => handleFilterChange(status)}
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
