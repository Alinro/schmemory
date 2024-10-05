import ICard from "./ICard";
import "./Card.css";
export default class Card implements ICard {
  private flipped = false;
  private identifier: number;

  private container = document.createElement("div");

  private onFlipProp: (card: Card) => void;

  constructor(identifier: number, onFlip: (card: Card) => void) {
    this.identifier = identifier;
    this.onFlipProp = onFlip;

    this.container.className = "card";
    this.container.innerHTML = `<img src="${import.meta.env.VITE_IMAGE_BASE_URL}/svg/${identifier}/100" />`;
    this.container.addEventListener("click", this.onFlip);
  }

  public onFlip(): void {
    this.flipped = !this.flipped;
    this.container.classList.toggle("flipped");
    this.onFlipProp(this);
  }

  public get Identifier() {
    return this.identifier;
  }

  public get Element() {
    return this.container;
  }
}
