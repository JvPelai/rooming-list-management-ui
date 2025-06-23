import React from "react";
import {
  Booking,
  RoomingList,
} from "../features/roomingLists/roomingListsSlice";
import docSVG from "../assets/Icon.svg";
import calendarSVG from "../assets/calendar.svg";
interface Props {
  list: RoomingList;
  onViewBookings: (list: RoomingList) => void;
}

const RoomingCard: React.FC<Props> = ({ list, onViewBookings }) => {
  const cutOffDate = new Date(list.cutOffDate);
  const day = cutOffDate.getDate();
  const month = cutOffDate.toLocaleString("default", { month: "short" });

  const sortedByCheckIn = [...(list.bookings as Booking[])].sort(
    (a, b) =>
      new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()
  );

  const sortedByCheckOut = [...(list.bookings as Booking[])].sort(
    (a, b) =>
      new Date(b.checkOutDate).getTime() - new Date(a.checkOutDate).getTime()
  );

  const startDate = sortedByCheckIn[0].checkInDate;
  const endDate = sortedByCheckOut[0].checkOutDate;

  return (
    <div
      key={list.roomingListId}
      className="min-w-[300px] bg-white rounded-xl shadow p-4 flex flex-col justify-between"
    >
      <div className="self-stretch inline-flex justify-between items-center">
        <div>
          <p className="font-bold">[{list.rfpName}]</p>
          <p>
            Agreement:{" "}
            <span className="font-semibold">{list.agreement_type}</span>
          </p>
          <p className="text-sm text-gray-500">
            <div className="inline-flex items-center gap-1">
              <img src={calendarSVG} alt="calendar" />
              {startDate} - {endDate}
            </div>
          </p>
        </div>
        <div className="inline-flex flex-col justify-start items-center gap-1">
          <div className="w-14 rounded flex flex-col justify-start items-center">
            <div className="self-stretch px-2.5 py-0.5 bg-blue-500/25 rounded-tl-lg rounded-tr-lg inline-flex justify-center items-center gap-2.5">
              <div className="justify-center text-blue-500 text-xs font-semibold uppercase leading-3 tracking-wide">
                {month}
              </div>
            </div>
            <div className="self-stretch px-2.5 py-1 bg-blue-500/10 rounded-bl-lg rounded-br-lg flex flex-col justify-center items-center gap-2.5">
              <div className="self-stretch text-center justify-center text-blue-500 text-2xl font-bold uppercase leading-normal">
                {day}
              </div>
            </div>
          </div>
          <div className="justify-center text-slate-500 text-xs font-medium leading-none">
            Cut-Off Date
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="self-stretch p 2.5 bg-indigo-600 text-white text-sm px-3 py-1 rounded"
          onClick={() => onViewBookings(list)}
        >
          View Bookings ({list.bookingsCount})
        </button>
        <button
          title="Show Agreement as PDF"
          className="text-indigo-600 border border-indigo-600 p-1 rounded"
        >
          <img src={docSVG} alt="pdf" />
        </button>
      </div>
    </div>
  );
};

export default RoomingCard;
