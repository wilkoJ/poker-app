import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { Table } from "components/PokerTable";
import { stat } from "fs";
import type { RootState } from "store/store";
import {
  uniqueNamesGenerator,
  NumberDictionary,
  adjectives,
  colors,
} from "unique-names-generator";

interface TablesState {
  tables: Table[];
  active: Table | null;
}
export type priority = 1 | 2 | 3;
const initialState: TablesState = {
  tables: [],
  active: null,
};

//Refacto Could discosiate the timer into his own slice linked by table.id same for the activeTable

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    addTable: (state) => {
      const name = uniqueNamesGenerator({
        dictionaries: [
          adjectives,
          colors,
          NumberDictionary.generate({ min: 0, max: 999 }),
        ],
        length: 3,
        separator: "",
        style: "capital",
      });
      state.tables.push({
        id: Number(NumberDictionary.generate({ min: 0, max: 20000 })),
        name: name,
        timer: -1,
        actionRequired: false,
      });
    },
    removeTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter((item) => item.id != action.payload);
    },
    setTimer: (state, action: PayloadAction<{ id: number; value: number }>) => {
      const { id, value } = action.payload;
      const arr = state.tables.map((elem) => {
        if (elem.id == id) elem.timer = value;
        return elem;
      });
      state.tables = arr;
    },
    decrementTimer: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.map((elem) => {
        if (elem.id == action.payload) if (elem.timer > 0) elem.timer -= 1;
        return elem;
      });
    },
    setActionRequired: (
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) => {
      state.tables = state.tables.map((elem) => {
        const { id, value } = action.payload;
        if (elem.id == id) elem.actionRequired = value;
        return elem;
      });
    },
    orderTable: (state) => {
      const arr = state.tables.sort((a, b) => {
        if (a.actionRequired && a.id == state.active?.id) return 1;
        if (a.actionRequired && !b.actionRequired) return -1;
        if (!a.actionRequired && b.actionRequired) return 1;
        return a.timer - b.timer;
      });
      state.tables = arr;
    },
    setActiveTable: (state, action: PayloadAction<Table>) => {
      const value = action.payload;
      state.active = value;
    },
    setFirstActiveTable: (state) => {
      state.active = state.tables[0];
    },
  },
});

export const {
  addTable,
  removeTable,
  setTimer,
  decrementTimer,
  orderTable,
  setActionRequired,
  setActiveTable,
  setFirstActiveTable,
} = tablesSlice.actions;

export const selectTables = (state: RootState) => state.tables.tables;

export const activeTable = (state: RootState) => state.tables.active;
export default tablesSlice.reducer;
