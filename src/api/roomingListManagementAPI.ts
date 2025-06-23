import axios from "axios";
import {
  Booking,
  RoomingList,
  RoomingListBooking,
} from "../features/roomingLists/roomingListsSlice";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const fetchData = async (): Promise<{
  roomingLists: RoomingList[];
  bookings: Booking[];
  roomingListBookings: RoomingListBooking[];
}> => {
  const roomingLists = await axios.get<{ data: RoomingList[] }>(
    `${REACT_APP_API_URL}/rooming-list`
  );
  const bookings = await axios.get<{ data: Booking[] }>(
    `${REACT_APP_API_URL}/booking`
  );
  const roomingListBookings = await axios.get<{ data: RoomingListBooking[] }>(
    `${REACT_APP_API_URL}/rooming-list-booking`
  );

  return {
    roomingLists: roomingLists.data.data,
    bookings: bookings.data.data,
    roomingListBookings: roomingListBookings.data.data,
  };
};

export const deleteData = async () => {
  const instance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${REACT_APP_API_TOKEN}`,
    },
  });

  await instance.delete(`/rooming-list`);
  await instance.delete(`/booking`);
  await instance.delete(`/rooming-list-booking`);
  return "All data deleted successfully";
};

export const insertData = async (data: any) => {
  const instance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${REACT_APP_API_TOKEN}`,
    },
  });

  await instance.post(`/rooming-list/bulk`, data.roomingListData);
  await instance.post(`/booking/bulk`, data.bookingData);
  await instance.post(
    `/rooming-list-booking/bulk`,
    data.roomingListBookingData
  );
  return "data created successfully";
};
