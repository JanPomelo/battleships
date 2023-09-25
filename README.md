# battleships

BattleShip Game for the Odin Project

# Classes

## Ship

### Properties

> **length**: number - length of the ship

> **hits**: number - number of hits the ship received

> **sunk**: boolean - indicator if the ship is sunk or not

> **hitCoords**: number[][] - coordinates in which the ship received hits already

> **direction**: 'Horizontal' | 'Vertical' - direction in which the ship should be placed

> **name**: string - name of the ship


### Methods

#### hit(row: number, column: number)

> increases the number of hits of the ship, writes the coordinates of the hit into hitCoords and calls the **isSunk** method afterwards

#### isSunk()

> checks if the number of hits is more or equal the length of the ship. If yes, set the sunk property to true.

> **returns** the sunk property

## Gameboard

### Properties

> **board**: (Ship | null)[][] - The gameboard
> **ships**: Ship[] - the ships on the gameboard
### Methods

#### placeShip(ship: Ship, direction: 'Horizontal' | 'Vertical', coords: number[])

> places a ship on the gameboard. checks if the space is available before placing a ship by calling the private function 

#### removeShip(ship: Ship)

> removes the Ship from the gameboard

#### receiveAttack(coords: number[])

> receives an attack on the given coordinates on the board. Marks the board either with 'hit' or 'sea'

#### allSunk() 

> **returns**: true, if all Ships on the board are sunk. Otherwise false

#### \_checkIfSpaceIsFree**

> **returns** an Error if the space is not available, or nothing if the ship can be placed

#### \_checkIfSpaceIsFree(row: number[], col: number[])

> helper function to check if the space where the ship is going to be placed is free or not

> **returns** true, if the space is available OR false, if the space is not available

#### \_createShipPlacementArr(shipLength: number, coordPoint: number)

> helper function to capture all corner cases where the ship can be placed.

> **returns** the array with the points of the row/column where the ship will be placed

## Player

### Properties

> **name**: string - name of the player
> **gameBoard**: Gameboard - the board of the player

### Methods

#### get board() 

> **returns** the gameboard of the player

#### makeMove(coords: number[] | null, player: Player)

> attacks the other players board at the given coordinates
> **returns**: true, if the coordinates are valid and the field can be attacked. Otherwise, false

# Functions

## startNewGame

> initiates a new game
> **returns**: a game type with two players

## placeAllShips(player: Player)

> places all ships of the player on random fields on the board

## checkEnd(game: Game) 

> **returns**: 'lose', if all ships of the player are sunk. 'win', if all ships of the computer are sunk. 'not yet' if there are still floating ships on both sides
