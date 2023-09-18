'use strict'

export class Ship {
  length: number;
  hits: number;
  sunk: boolean;
  hitCoords: number[][];
  direction: 'Horizontal' | 'Vertical';
  name: string;
  constructor(length: number, direction: 'Horizontal' | 'Vertical', name: string) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.hitCoords = [];
    this.direction = direction;
    this.name = name;
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

