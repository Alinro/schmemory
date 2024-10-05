import Board from "./game/Board";
import Card from "./game/Card";
import Tracker from "./game/Tracker";
import "./style.css";

new Board(Card, new Tracker(), 4, 4);
