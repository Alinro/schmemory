import ITracker from "./ITracker";

export default class Tracker implements ITracker {
  private score: number;
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.score = 0;
    this.element = element;
  }

  public onScoreChange(score: number): void {
    this.score = score;
  }
}
