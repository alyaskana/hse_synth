import React from "react";
// import s from "./Column.module.scss";
import PropTypes from "prop-types";
import { Note } from "../Note";

export const Column = ({ notesCount, col }) => {
  const notes = [];
  for (var i = 0; i < notesCount; i++) {
    notes.push(<Note col={col} row={i} key={i} />);
  }
  return <div>{notes}</div>;
};

Column.propTypes = {
  notesCount: PropTypes.number,
  col: PropTypes.number,
};
