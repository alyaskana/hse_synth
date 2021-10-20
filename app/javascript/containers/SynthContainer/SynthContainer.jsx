import React, { useState } from "react";
import s from "./SynthContainer.module.scss";
import { Synth } from "../../components/Synth";

const NOTES_COUNT = 12;
const COL_PER_MEASURE_COUNT = 4;

const buildSequence = (notesCount, columnsCount) => {
  const sequence = [];
  for (let index = 0; index < columnsCount; index++) {
    sequence.push(new Array(notesCount).fill(false, 0, notesCount));
  }
  return sequence;
};

export const SynthContainer = () => {
  const [measureCount, setMeasureCount] = useState(COL_PER_MEASURE_COUNT * 4);
  const [sequence, setSequence] = useState(
    buildSequence(NOTES_COUNT, measureCount)
  );

  const handleClickPlus = () => {
    setMeasureCount(measureCount + COL_PER_MEASURE_COUNT);
    setSequence(
      sequence.concat(buildSequence(NOTES_COUNT, COL_PER_MEASURE_COUNT))
    );
  };

  const handleClickMinus = () => {
    setMeasureCount(measureCount - COL_PER_MEASURE_COUNT);
    setSequence(sequence.slice(0, -COL_PER_MEASURE_COUNT));
  };

  return (
    <div className={s.page_wrapper}>
      <div className={s.plus_minus_group}>
        <button className={s.plus} onClick={handleClickPlus}>
          +
        </button>
        <button className={s.minus} onClick={handleClickMinus}>
          -
        </button>
      </div>
      <Synth sequence={sequence} setSequence={setSequence} />
    </div>
  );
};
