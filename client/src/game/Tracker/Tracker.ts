import ITracker from "./ITracker";

export default class Tracker implements ITracker {
  private score: number;

  constructor() {
    this.score = 0;
  }

  public onScoreChange(score: number): void {
    this.score += score;
  }

  public get Score(): number {
    return this.score;
  }
}
