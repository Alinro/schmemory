export default abstract class ITracker {
  public abstract onScoreChange(score: number): void;
  public abstract onScoreUnchanged(): void;
  public abstract get Score(): Record<Players, number>;
}

export enum Players {
  Player1 = "Player 1",
  Player2 = "Player 2",
}
