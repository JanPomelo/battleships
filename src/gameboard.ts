"use strict";
import { Ship } from "./ship";

export class Gameboard {
  // gameBoard with 10x10 number array. 
  board: (Ship | null)[][];
  constructor() {
    let board: Ship | null [][] = [];
    for (let i = 0; i < 10; i++) {
      board.push([]);
      for (let j = 0; j < 10; j++) {
        board[i].push(null);
      }
    }
    this.board = board;
  }
  placeShip(ship: Ship, direction: "Horizontal" | "Vertical", coords: number[]) {
    let shipSpaceRows: number[] = [];
    let shipSpaceCols: number[] = [];
    if (direction === "Horizontal") {
      for (let i = 0; i < ship.length; i++) {
        shipSpaceRows.push(coords[0]);
      }
      shipSpaceCols = this._createShipPlacementArr(ship.length, coords[1]);
    } else {
      for (let i = 0; i < ship.length; i++) {
        shipSpaceCols.push(coords[1]);
      }
      shipSpaceRows = this._createShipPlacementArr(ship.length, coords[0]);
    }
    if (!this._checkIfSpaceIsFree(shipSpaceRows, shipSpaceCols)) {
      const err = new Error("Space is not available!");
      return err;
    }
    for (let i = 0; i < shipSpaceCols.length; i++) {
      this.board[shipSpaceRows[i]][shipSpaceCols[i]] = ship;
    }

  }

  private _checkIfSpaceIsFree(row: number[], col: number[]) {
    for (let i = 0; i < row.length; i++) {
      if (this.board[row[i]][col[i]]!= null) {
        return false;
      }
    }
    return true;
  }

  private _createShipPlacementArr(shipLength: number, coordPoint: number): number[] {
    const placementArr: number[] = [];
    if (shipLength === 5) {
      if (coordPoint < 2) {
        placementArr.push(0, 1, 2, 3, 4);
      } else if (coordPoint > 7) {
        placementArr.push(5, 6, 7, 8, 9);
      } else {
        placementArr.push(coordPoint - 2, coordPoint - 1, coordPoint, coordPoint + 1, coordPoint + 2);
      }
    } else if (shipLength === 4) {
      if (coordPoint < 1) {
        placementArr.push(0, 1, 2, 3);
      } else if (coordPoint > 7) {
        placementArr.push(6, 7, 8, 9);
      } else {
        placementArr.push(coordPoint - 1, coordPoint, coordPoint + 1, coordPoint + 2);
      }
    } else if (shipLength === 3) {
      if (coordPoint < 1) {
        placementArr.push(0, 1, 2);
      } else if (coordPoint > 8) {
        placementArr.push(7, 8, 9);
      } else {
        placementArr.push(coordPoint - 1, coordPoint, coordPoint + 1);
      }
    } else if (shipLength === 2) {
      if (coordPoint > 8) {
        placementArr.push(8, 9);
      } else {
        placementArr.push(coordPoint, coordPoint + 1);
      }
    }

    return placementArr;
  }
}
