import React, { useState, useEffect, useLayoutEffect } from "react";
import * as Tone from "tone";

import { PlayBtn } from "../../components/ui/PlayBtn";
import { Synth } from "../../components/Synth";
import s from "./SynthContainer.module.scss";

const NOTES_COUNT = 12;
const COL_PER_MEASURE_COUNT = 4;

const setup = () => {
  Tone.start();
  Tone.Transport.start();
};

const synth = new Tone.Synth({
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
  },
}).toDestination();

synth.set({
  oscillator: {
    type: "triangle",
  },
});

const notes = [
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
];

const buildSequence = (notesCount, columnsCount) => {
  const sequence = [];
  for (let index = 0; index < columnsCount; index++) {
    sequence.push(new Array(notesCount).fill(false, 0, notesCount));
  }
  return sequence;
};

export const SynthContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumn] = useState();
  const [measureCount, setMeasureCount] = useState(COL_PER_MEASURE_COUNT * 4);

  const [sequence, setSequence] = useState(
    buildSequence(NOTES_COUNT, measureCount)
  );

  useLayoutEffect(() => {
    setup();

    let index = 0;

    const repeat = (time) => {
      let step = index % measureCount;
      setCurrentColumn(step);

      sequence[step].forEach((value, index) => {
        if (value) synth.triggerAttackRelease(notes[index], "4n", time);
      });

      index++;
    };

    Tone.Transport.bpm.value = 120;
    Tone.Transport.scheduleRepeat(repeat, "16n");
  }, []);

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

  const handlePlay = () => {
    if (isPlaying) {
      Tone.Transport.stop();
    } else {
      Tone.Transport.start();
      Tone.context.resume();
    }
    setIsPlaying(!isPlaying);
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
      <PlayBtn active={isPlaying} onClick={handlePlay} />
      <Synth
        sequence={sequence}
        setSequence={setSequence}
        currentColumn={currentColumn}
      />
    </div>
  );
};
