import "./style.css";
import { createPlayerDiv } from "./pageLoad";
import { startNewGame } from "./game";
const gameDiv = document.querySelector("#gameDiv");
const game = startNewGame();
gameDiv.appendChild(createPlayerDiv("player", game.player, game));

gameDiv.appendChild(createPlayerDiv("computer", game.computer, game));
