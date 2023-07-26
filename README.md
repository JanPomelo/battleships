# battleships

BattleShip Game for the Odin Project

# Classes

## Ship

### Properties

**length**: number - length of the ship

**hits**: number - number of hits the ship received

**sunk**: boolean - indicator if the ship is sunk or not

### Methods

#### hit()

increases the number of hits of the ship and calls the **isSunk** method afterwards

#### isSunk()

checks if the number of hits is more or equal the length of the ship. If yes, set the sunk property to true.

**returns** the sunk property


