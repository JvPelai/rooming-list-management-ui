import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { setRoomingLists } from "../features/roomingLists/roomingListsSlice";
import type { RoomingList } from "../features/roomingLists/roomingListsSlice";
import _ from "lodash";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

const EventsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { all, search, filters, sort } = useSelector(
    (state: RootState) => state.roomingLists
  );

  console.log(all, search, filters, sort);
  useEffect(() => {
    const mockData: RoomingList[] = [
      {
        id: 1,
        eventId: 1,
        eventName: "Rolling Loud",
        hotelId: 101,
        rfpName: "ACL-2025",
        cutOffDate: "2025-09-30",
        status: "completed",
        agreement_type: "leisure",
        bookingsCount: 5,
      },
      {
        id: 2,
        eventId: 1,
        eventName: "Rolling Loud",
        hotelId: 101,
        rfpName: "ACL-2025",
        cutOffDate: "2025-09-30",
        status: "received",
        agreement_type: "staff",
        bookingsCount: 5,
      },
      {
        id: 3,
        eventId: 1,
        eventName: "Rolling Loud",
        hotelId: 101,
        rfpName: "ACL-2024",
        cutOffDate: "2024-09-30",
        status: "archived",
        agreement_type: "leisure",
        bookingsCount: 5,
      },
      {
        id: 4,
        eventId: 2,
        eventName: "Ultra Miami",
        hotelId: 101,
        rfpName: "RLM-2025",
        cutOffDate: "2025-09-30",
        status: "completed",
        agreement_type: "leisure",
        bookingsCount: 5,
      },
      {
        id: 5,
        eventId: 2,
        eventName: "Ultra Miami",
        hotelId: 101,
        rfpName: "RLM-2025",
        cutOffDate: "2025-10-15",
        status: "completed",
        agreement_type: "staff",
        bookingsCount: 5,
      },
      {
        id: 6,
        eventId: 2,
        eventName: "Ultra Miami",
        hotelId: 101,
        rfpName: "RLM-2025",
        cutOffDate: "2025-10-15",
        status: "Confirmed",
        agreement_type: "leisure",
        bookingsCount: 5,
      },
      {
        id: 7,
        eventId: 2,
        eventName: "Ultra Miami",
        hotelId: 101,
        rfpName: "RLM-2026",
        cutOffDate: "2026-10-25",
        status: "received",
        agreement_type: "leisure",
        bookingsCount: 5,
      },
      {
        id: 8,
        eventId: 2,
        eventName: "Ultra Miami",
        hotelId: 101,
        rfpName: "RLM-2026",
        cutOffDate: "2026-10-25",
        status: "received",
        agreement_type: "staff",
        bookingsCount: 5,
      },
    ];
    dispatch(setRoomingLists(mockData));
  }, [dispatch]);

  const filteredSortedLists = useMemo(() => {
    const filtered = all.filter(
      (item) =>
        filters.includes(item.status) &&
        (item.eventName.toLowerCase().includes(search.toLowerCase()) ||
          item.rfpName.toLowerCase().includes(search.toLowerCase()) ||
          item.agreement_type.toLowerCase().includes(search.toLowerCase()))
    );

    const sorted = [...filtered].sort((a, b) => {
      const aDate = new Date(a.cutOffDate).getTime();
      const bDate = new Date(b.cutOffDate).getTime();
      return sort === "asc" ? aDate - bDate : bDate - aDate;
    });

    return _.groupBy(sorted, "eventName");
  }, [all, search, filters, sort]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Rooming List Management: Events
      </h1>

      <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
        <SearchBar />
        <FilterPanel />
      </div>

      {Object.entries(filteredSortedLists).map(([eventName, lists]) => (
        <div key={eventName} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{eventName}</h2>
          <div className="overflow-x-auto flex gap-4">
            {lists.map((list) => (
              <div
                key={list.id}
                className="min-w-[300px] bg-white rounded-xl shadow p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="font-bold">[{list.rfpName}]</p>
                  <p>
                    Agreement:{" "}
                    <span className="font-semibold">{list.agreement_type}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(list.cutOffDate).toLocaleDateString()} (Cut-Off)
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="bg-indigo-600 text-white text-sm px-3 py-1 rounded"
                    onClick={() => console.log("Bookings:", list)}
                  >
                    View Bookings ({list.bookingsCount})
                  </button>
                  <button
                    title="Show Agreement as PDF"
                    className="text-indigo-600 border border-indigo-600 p-1 rounded"
                  >
                    📄
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsPage;
