import ICard from "./ICard";

export default class Card implements ICard {
  private flipped = false;
  private identifier: number;

  private container = document.createElement("div");

  constructor(identifier: number) {
    this.identifier = identifier;
    this.container.innerHTML = `<img src="${import.meta.env.VITE_IMAGE_BASE_URL}/svg/${identifier}/200" />`;
    this.container.addEventListener("click", () => this.onFlip());
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
