// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ICardConstructor = new (...args: any[]) => ICard;

export default abstract class ICard {
  public abstract onFlip(): void;
  public abstract removeListeners(): void;

  public abstract get Identifier(): number;
  public abstract get Element(): HTMLElement;
}
