import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "components/PokerTable";
import type { RootState } from "store/store";
import {
  uniqueNamesGenerator,
  NumberDictionary,
  adjectives,
  colors,
} from "unique-names-generator";

interface TablesState {
  value: Table[];
  active: Table | null;
}
export type priority = 1 | 2 | 3;
const initialState: TablesState = {
  value: [],
  active: null,
};

//Refacto Could discosiate the timer into his own slice linked by table.id same for the activeTable but it's simpler this way for this case.

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
      state.value.push({
        id: Number(NumberDictionary.generate({ min: 0, max: 20000 })),
        name: name,
        timer: -1,
        actionRequired: false,
      });
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
        if (elem.id == action.payload) if (elem.timer > 0) elem.timer -= 1;
        return elem;
      });
    },
    setActionRequired: (
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) => {
      state.value = state.value.map((elem) => {
        const { id, value } = action.payload;
        if (elem.id == id) elem.actionRequired = value;
        return elem;
      });
    },
    orderTable: (state) => {
      state.value = state.value.sort((a, b) => {
        if (a.actionRequired && a.id == state.active?.id) return 1;
        if (a.actionRequired && !b.actionRequired) return -1;
        if (!a.actionRequired && b.actionRequired) return 1;
        return a.timer - b.timer;
      });
    },
    setActiveTable: (state, action: PayloadAction<Table>) => {
      state.active = action.payload;
      console.log(state.active);
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
} = tablesSlice.actions;

export const selectTables = (state: RootState) => state.tables.value;

export const activeTable = (state: RootState) => state.tables.active;
1;
export default tablesSlice.reducer;
