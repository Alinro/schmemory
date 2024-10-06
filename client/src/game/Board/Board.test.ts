import { expect, test } from "vitest";
import Card from "../Card/Card";
import Tracker from "../Tracker/Tracker";
import Board from "./Board";

test("flip the same cards, score is increased", () => {
  const board = new Board(Card, new Tracker(document.body), 10);

  board.cards[0].Element.click();
  board.cards[10].Element.click();

  // it would probably more correct to check the onScoreChanged method was called
  // instead of checking the value directly
  expect(board.Tracker.Score["Player 1"]).toBe(1);
  expect(board.Tracker.Score["Player 2"]).toBe(0);
});

test("flip different cards, score is not increased", () => {
  const board = new Board(Card, new Tracker(document.body), 10);

  board.cards[0].Element.click();
  board.cards[1].Element.click();

  expect(board.Tracker.Score["Player 1"]).toBe(0);
  expect(board.Tracker.Score["Player 2"]).toBe(0);
});
