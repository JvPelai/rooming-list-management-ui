import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Status =
  | "Active"
  | "Closed"
  | "Cancelled"
  | "Confirmed"
  | "completed"
  | "received"
  | "archived"
  | "confirmed";

export interface RoomingList {
  id: number;
  eventId: number;
  eventName: string;
  hotelId: number;
  rfpName: string;
  cutOffDate: string;
  status: Status;
  agreement_type: string;
  bookingsCount: number;
}

interface RoomingListState {
  all: RoomingList[];
  search: string;
  filters: Status[];
  sort: "asc" | "desc";
}

const initialState: RoomingListState = {
  all: [],
  search: "",
  filters: [
    "Active",
    "Closed",
    "Cancelled",
    "completed",
    "received",
    "archived",
    "confirmed",
    "Confirmed",
  ],
  sort: "asc",
};

const roomingListsSlice = createSlice({
  name: "roomingLists",
  initialState,
  reducers: {
    setRoomingLists(state, action: PayloadAction<RoomingList[]>) {
      state.all = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilters(state, action: PayloadAction<Status[]>) {
      state.filters = action.payload;
    },
    setSort(state, action: PayloadAction<"asc" | "desc">) {
      state.sort = action.payload;
    },
  },
});

export const { setRoomingLists, setSearch, setFilters, setSort } =
  roomingListsSlice.actions;
export default roomingListsSlice.reducer;
