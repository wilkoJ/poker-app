import { configureStore } from "@reduxjs/toolkit";
import TablesSlice from "slices/TablesSlice";

export const store = configureStore({
  reducer: {
    tables: TablesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
