import * as Tone from "tone";

export const melodySynth = new Tone.MembraneSynth({
  pitchDecay: 0.001,
  octaves: 10,
  oscillator: {
    type: "fatsine"
  },
  envelope: {
    attack: 0.005,
    decay: 0.6,
    sustain: 0.5,
    release: 1.4,
    attackCurve: "exponential"
  }
}).toDestination();

export const melodyNotes = [
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