'use strict'

export class Ship {
  length: number;
  hits: number;
  sunk: boolean;
  constructor(length: number) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  
}