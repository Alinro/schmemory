import { ICardConstructor } from "../Card/ICard";
import ITracker from "../Tracker/ITracker";
import "./Board.css";

type Pair = [InstanceType<ICardConstructor>?, InstanceType<ICardConstructor>?];

export default class Board {
  // interfaces are useful for knowing the public methods and properties of a class
  // we don't need to know the implementation details, just the contract

  // for the card, we need the class to create multiple instance
  private CardConstructor: ICardConstructor;
  // for the tracker, it's enough to receive an instance
  private tracker: ITracker;

  private numberOfPairs: number;

  // identifiers for the cards that will be generated. could be improved by merging it with this.cards
  private cardCollection: number[] = [];

  // container where all html elements will be appended
  private container = document.createElement("div");

  // current pair of flipped cards. resets when two cards are flipped
  private currentPair: Pair = [];

  // all cards that are generated
  public cards: InstanceType<ICardConstructor>[] = [];

  // used dependency injection for the card and tracker classes so it's easier to test and swap implementations
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

      // after every successful pair, we need to check if the game is over
      if (this.isGameOver()) {
        this.tracker.onGameOver();
      }
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

  private isGameOver(): boolean {
    // TODO: better check for flipped cards (maybe a new isFlipped method on card)
    return !this.cards.some(
      (card) => !card.Element.classList.contains("flipped")
    );
  }
}
