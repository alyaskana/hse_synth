import React, { useState, useLayoutEffect } from "react";
import * as Tone from "tone";

import { PlayBtn } from "../../components/ui/PlayBtn";
import { Synth } from "../../components/Synth";
import { melodySynth, melodyNotes } from "../../tunes/melodySynth";
import { drumSampler, drumNotes } from "../../tunes/drumSampler";
import s from "./SynthContainer.module.scss";

const NOTES_COUNT = 12;
const DRUM_NOTES_COUNT = 4;
const COL_PER_MEASURE_COUNT = 4;

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

export const SynthContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentColumn, setCurrentColumn] = useState();
  const [measureCount] = useState(COL_PER_MEASURE_COUNT * 4);

  const [melodySequence, setMelodySequence] = useState(
    buildSequence(NOTES_COUNT, measureCount)
  );
  const [drumSequence, setDrumSequence] = useState(
    buildSequence(DRUM_NOTES_COUNT, measureCount)
  );

  useLayoutEffect(() => {
    setup();

    let index = 0;

    const repeat = (time) => {
      let step = index % measureCount;
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

  return (
    <div className={s.page_wrapper}>
      <PlayBtn active={isPlaying} onClick={handlePlay} />
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
