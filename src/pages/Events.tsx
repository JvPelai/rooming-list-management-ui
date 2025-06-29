import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { setRoomingLists } from "../features/roomingLists/roomingListsSlice";
import type { RoomingList } from "../features/roomingLists/roomingListsSlice";
import _ from "lodash";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import RoomingCard from "../components/RoomingCard";
import BookingsModal from "../components/BookingsModal";
import { randomColor } from "../utils/randomColor";
import roomingListData from "../data/rooming-lists.json";
import bookingData from "../data/bookings.json";
import roomingListBookingData from "../data/rooming-list-bookings.json";
import { assignBookings } from "../utils/assignBookings";
import {
  deleteData,
  fetchData,
  insertData,
} from "../api/roomingListManagementAPI";

const EventsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { all, search, filters, sort } = useSelector(
    (state: RootState) => state.roomingLists
  );

  const [selectedRoomingList, setSelectedRoomingList] =
    useState<RoomingList | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const populateData = async () => {
    await deleteData();

    await insertData({ roomingListData, bookingData, roomingListBookingData });

    const { roomingLists, bookings, roomingListBookings } = await fetchData();

    const roomingListsData = assignBookings(
      roomingLists as RoomingList[],
      bookings,
      roomingListBookings
    );
    dispatch(setRoomingLists(roomingListsData));
  };

  const openModal = (list: RoomingList) => {
    setSelectedRoomingList(list);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRoomingList(null);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { roomingLists, bookings, roomingListBookings } =
          await fetchData();
        const roomingListsData = assignBookings(
          roomingLists as RoomingList[],
          bookings,
          roomingListBookings
        );
        dispatch(setRoomingLists(roomingListsData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
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
    <div className="p-6 h-screen relative bg-slate-50 overflow-hidden">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">
          Rooming List Management: Events
        </h1>
        <button
          className="self-stretch p 2.5 bg-indigo-600 text-white text-sm px-3 py-1 rounded"
          onClick={populateData}
        >
          Insert Bookings and RoomingLists
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
        <SearchBar />
        <FilterPanel />
      </div>

      {Object.entries(filteredSortedLists).map(([eventName, lists]) => (
        <div key={eventName} className="mb-6">
          <div
            className={`px-2 py-1.5 ${randomColor} rounded outline outline-1 outline-offset-[-1px] inline-flex justify-center items-center gap-2.5`}
          >
            <h2
              className={`text-lg text-center justify-center text-sm font-bold leading-tight`}
            >
              {eventName}
            </h2>
          </div>

          <div className="overflow-x-auto flex gap-4">
            {lists.map((list) => (
              <RoomingCard
                key={list.roomingListId}
                list={list}
                onViewBookings={openModal}
              />
            ))}
          </div>
        </div>
      ))}
      <BookingsModal
        isOpen={modalOpen}
        onClose={closeModal}
        roomingList={selectedRoomingList}
      />
    </div>
  );
};

export default EventsPage;
