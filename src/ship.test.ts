import { Ship } from "./ship";
const ship = new Ship(3);

describe("Ship Class Test", () => {
  
  test('ship being created', () => {
    expect(ship).toEqual({
      length: 3,
      hits: 0,
      sunk: false
    });
  });
  
  test('ship sinks after hits', () => {
    ship.hit(0,0)
    ship.hit(1,1)
    ship.hit(1,2)
    expect(ship.isSunk()).toBe(true);
  })

});