import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "slices/TimerSlice";
import TablesSlice from "slices/TablesSlice";
import ActiveTable from "slices/ActiveTable";

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    tables: TablesSlice,
    activeTable: ActiveTable,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
