import { ICardConstructor } from "../Card/ICard";
import ITracker from "../Tracker/ITracker";
import "./Board.css";

type Pair = [InstanceType<ICardConstructor>?, InstanceType<ICardConstructor>?];

export default class Board {
  private CardConstructor: ICardConstructor;
  private tracker: ITracker;

  private numberOfPairs: number;

  private cardCollection: number[] = [];

  private container = document.createElement("div");

  private currentPair: Pair = [];

  public cards: InstanceType<ICardConstructor>[] = [];

  // TODO: named parameters if there are too many
  constructor(
    CardClass: ICardConstructor,
    tracker: ITracker,
    numberOfPairs: number
  ) {
    this.CardConstructor = CardClass;
    this.tracker = tracker;

    // TODO: set limits
    this.numberOfPairs = numberOfPairs;

    for (let i = 0; i < numberOfPairs * 2; i++) {
      this.cardCollection.push(i % numberOfPairs);
    }
    this.container.className = "board";
    document.body.appendChild(this.container);
    this.populateBoard();
  }

  private populateBoard(): void {
    for (let i = 0; i < this.numberOfPairs * 2; i++) {
      const card = new this.CardConstructor(
        this.cardCollection[i],
        this.handleCardFlip.bind(this)
      );
      this.container.appendChild(card.Element);
      this.cards.push(card);
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
      this.currentPair[0]?.removeListeners();
      this.currentPair[1]?.removeListeners();
    } else {
      // if people click the cards too fast, we need to save the current pair for when the setTimeout runs
      const currentPair = this.currentPair;
      setTimeout(() => {
        currentPair[0]?.onFlip();
        currentPair[1]?.onFlip();
      }, 1000);
      this.tracker.onScoreUnchanged();
    }
    this.currentPair = [];
  }

  public get Tracker(): ITracker {
    return this.tracker;
  }
}
