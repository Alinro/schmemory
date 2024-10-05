import { expect, test } from "vitest";
import Card from "../Card/Card";
import Tracker from "../Tracker/Tracker";
import Board from "./Board";

test("flip the same cards, score is increased", () => {
  const board = new Board(Card, new Tracker(), 10);

  board.cards[0].onFlip();
  board.cards[10].onFlip();

  // it would probably more correct to check the onScoreChanged method was called
  // instead of checking the value directly
  expect(board.Tracker.Score).toBe(1);
});

test("flip different cards, score is not increased", () => {
  const board = new Board(Card, new Tracker(), 10);

  board.cards[0].onFlip();
  board.cards[1].onFlip();

  expect(board.Tracker.Score).toBe(0);
});
