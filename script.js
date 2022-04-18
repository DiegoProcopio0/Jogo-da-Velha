const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winnerMessageTextElemnt = document.querySelector(
  "[data-winning-message-text]"
);
const winnerMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.addEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  isCircleTurn = false;

  setBoardHoverClass();

  winnerMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winnerMessageTextElemnt.textContent = "Empate!";
  } else {
    winnerMessageTextElemnt.textContent = isCircleTurn
      ? "O Venceu!"
      : "X venceu!";
  }
  winnerMessage.classList.add("show-winning-message");
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combanation) => {
    return combanation.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("circle") || cell.classList.contains("x");
  });
};

const handleClick = (e) => {
  // Colocar a marca de (X or CIcle)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);
  // Verificar por Vitoria

  // Verificar por Empate
  const isDraw = checkForDraw();

  const isWin = checkForWin(classToAdd);
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar o símbolo
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
