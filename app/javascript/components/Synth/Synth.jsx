import React from "react";
import s from "./Synth.module.scss";
import PropTypes from "prop-types";
import { PlayBtn } from "../ui/PlayBtn";
import { Column } from "../Column";

export const Synth = ({ sequence, setSequence }) => {
  return (
    <div className={s.wrapper}>
      <PlayBtn active />
      <div className={s.note_grid}>
        {sequence.map((column, index) => (
          <Column
            column={column}
            key={index}
            colIndex={index}
            setSequence={setSequence}
          />
        ))}
      </div>
      <div className={s.drum_grid}></div>
    </div>
  );
};

Synth.propTypes = {
  sequence: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
  setSequence: PropTypes.func,
};
