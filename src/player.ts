'use strict'
import { Gameboard } from "./gameboard"

export class Player {
  private gameBoard: Gameboard;
  private playerName: string;

  constructor(name: string) {
    this.gameBoard = new Gameboard();
    this.playerName = name;
  }

  get name() {
    return this.playerName;
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
      }
      while (computerResponse != undefined)
      return true;
    }
    let playerResponse = player.board.receiveAttack(coords);
    if (playerResponse != undefined) {
      return false;
    }
    return true;
  }
}