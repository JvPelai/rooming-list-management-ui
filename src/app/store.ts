import { configureStore } from "@reduxjs/toolkit";
import roomingListsReducer from "../features/roomingLists/roomingListsSlice";

export const store = configureStore({
  reducer: {
    roomingLists: roomingListsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
