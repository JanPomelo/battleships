"use strict";
import { Ship } from "./ship";

export class Gameboard {
  /* gameBoard with 10x10 number array. 
  0 = sea
  1 = ship
  2 = hit
  3 = no need to hit (?)
  */
  board: number[][];
  constructor() {
    let board: number[][] = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push(0);
      }
    }
    this.board = board;
  }
  placeShip(ship: Ship, direction: "Horizontal" | "Vertical", coords: number[]) {
    if (direction === "Horizontal") {
      const shipSpaceCols: number[] = [];
      if (ship.length === 5) {
        if (coords[1] < 2) {
          shipSpaceCols.push(0, 1, 2, 3, 4);
        } else if (coords[1] > 7) {
          shipSpaceCols.push(5, 6, 7, 8, 9);
        } else {
          shipSpaceCols.push(coords[1] - 2, coords[1] - 1, coords[1], coords[1] + 1, coords[1] + 2);
        }
        for (let i = 0; i < shipSpaceCols.length; i++) {
          this.board[coords[0]][shipSpaceCols[i]] = 1;
        }
      }
    }
  }

  private _createShipPlacementArr(
    ship: Ship,
    direction: "Horizontal" | "Vertical",
    coords: number[]
  ): {
    rows: number[];
    cols: number[];
  } {
    const rows: number[] = [];
    const cols: number[] = [];
    return {
      rows: rows,
      cols: cols,
    };
  }
}
