import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export const timerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    intialize: (state) => {
      state.value = getRandomArbitrary(15, 30);
    },
    decreaseTimer: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { intialize, decreaseTimer, incrementByAmount } =
  timerSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default timerSlice.reducer;
