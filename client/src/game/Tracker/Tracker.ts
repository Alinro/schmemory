import ITracker, { Players } from "./ITracker";
import "./Tracker.css";

export default class Tracker implements ITracker {
  // score for each player
  private score = {
    [Players.Player1]: 0,
    [Players.Player2]: 0,
  };
  // number of moves for each player
  private moves = {
    [Players.Player1]: 0,
    [Players.Player2]: 0,
  };

  private currentPlayer = Players.Player1;

  // multiple containers where html elements will be appended
  private trackerContainer = document.createElement("div");
  private scoreContainer = document.createElement("div");
  private movesContainer = document.createElement("div");
  private currentPlayerContainer = document.createElement("div");

  constructor(container: HTMLElement) {
    this.trackerContainer.className = "tracker";
    this.currentPlayerContainer.className = "currentPlayer";

    this.updateScoreText();
    this.updateMovesText();
    this.updateCurrentPlayerText();

    container.appendChild(this.trackerContainer);
    this.trackerContainer.appendChild(this.currentPlayerContainer);
    this.trackerContainer.appendChild(this.scoreContainer);
    this.trackerContainer.appendChild(this.movesContainer);
  }

  public onScoreChange(score: number): void {
    this.updateScore(score);
    this.updateMoves();

    this.switchPlayer();
  }

  public onScoreUnchanged(): void {
    this.updateMoves();

    this.switchPlayer();
  }

  private updateScore(score: number): void {
    this.score[this.currentPlayer] += score;
    this.updateScoreText();
  }

  private updateScoreText() {
    this.scoreContainer.innerText = `${Players.Player1} score: ${this.score[Players.Player1]} \n ${Players.Player2} score ${this.score[Players.Player2]}`;
  }

  private updateMoves(): void {
    this.moves[this.currentPlayer]++;
    this.updateMovesText();
  }

  private updateMovesText() {
    this.movesContainer.innerText = `${Players.Player1} moves: ${this.moves[Players.Player1]} \n ${Players.Player2} moves ${this.moves[Players.Player2]}`;
  }

  private switchPlayer(): void {
    this.currentPlayer =
      this.currentPlayer === Players.Player1
        ? Players.Player2
        : Players.Player1;

    this.updateCurrentPlayerText();
  }

  private updateCurrentPlayerText() {
    this.currentPlayerContainer.innerText = `Current player: ${this.currentPlayer}`;
  }

  public get Score(): Record<Players, number> {
    return this.score;
  }

  public onGameOver(): void {
    const div = document.createElement("div");
    let gameOverText = `It's a draw`;

    if (this.score[Players.Player1] === this.score[Players.Player2]) {
      gameOverText = `It's a draw`;
    } else if (this.score[Players.Player1] > this.score[Players.Player2]) {
      gameOverText = `${Players.Player1} wins!`;
    } else {
      gameOverText = `${Players.Player2} wins!`;
    }

    div.innerText = `Game over! ${gameOverText}`;
    this.trackerContainer.appendChild(div);
  }
}
