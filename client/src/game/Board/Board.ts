import { ICardConstructor } from "../Card/ICard";
import ITracker from "../Tracker/ITracker";

type Pair = [InstanceType<ICardConstructor>?, InstanceType<ICardConstructor>?];

export default class Board {
  private CardConstructor: ICardConstructor;
  private tracker: ITracker;

  private rows: number;
  private columns: number;

  private cardCollection: number[] = [];

  private container = document.createElement("div");

  private currentPair: Pair = [];

  // TODO: named parameters
  constructor(
    CardClass: ICardConstructor,
    tracker: ITracker,
    rows: number,
    columns: number
  ) {
    this.CardConstructor = CardClass;
    this.tracker = tracker;

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
      const card = new this.CardConstructor(
        this.cardCollection[i],
        this.handleCardFlip.bind(this)
      );
      this.container.appendChild(card.Element);
    }
  }

  private handleCardFlip(card: InstanceType<ICardConstructor>): void {
    this.currentPair.push(card);
    if (this.currentPair.length === 2) {
      this.checkPair();
    }
  }

  private checkPair(): void {
    if (this.currentPair[0]?.Identifier === this.currentPair[1]?.Identifier) {
      this.tracker.onScoreChange(1);
      this.currentPair = [];
    } else {
      setTimeout(() => {
        this.currentPair[0]?.onFlip();
        this.currentPair[1]?.onFlip();
        this.currentPair = [];
      }, 1000);
    }
  }
}
