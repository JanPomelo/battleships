'use strict'

export class Ship {
  length: number;
  hits: number;
  sunk: boolean;
  hitCoords: number[][];
  constructor(length: number) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.hitCoords = [];
  }
  hit(i: number, j: number) {
    this.hitCoords.push([i,j])
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
    }
    return this.sunk;
  }
}

