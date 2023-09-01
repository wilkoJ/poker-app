"use client";

import React, { useEffect } from "react";
import PokerTable from "./PokerTable";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { addTable } from "slices/TablesSlice";

const Playground = () => {
  const tables = useAppSelector((state) => state.tables.tables);
  const dispatch = useAppDispatch();
  useEffect(() => {});
  return (
    <div className="flex w-screen h-screen p-4 gap-2">
      <div className="flex  flex-wrap  max-w-6xl h-fit bg-gray-700 gap-2 border-gray-950 border p-4">
        {Array.from(tables.values()).map((elem, index) => {
          return <PokerTable key={elem.id} table={elem} />;
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(addTable());
        }}
        className=" h-24 align-middle focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        Add table
      </button>
    </div>
  );
};

export default Playground;
