import React from "react";
import s from "./Synth.module.scss";
import PropTypes from "prop-types";
import { PlayBtn } from "../ui/PlayBtn";
import { Column } from "../Column";

export const Synth = ({ columnsCount }) => {
  const columns = [];
  for (var i = 0; i < columnsCount; i++) {
    columns.push(<Column notesCount={12} key={i} col={i} />);
  }

  return (
    <div className={s.wrapper}>
      <PlayBtn active />
      <div className={s.note_grid}>{columns}</div>
      <div className={s.drum_grid}></div>
    </div>
  );
};

Synth.propTypes = {
  columnsCount: PropTypes.number,
};
