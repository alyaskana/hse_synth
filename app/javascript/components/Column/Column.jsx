import React from "react";
// import s from "./Column.module.scss";
import PropTypes from "prop-types";
import { Note } from "../Note";

export const Column = ({ column, colIndex, setSequence }) => {
  return (
    <div>
      {column.map((note, rowIndex) => (
        <Note
          value={note}
          colIndex={colIndex}
          rowIndex={rowIndex}
          key={`${colIndex}-${rowIndex}`}
          setSequence={setSequence}
        />
      ))}
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.arrayOf(PropTypes.bool),
  colIndex: PropTypes.number,
  setSequence: PropTypes.func,
};
