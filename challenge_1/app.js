
const gameState = {

  isGameOver: false,
  isXsTurn: true,
  player1: '',
  player2: '',

  toggleSquare: function (e) {
    e.target.innerText = gameState.isXsTurn ? 'X' : 'O';
    gameState.isXsTurn = !gameState.isXsTurn;
    document.getElementById('winner-area').innerText = 'The game is on!\nIt\'s '
      + (gameState.isXsTurn ? 'X' : 'O') + '\'s turn.';
  },

  checkForWinner: function (e) {
    let winLine;
    for (let squareClass of e.target.classList) {
      winLine = [];
      for (let square of document.getElementsByClassName(squareClass)) {
        winLine.push(square.innerText || null);
      }
      if (winLine.every(s => s === 'X')) {
        setWinner('X');
      }
      else if (winLine.every(s => s === 'O')) {
        setWinner('O');
      }
      else if (squareClass === 'square' && winLine.every(s => s)) {
        setWinner(null);
      }
    }
  }
}

const handleSquareClick = (e) => {
  if (!gameState.isGameOver && !e.target.innerText) {
    gameState.toggleSquare(e);
    gameState.checkForWinner(e);
  }
}

const setWinner = (outcome) => {
  gameState.isGaveOver = true;
  if (outcome) {
    document.getElementById('winner-area').innerText = outcome + ' is the winner!\n';
    document.getElementById(outcome + 'wins').innerText++;
  } else {
    document.getElementById('winner-area').innerText = 'X and O have tied.\n';
  }
}

const handleReset = () => {
  gameState.isGaveOver = false;
  for (let square of document.getElementsByClassName('square')) {
    square.innerText = '';
  }
  document.getElementById('winner-area').innerText = 'The game is on!\nIt\'s '
    + (gameState.isXsTurn ? 'X' : 'O') + '\'s turn.';
}



const squares = document.getElementsByClassName('square');

for (let square of squares) {
  square.addEventListener('click', handleSquareClick);
}

document.getElementById('reset-button').addEventListener('click', handleReset);

const setPlayerNames = () => {
  let Xname = prompt('Enter player 1\'s name: ');;
  let Oname = prompt('Enter player 2\'s name: ');;
  document.getElementById('Xname').innerText = Xname;
  document.getElementById('Oname').innerText = Oname;
  gameState.player1 = Xname;
  gameState.player2 = Oname;
}

setPlayerNames();