import React from "react";
import s from "./Synth.module.scss";
import PropTypes from "prop-types";
import { Column } from "../Column";

export const Synth = ({ sequence, setSequence, currentColumn }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.note_grid}>
        {sequence.map((column, index) => (
          <Column
            column={column}
            key={index}
            colIndex={index}
            setSequence={setSequence}
            isPlaying={currentColumn == index}
          />
        ))}
      </div>
    </div>
  );
};

Synth.propTypes = {
  sequence: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
  setSequence: PropTypes.func,
  currentColumn: PropTypes.number,
};
