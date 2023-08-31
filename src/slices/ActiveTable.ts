import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "components/PokerTable";
import type { RootState } from "store/store";

interface TableState {
  value: Table | null;
}

const initialState: TableState = {
  value: null,
};

export const activeTableSlice = createSlice({
  name: "activeTable",
  initialState,
  reducers: {
    setActiveTable: (state, action: PayloadAction<Table>) => {
      state.value = action.payload;
    },
  },
});

export const { setActiveTable } = activeTableSlice.actions;

export const selectTables = (state: RootState) => state.activeTable.value;

export default activeTableSlice.reducer;
