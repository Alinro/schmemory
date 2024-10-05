import ICard from "./ICard";
import ITracker from "./ITracker";

export default class Board<T extends ICard, U extends ITracker> {
  private CardClass: new (identifier: number) => T;
  private tracker: ITracker;

  private rows: number;
  private columns: number;

  private cardCollection: number[] = [];

  private container = document.createElement("div");

  constructor(
    CardClass: new (identifier: number) => T,
    TrackerClass: new () => U,
    rows: number,
    columns: number
  ) {
    this.CardClass = CardClass;
    this.tracker = new TrackerClass();

    // TODO: validate rows and columns. set limits
    this.rows = rows;
    this.columns = columns;

    for (let i = 0; i < rows * columns; i++) {
      this.cardCollection.push(i % ((rows * columns) / 2));
    }
    document.body.appendChild(this.container);
    this.populateBoard();
  }

  private populateBoard(): void {
    for (let i = 0; i < this.rows * this.columns; i++) {
      const card = new this.CardClass(this.cardCollection[i]);
      this.container.appendChild(card.Element);
    }
  }
}
