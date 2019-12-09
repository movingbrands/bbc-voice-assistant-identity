import EventEmitter from "eventemitter3";

export const calculateAverageFrameRate = deltas => {
  let total = 0;
  for (let i = 0; i < deltas.length; i++) {
    total += deltas[i];
  }
  return (total / deltas.length) * 1000;
};

export class FrameCounter extends EventEmitter {
  deltas = [];

  constructor({
    target = 60, // target frames per second/FPS
    threshold = 15 // permitted deviation from target FPS
  }) {
    super();
    this.target = target;
    this.threshold = threshold;
    this.average = 1000 / this.target;
    this.warnings = 0;
  }
  addDelta = d => {
    this.deltas.push(d);
    if (this.deltas.length > 100) this.calculate();
  };
  resetCounter = () => {
    this.deltas = [];
    this.warnings = 0;
  };
  calculate = (refresh = true) => {
    this.average = calculateAverageFrameRate(this.deltas);
    if (refresh) this.deltas = [];

    // if the average framerate is lower than the target FPS, emit a warning
    // warnings counter records and shares the number of times this has happened
    if (Math.abs(this.target - 1000 / this.average) > this.threshold) {
      this.warnings += 1;
      this.emit("slow-fps", 1000 / this.average, this.warnings);
    }

    return this.average;
  };
}
