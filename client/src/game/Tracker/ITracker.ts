export default abstract class ITracker {
  public abstract onScoreChange(score: number): void;
  public abstract get Score(): number;
}
