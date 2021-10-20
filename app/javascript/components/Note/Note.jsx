import React from "react";
import s from "./Note.module.scss";
import PropTypes from "prop-types";

export const Note = ({ row, col }) => {
  return (
    <div className={s.note_item}>
      {row}-{col}
    </div>
  );
};

Note.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
};
