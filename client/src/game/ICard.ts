export default abstract class ICard {
  public abstract onFlip(): void;

  public abstract get Identifier(): number;
  public abstract get Element(): HTMLElement;
}
