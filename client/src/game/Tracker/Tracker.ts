import ITracker from "./ITracker";

export default class Tracker implements ITracker {
  private score: number;

  private trackerContainer = document.createElement("div");

  constructor(container: HTMLElement) {
    this.score = 0;

    this.trackerContainer.className = "tracker";
    container.appendChild(this.trackerContainer);
    this.trackerContainer.innerText = `Score: ${this.score}`;
  }

  public onScoreChange(score: number): void {
    this.score += score;
    this.trackerContainer.innerText = `Score: ${this.score}`;
  }

  public get Score(): number {
    return this.score;
  }
}
