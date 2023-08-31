"use client";

import React from "react";
import PokerTable from "./PokerTable";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { addTable } from "slices/TablesSlice";
import {
  uniqueNamesGenerator,
  NumberDictionary,
  adjectives,
  colors,
} from "unique-names-generator";

const Playground = () => {
  const tables = useAppSelector((state) => state.tables.value);
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-screen h-screen  bg-gray-300 ">
      <div className="grid grid-cols-3 border bg-white">
        {Array.from(tables.values()).map((elem, index) => {
          return <PokerTable key={elem.id} table={elem} />;
        })}
      </div>
      <button
        onClick={() => {
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
          dispatch(
            addTable({
              id: Number(NumberDictionary.generate({ min: 0, max: 999 })),
              name: name,
              timer: -1,
            })
          );
        }}
        className="text-black"
      >
        add table
      </button>
    </div>
  );
};

export default Playground;
