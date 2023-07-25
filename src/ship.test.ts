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
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true);
  })

/*  test("capitalize first letter", () => {
    expect(capitalize("hallo")).toBe("Hallo");
  });
*/
});