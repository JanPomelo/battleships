# battleships

BattleShip Game for the Odin Project.

# Classes

## Gameboard

### Properties

> **board**: (Ship | null)[][] - The gameboard

> **ships**: Ship[] - the ships on the gameboard

### Methods

#### allSunk()

> **returns**: true, if all Ships on the board are sunk. Otherwise false

#### placeShip(ship: Ship, direction: 'Horizontal' | 'Vertical', coords: number[])

> places a ship on the gameboard. checks if the space is available before placing a ship by calling the private function

#### receiveAttack(coords: number[])

> receives an attack on the given coordinates on the board. Marks the board either with 'hit' or 'sea'

#### removeShip(ship: Ship)

> removes the Ship from the gameboard

#### \_checkIfSpaceIsFree\*\*

> **returns** an Error if the space is not available, or nothing if the ship can be placed

#### \_checkIfSpaceIsFree(row: number[], col: number[])

> helper function to check if the space where the ship is going to be placed is free or not

> **returns** true, if the space is available OR false, if the space is not available

#### \_createShipPlacementArr(shipLength: number, coordPoint: number)

> helper function to capture all corner cases where the ship can be placed.

> **returns** the array with the points of the row/column where the ship will be placed

## Player

### Properties

> **allKnownPositions**: number[][] - array with all known coordinates

> **gameBoard**: Gameboard - the board of the player

> **name**: string - name of the player

### Methods

#### get board()

> **returns** the gameboard of the player

#### makeMove(coords: number[] | null, player: Player)

> attacks the other players board at the given coordinates. If no coords are given, hits a random point on the board. If a hit is detected, try to hit adjected fields until the ship is sunk
> **returns**: true, if the coordinates are valid and the field can be attacked. Otherwise, false

## Ship

### Properties

> **direction**: 'Horizontal' | 'Vertical' - direction in which the ship should be placed

> **hitCoords**: number[][] - coordinates in which the ship received hits already

> **hits**: number - number of hits the ship received

> **length**: number - length of the ship

> **name**: string - name of the ship

> **sunk**: boolean - indicator if the ship is sunk or not

### Methods

#### hit(row: number, column: number)

> increases the number of hits of the ship, writes the coordinates of the hit into hitCoords and calls the **isSunk** method afterwards

#### isSunk()

> checks if the number of hits is more or equal the length of the ship. If yes, set the sunk property to true.

> **returns** the sunk property

# Functions

## checkEnd(game: Game)

> **returns**: 'lose', if all ships of the player are sunk. 'win', if all ships of the computer are sunk. 'not yet' if there are still floating ships on both sides

## getFirstDir(row: number, column: number, player: Player)

> calculated all possible adjected directions in which a ship can be located after the first hit is detected
> **returns**: an Object with two properties: firstDir which is a string and declares the first direction in which the computer guesses, and dirArr which is an array of all possible directions in which the ship can be located

## placeAllShips(player: Player)

> places all ships of the player on random fields on the board

## positionAlreadyKnown(row: number, column: number, player: Player)

> looks through the allKnownPositions array of the given player to look if the given coords are already inside this array
> **returns**: true, if the coords are already known or false, if the coords are not already known

## startNewGame

> initiates a new game
> **returns**: a game type with two players

# DOM Manipulation Functions

## addOnClickToEnemyBoard(bigDiv: HTMLDivElement)

> adds the onClick event to every single field in the enemy GameBoard so that attacks can be received

## calcShipRowsAndCols(horVer: 'Horizontal' | 'Vertical', row: number, column: number)

> calculates the rows/columns the ship occupies when it is dragged over a coordinate while placing the ship. This function is part of the 'preview' when placing a ship

## changeIntroText()

> changes the introduction text when the player presses play

## checkShips()

> checks if all ships are placed on the board. If yes, initiates the game

## checkSunkStatus(player: Player)

> checks the status of alls boards. Are they sunk or not?

## compare(a: Ship, b: Ship)

> compares two ships regarding their length

## createEndScreen()

> creates the EndScreen when a match is either won or lost

## createGameBoard(player: Player)

> initially creates the gameBoard for the given player

## createGameDiv()

> creates the whole gameDiv in which the playerDivs are located

## createHorVerButton()

> creates the button to place the ships either horizontal or vertical

## createPlayerDiv(player: Player, name: string)

> creates the div for the player which includes the gameboard and the statistics of the ships

## createShipsDiv(player: Player)

> creates the ship overview on the right side of the gameboard

## handleDragEnd()

> handles the dragEnd Event

## handleDragEnter()

> handles the DragEnter Event

## handleDragLeave()

> handles the DragLeave Event

## handleDragOver(e: DragEvent)

> handles the dragOver Event

## handleDragRestart(e: DragEvent)

> handles the DragStart Event after a ship is already placed

## handleDragStart(e: DragEvent)

> handles the dragStart Event

## handleDrop(e: DragEvent)

> handles the Drop Event

## loadBGImg()

> loads the Background image on the pageload

## makeShipsPlaceable(player: Player)

> makes the ships on the right side of the gameboard draggable and placeable on the players board

## printGameBoard(player: Player, div: HTMLDivElement)

> prints the GameBoardDiv to update the changes done after each move

## writeIntroduction()

> writes the first introduction paragraph on pageload
