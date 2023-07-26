# battleships

BattleShip Game for the Odin Project

# Classes

## Ship

### Properties

> **length**: number - length of the ship

> **hits**: number - number of hits the ship received

> **sunk**: boolean - indicator if the ship is sunk or not

### Methods

#### hit()

> increases the number of hits of the ship and calls the **isSunk** method afterwards

#### isSunk()

> checks if the number of hits is more or equal the length of the ship. If yes, set the sunk property to true.

> **returns** the sunk property

## Gameboard

### Properties

> **board**: (Ship | null)[][]

### Methods

#### placeShip(ship: Ship, direction: 'Horizontal' | 'Vertical', coords: number[])

> places a ship on the gameboard. checks if the space is available before placing a ship by calling the private function **\_checkIfSpaceIsFree**

> **returns** an Error if the space is not available, or nothing if the ship can be placed

#### \_checkIfSpaceIsFree(row: number[], col: number[])

> helper function to check if the space where the ship is going to be placed is free or not

> **returns** true, if the space is available OR false, if the space is not available

#### \_createShipPlacementArr(shipLength: number, coordPoint: number)

> helper function to capture all corner cases where the ship can be placed.

> **returns** the array with the points of the row/column where the ship will be placed
