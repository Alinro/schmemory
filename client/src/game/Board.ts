import ICard from "./ICard";
import ITracker from "./ITracker";

export default class Board {
  private CardClass: ICard;
  private Tracker: ITracker;

  constructor(CardClass: ICard, Tracker: ITracker) {
    this.CardClass = CardClass;
    this.Tracker = Tracker;
  }
}
