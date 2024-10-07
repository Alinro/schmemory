import ICard from "./ICard";
import "./Card.css";
export default class Card implements ICard {
  // card state (flipped or not)
  private flipped = false;

  // when comparing two cards, we need to know if they are the same
  private identifier: number;

  // container where the html elements will be appended
  private container = document.createElement("div");

  // callback received, to be called when the card is flipped
  onFlipProp: (card: Card) => void;

  constructor(identifier: number, onFlip: (card: Card) => void) {
    this.identifier = identifier;

    this.container.className = "card";
    this.container.innerHTML = `<img src="${import.meta.env.VITE_IMAGE_BASE_URL}/svg/${identifier}/100"/>`;
    this.container.tabIndex = 0;

    this.onFlipProp = onFlip;

    // write this in a nicer way, maybe unify the onFlip calls in separate function
    this.container.addEventListener("click", this.clickListener);
    this.container.addEventListener("keydown", this.keydownListener);
  }

  private clickListener = () => {
    this.onFlip();
    this.onFlipProp(this);
  };

  private keydownListener = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      this.onFlip();
      this.onFlipProp(this);
    }
  };

  public removeListeners() {
    this.container.removeEventListener("click", this.clickListener);
    this.container.removeEventListener("keydown", this.keydownListener);
  }

  public onFlip(): void {
    this.flipped = !this.flipped;
    this.container.classList.toggle("flipped");
  }

  public get Identifier() {
    return this.identifier;
  }

  public get Element() {
    return this.container;
  }
}
