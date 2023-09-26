import { Ship } from "./ship";

// 1. herausfinden ob schiff horizontal oder vertical

export function isShipHorizontal(): boolean {

  return false;
}

export function isShipVertical(): boolean {

  return false;
}

export function calcAllPossMoves(row: number, column: number, dir: string): number[][] {
  let possMoves: number[][] = [];
  if (dir === "vh") {
    if (row > 0 && row < 9 && column > 0 && column < 9) {
      possMoves.push([row - 1, column]);
      possMoves.push([row + 1, column]);
      possMoves.push([row, column - 1]);
      possMoves.push([row, column + 1]);
    } else if (row === 0) {
      possMoves.push([row + 1, column]);
      if (column === 0) {
        possMoves.push([row, column + 1]);
      } else if (column === 9) {
        possMoves.push([row, column - 1]);
      } else {
        possMoves.push([row, column - 1]);
        possMoves.push([row, column + 1]);
      }
    } else if (row === 9) {
      possMoves.push([row + - 1, column]);
      if (column === 0) {
        possMoves.push([row, column + 1]);
      } else if (column === 9) {
        possMoves.push([row, column - 1]);
      } else {
        possMoves.push([row, column - 1]);
        possMoves.push([row, column + 1]);
      }
    }
    else if (column === 0) {
      possMoves.push([row, column + 1]);
      if (row === 0) {
        possMoves.push([row + 1, column]);
      } else if (row === 9) {
        possMoves.push([row - 1, column]);
      } else {
        possMoves.push([row + 1, column]);
        possMoves.push([row - 1, column]);
      }
    } else if (column === 9) {
      possMoves.push([row, column - 1]);
      if (row === 0) {
        possMoves.push([row + 1, column]);
      } else if (row === 9) {
        possMoves.push([row - 1, column]);
      } else {
        possMoves.push([row + 1, column]);
        possMoves.push([row - 1, column]);
      }
    }
  } else if (dir === 'h') {
    if (column === 0) {
      possMoves.push([row, column + 1]);
    } else if (column === 9) {
      possMoves.push([row, column - 1]);
    } else {
      possMoves.push([row, column - 1]);
      possMoves.push([row, column + 1]);
    }
  } else if (dir === 'v') {
    if (row === 0) {
      possMoves.push([row + 1, column]);
    } else if (row === 9) {
      possMoves.push([row - 1, column]);
    } else {
      possMoves.push([row - 1, column]);
      possMoves.push([row + 1, column]);
    }
  } else if (dir === 't') {
    if (row !== 0) {
      possMoves.push([row - 1, column]);
    }
  } else if (dir === 'b') {
    if (row !== 9) {
      possMoves.push([row + 1, column]);
    }
  } else if (dir === 'l') {
    if (column !== 0) {
      possMoves.push([row, column - 1]);
    }
  } else if (dir === 'r') {
    if (column !== 9) {
      possMoves.push([row, column + 1]);
    }
  }
  return possMoves;
}
