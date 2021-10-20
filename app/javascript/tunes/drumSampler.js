import * as Tone from "tone";

const samples = {
  e1: "00003-Linn-9000-Hhclose1.mp3",
  e2: "00007-Linn-9000-Kick-2.mp3",
  e3: "00017-Linn-9000-Snare.mp3",
  e4: "00021-Linn-9000-Tom-3.mp3"
}
export const drumSampler = new Tone.Sampler({
  urls: samples,
  baseUrl: "/samples/",
}).toDestination();

export const drumNotes = Object.keys(samples)