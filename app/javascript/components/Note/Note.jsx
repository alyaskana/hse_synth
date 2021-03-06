import React from "react";
import cn from "classnames";
import s from "./Note.module.scss";
import PropTypes from "prop-types";

export const Note = ({ value, colIndex, rowIndex, setSequence, isPlaying }) => {
  const handleClick = () => {
    setSequence((prevSequence) => {
      const newSequence = [...prevSequence];
      newSequence[colIndex][rowIndex] = !value;
      return newSequence;
    });
  };

  return (
    <div
      className={cn(s.note, { [s.active]: value, [s.is_playing]: isPlaying })}
      onClick={handleClick}
    />
  );
};

Note.propTypes = {
  value: PropTypes.bool,
  colIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  setSequence: PropTypes.func,
  isPlaying: PropTypes.bool,
};
