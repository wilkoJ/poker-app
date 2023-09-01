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
    <div className="flex w-screen h-screen ">
      <div className="grid grid-cols-3  bg-green-100 gap-2 border-green-400 border p-4">
        {Array.from(tables.values()).map((elem, index) => {
          return <PokerTable key={elem.id} table={elem} />;
        })}
      </div>
      <button
        onClick={() => {
          dispatch(addTable());
        }}
        className="text-black"
      >
        add table
      </button>
    </div>
  );
};

export default Playground;
