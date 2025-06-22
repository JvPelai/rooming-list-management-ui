import {
  Booking,
  RoomingList,
  RoomingListBooking,
} from "../features/roomingLists/roomingListsSlice";

export const assignBookings = (
  roomingLists: any[],
  bookings: any[],
  roomingListBooking: any[]
) => {
  // Step 1: Create a map of bookings by ID for quick lookup
  const bookingMap = new Map();
  bookings.forEach((booking) => {
    bookingMap.set(booking.bookingId, booking);
  });

  // Step 2: Create a map of roomingListId => [bookings]
  const roomingListBookingsMap = new Map();
  roomingListBooking.forEach(({ roomingListId, bookingId }) => {
    const booking = bookingMap.get(bookingId);
    if (booking) {
      if (!roomingListBookingsMap.has(roomingListId)) {
        roomingListBookingsMap.set(roomingListId, []);
      }
      roomingListBookingsMap.get(roomingListId).push(booking);
    }
  });

  // Step 3: Attach bookings to their respective roomingLists
  const roomingListsWithBookings = roomingLists.map((rl) => {
    return {
      ...rl,
      bookings: roomingListBookingsMap.get(rl.roomingListId) || [],
    };
  });

  console.log("RoomingListsWithBookings:", roomingListsWithBookings);
};
