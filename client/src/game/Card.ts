import ICard from "./ICard";

export default class Card implements ICard {
  private flipped = false;
  private identifier: number;

  constructor(identifier: number) {
    this.identifier = identifier;
  }

  public onFlip(): void {
    this.flipped = !this.flipped;
  }
}
