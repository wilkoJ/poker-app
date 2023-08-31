import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "components/PokerTable";
import type { RootState } from "store/store";

interface TablesState {
  value: Table[];
}

const initialState: TablesState = {
  value: [],
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.value.push(action.payload);
    },
    removeTable: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item) => item.id != action.payload);
    },
    setTimer: (state, action: PayloadAction<{ id: number; value: number }>) => {
      const { id, value } = action.payload;
      state.value = state.value.map((elem) => {
        if (elem.id == id) elem.timer = value;
        return elem;
      });
    },
    decrementTimer: (state, action: PayloadAction<number>) => {
      state.value = state.value.map((elem) => {
        if (elem.id == action.payload && elem.timer > 0) elem.timer -= 1;
        return elem;
      });
    },
  },
});

export const { addTable, removeTable, setTimer, decrementTimer } =
  tablesSlice.actions;

export const selectTables = (state: RootState) => state.tables.value;

export default tablesSlice.reducer;
