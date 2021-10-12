import React, { useLayoutEffect } from "react";
import s from "./Glucophone.module.scss";
import * as Tone from "tone";

const synth = new Tone.PolySynth({
  envelope: {
    attack: 0.5,
    decay: 0,
    sustain: 0.3,
    release: 0,
  },
}).toDestination();

synth.set({
  oscillator: {
    type: "sine",
  },
});

var pattern = new Tone.Pattern(
  function (time, note) {
    sampler.triggerAttackRelease(note, "1m");
  },
  ["C4", "D4", "E4", "A3"],
  "upDown"
);

pattern.loop = true;
pattern.interval = "4n";

const setup = async () => {
  Tone.context.resume();
  await Tone.start();
  Tone.Transport.start();
  // pattern.start(0);
};

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4_hand.mp3",
    D4: "D4_hand.mp3",
    G4: "G4_hand.mp3",
    A4: "A4_hand.mp3",
    E4: "E4_hand.mp3",
    C5: "C5_hand.mp3",
  },
  baseUrl: "/",
  // onload: () => {
  //   sampler.triggerAttackRelease(["C5"], "1m");
  // },
}).toDestination();

// prettier-ignore
const seq = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, 0.8, time)
  },
  [
    'C4', 'E4', 'G4', 'C4', 'E4', 'G4', 'C4', 'E4', 'G4', 'C4', 'E4', 'G4',
    'E4', 'G4', 'B3', 'E4', 'G4', 'B3', 'E4', 'G4', 'B3', 'E4', 'G4', 'B3'
  ]
).start(0)

export const Glucophone = () => {
  const onNoteClick = (note) => {
    sampler.triggerAttackRelease(note, "1m");
  };
  return (
    <div>
      <button onClick={setup}>start</button>
      <div>
        <div
          className={`${s.note} ${s.big}`}
          onClick={() => {
            onNoteClick("C4");
          }}
        >
          C
        </div>
        <div
          className={`${s.note} ${s.big}`}
          onClick={() => {
            onNoteClick("D4");
          }}
        >
          D
        </div>
        <div
          className={`${s.note} ${s.big}`}
          onClick={() => {
            onNoteClick("E4");
          }}
        >
          E
        </div>
        <div
          className={`${s.note} ${s.big}`}
          onClick={() => {
            onNoteClick("G4");
          }}
        >
          G
        </div>
        <div
          className={`${s.note} ${s.big}`}
          onClick={() => {
            onNoteClick("A4");
          }}
        >
          A
        </div>
      </div>
      <div>
        <div
          className={`${s.note} ${s.small}`}
          onClick={() => {
            onNoteClick("C5");
          }}
        >
          C
        </div>
        <div
          className={`${s.note} ${s.small}`}
          onClick={() => {
            onNoteClick("D5");
          }}
        >
          D
        </div>
        <div
          className={`${s.note} ${s.small}`}
          onClick={() => {
            onNoteClick("E5");
          }}
        >
          E
        </div>
        <div
          className={`${s.note} ${s.small}`}
          onClick={() => {
            onNoteClick("G5");
          }}
        >
          G
        </div>
        <div
          className={`${s.note} ${s.small}`}
          onClick={() => {
            onNoteClick("A5");
          }}
        >
          A
        </div>
      </div>
    </div>
  );
};
