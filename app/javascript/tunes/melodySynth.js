import * as Tone from "tone";

export const melodySynth = new Tone.Synth({
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1,
  },
}).toDestination();

melodySynth.set({
  oscillator: {
    type: "triangle",
  },
});

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