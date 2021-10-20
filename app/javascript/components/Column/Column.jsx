import React from "react";
// import s from "./Column.module.scss";
import PropTypes from "prop-types";
import { Note } from "../Note";

export const Column = ({ column, colIndex, setSequence, isPlaying }) => {
  return (
    <div>
      {column.map((note, rowIndex) => (
        <Note
          value={note}
          colIndex={colIndex}
          rowIndex={rowIndex}
          key={`${colIndex}-${rowIndex}`}
          setSequence={setSequence}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.arrayOf(PropTypes.bool),
  colIndex: PropTypes.number,
  setSequence: PropTypes.func,
  isPlaying: PropTypes.bool,
};
