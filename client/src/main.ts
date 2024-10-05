import Board from "./game/Board/Board";
import Card from "./game/Card/Card";
import Tracker from "./game/Tracker/Tracker";
import "./style.css";

new Board(Card, new Tracker(), 10);
