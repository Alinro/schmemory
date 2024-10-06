import ICard from "./ICard";
import "./Card.css";
export default class Card implements ICard {
  private flipped = false;
  private identifier: number;

  private container = document.createElement("div");

  constructor(identifier: number, onFlip: (card: Card) => void) {
    this.identifier = identifier;

    this.container.className = "card";
    this.container.innerHTML = `<img src="${import.meta.env.VITE_IMAGE_BASE_URL}/svg/${identifier}/100"/>`;
    this.container.tabIndex = 0;

    // write this in a nicer way, maybe unify the onFlip calls in separate function
    this.container.addEventListener("click", () => {
      this.onFlip();
      onFlip(this);
    });
    this.container.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.onFlip();
        onFlip(this);
      }
    });
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
