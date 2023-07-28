import './style.css';
import { createPlayerDiv } from './pageLoad';
const gameDiv = document.querySelector("#gameDiv");

gameDiv.appendChild(createPlayerDiv('player'));

gameDiv.appendChild(createPlayerDiv('computer'));
