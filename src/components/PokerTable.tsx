"use client";
import React, { useRef, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "store/hooks";

import {
  removeTable,
  setTimer,
  decrementTimer,
  orderTable,
  setActionRequired,
  setActiveTable,
  setFirstActiveTable,
} from "slices/TablesSlice";

import Table from "models/Table";
import { getRandomArbitrary } from "utils";

type IProps = {
  table: Table;
};

const PokerTable = ({ table }: IProps) => {
  const dispatch = useAppDispatch();
  const activeTable = useAppSelector((state) => state.tables.active);
  const tables = useAppSelector((state) => state.tables.tables);

  const intervalId = useRef<NodeJS.Timer>();

  const timeOutId = useRef<NodeJS.Timeout>();
  const processActions = (timerValue: number, action: boolean) => {
    dispatch(setTimer({ id: table.id, value: timerValue }));
    dispatch(setActionRequired({ id: table.id, value: action }));
    dispatch(orderTable());
    if (tables.length) dispatch(setFirstActiveTable());
  };

  useEffect(() => {
    // helper function to stop an existing timer
    const clear = () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };

    // start the timer
    if (table.timer > 0) {
      intervalId.current = setInterval(() => {
        dispatch(decrementTimer(table.id));
      }, 1000);
    }
    // stop the timer when the timer is <= 0
    else {
      processActions(-1, false);
      clear();
    }
    // cleanup function stops the timer when the component unmounts
    return clear;
  }, [dispatch, table.id, table.timer]);

  useEffect(() => {
    const clear = () => {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
    };

    // start the timer
    if (!table.actionRequired) {
      timeOutId.current = setTimeout(() => {
        const value = getRandomArbitrary(15, 30);
        processActions(value, true);
      }, 10000);
    }
    // stop the timer when the timer is <= 0
    else {
      clear();
    }
    // cleanup function stops the timer when the component unmounts
    return clear;
  }, [table.actionRequired, table.id]);

  return (
    <div
      onClick={(e) => {
        dispatch(setActiveTable(table));
        e.stopPropagation();
      }}
      className={`bg-white border  ${
        table.id == activeTable?.id
          ? "border-red-500"
          : table.actionRequired
          ? "border-yellow-500"
          : "border-black"
      } p5 h-36 w-52 block`}
    >
      <div className="flex flex-wrap items-center border-b border-black justify-between h-12 ">
        <p>{table.name}</p>
        <button
          onClick={() => {
            dispatch(removeTable(table.id));
          }}
          type="button"
          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col justify-center p-2">
        <span
          className={`${table.timer > 0 ? "visible" : "invisible"} text-center`}
        >
          Time: {table.timer}
        </span>
        <button
          type="button"
          disabled={table.timer <= 0}
          onClick={() => {
            processActions(-1, false);
          }}
          className="disabled:bg-gray-400 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Miser
        </button>
      </div>
    </div>
  );
};

export const MemoizedPokerTable = React.memo(PokerTable);
export default PokerTable;
