import axios from "axios";
const API_BASE_URL = process.env.API_URL || "localhost:3000";

export const fetchData = async () => {
  const roomingLists = await axios.get(`${API_BASE_URL}/rooming-list`);
  const bookings = await axios.get(`${API_BASE_URL}/rooming-list`);
  const roomingListBookings = await axios.get(`${API_BASE_URL}/rooming-list`);
  return { roomingLists, bookings, roomingListBookings };
};

export const deleteData = async () => {
  const response = await axios.delete(`${API_BASE_URL}`);
  return response.data;
};

export const insertData = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}`, data);
  return response.data;
};
