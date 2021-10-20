import React from "react";
import s from "./Glucophone.module.scss";
import * as Tone from "tone";

const synth = new Tone.PolySynth({
  envelope: {
    attack: 0.5,
    decay: 0,
    sustain: 0.3,
    release: 1,
  },
}).toDestination();

synth.set({
  oscillator: {
    type: "sine",
  },
});

// var pattern = new Tone.Pattern(
//   function (time, note) {
//     sampler.triggerAttackRelease(note, "1m");
//   },
//   ["C4", "D4", "E4", "A3"],
//   "upDown"
// );

// pattern.loop = true;
// pattern.interval = "4n";

const setup = async () => {
  await Tone.start();
  Tone.Transport.start();
  // pattern.start(0);
};

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4_hammer.mp3",
    D4: "D4_hammer.mp3",
    G4: "G4_hammer.mp3",
    A4: "A4_hammer.mp3",
    E4: "E4_hammer.mp3",
    C5: "C5_hammer.mp3",
  },
  baseUrl: "/samples/",
  // onload: () => {
  //   sampler.triggerAttackRelease(["C5"], "1m");
  // },
}).toDestination();

// prettier-ignore
const seq = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, '4n', time)
  },
  [
    'C3', null, ['D3', null],
    'C3', 'E4', null, 'A3',
    'C3', null, 'D4', null,
    'C3', 'A4', null, null
  ], '4n'
).start(0)

const multiplayer = new Tone.Players({
  ambient: "/reversed_pad_83bpm_D_minor.wav",
}).toDestination();

export const Glucophone = () => {
  const onNoteClick = (note) => {
    sampler.triggerAttackRelease(note, "1m");
  };
  return (
    <div>
      <button onClick={setup}>start</button>
      <button onClick={() => Tone.Transport.stop()}>stop</button>
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
