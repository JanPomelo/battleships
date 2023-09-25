"use strict";
import { Gameboard } from "./gameboard";
import { printGameBoard } from "./UserInterface";

export class Player {
  private gameBoard: Gameboard;
  name: string;
  constructor(name: string) {
    this.gameBoard = new Gameboard();
    this.name = name;
  }

  get board() {
    return this.gameBoard;
  }

  makeMove(coords: number[] | null, player: Player) {
    if (!coords) {
      let computerResponse;
      do {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);
        computerResponse = player.board.receiveAttack([row, column]);
      } while (computerResponse != undefined);
      return true;
    }
    let playerResponse = player.board.receiveAttack(coords);
    if (playerResponse != undefined) {
      return false;
    }
    return true;
  }
}
