import React, { useState, useLayoutEffect } from "react";
import * as Tone from "tone";

import { Synth } from "../../components/Synth";
import { melodySynth, melodyNotes } from "../../tunes/melodySynth";
import { drumSampler, drumNotes } from "../../tunes/drumSampler";
import s from "./SynthContainer.module.scss";
import { PlayBtn } from "../../components/ui/PlayBtn";
import { RandomBtn } from "../../components/ui/RandomBtn";

const NOTES_COUNT = 12;
const DRUM_NOTES_COUNT = 4;
const COLUMNS_COUNT = 32;

const setup = () => {
  Tone.start();
  Tone.Transport.start();
};

const buildSequence = (notesCount, columnsCount) => {
  const sequence = [];
  for (let index = 0; index < columnsCount; index++) {
    sequence.push(new Array(notesCount).fill(false, 0, notesCount));
  }
  return sequence;
};

const randomSequence = (sequence, rowCount, columnsCount) => {
  for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      sequence[columnIndex][rowIndex] = Math.random() < 0.1;
    }
  }
};

export const SynthContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumn] = useState();

  const [melodySequence, setMelodySequence] = useState(
    buildSequence(NOTES_COUNT, COLUMNS_COUNT)
  );
  const [drumSequence, setDrumSequence] = useState(
    buildSequence(DRUM_NOTES_COUNT, COLUMNS_COUNT)
  );

  useLayoutEffect(() => {
    setup();

    let index = 0;

    const repeat = (time) => {
      let step = index % COLUMNS_COUNT;
      setCurrentColumn(step);

      melodySequence[step].forEach((value, index) => {
        if (value)
          melodySynth.triggerAttackRelease(melodyNotes[index], "4n", time);
      });

      drumSequence[step].forEach((value, index) => {
        if (value)
          drumSampler.triggerAttackRelease(drumNotes[index], "4n", time);
      });

      index++;
    };

    Tone.Transport.bpm.value = 120;
    Tone.Transport.scheduleRepeat(repeat, "16n");
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      Tone.Transport.stop();
    } else {
      Tone.Transport.start();
      Tone.context.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRandom = () => {
    setMelodySequence((prevSequence) => {
      const newSequence = [...prevSequence];
      randomSequence(newSequence, NOTES_COUNT, COLUMNS_COUNT);
      return newSequence;
    });
    setDrumSequence((prevSequence) => {
      const newSequence = [...prevSequence];
      randomSequence(newSequence, DRUM_NOTES_COUNT, COLUMNS_COUNT);
      return newSequence;
    });
  };

  return (
    <div className={s.page_wrapper}>
      <div className={s.button_set}>
        <PlayBtn active={isPlaying} onClick={handlePlay} />
        <RandomBtn onClick={handleRandom} />
      </div>
      <Synth
        sequence={melodySequence}
        setSequence={setMelodySequence}
        currentColumn={currentColumn}
      />
      <Synth
        sequence={drumSequence}
        setSequence={setDrumSequence}
        currentColumn={currentColumn}
      />
    </div>
  );
};
