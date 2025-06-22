import React from "react";
import { Dialog } from "@headlessui/react";
import { RoomingList } from "../features/roomingLists/roomingListsSlice";

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomingList: RoomingList | null;
}

const BookingsModal: React.FC<BookingsModalProps> = ({
  isOpen,
  onClose,
  roomingList,
}) => {
  if (!roomingList) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
        <Dialog.Title className="text-lg font-bold mb-4">
          Bookings for {roomingList.rfpName}
        </Dialog.Title>
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Event: {roomingList.eventName}
          </p>
          <p>Total Bookings: {roomingList.bookingsCount}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingsModal;
