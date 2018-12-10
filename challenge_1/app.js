
const gameState = {

  isGameOver: false,
  isXsTurn: true,

  markSquare: function (e) {
    gameDisplay.showMark(e);
    gameState.isXsTurn = !gameState.isXsTurn;
    gameDisplay.updateTurn();
  },

  checkForWinner: function (e) {
    let winLine;
    for (let squareClass of e.target.classList) {
      winLine = [];
      for (let square of document.getElementsByClassName(squareClass)) {
        winLine.push(square.innerText || null);
      }
      if (winLine.every(mark => mark === 'X')) {
        gameState.isGaveOver = true;
        gameDisplay.showWinner('X', gameDisplay.player1);
      }
      else if (winLine.every(mark => mark === 'O')) {
        gameState.isGaveOver = true;
        gameDisplay.showWinner('O', gameDisplay.player2);
      }
      else if (squareClass === 'square' && winLine.every(mark => mark)) {
        gameState.isGaveOver = true;
        gameDisplay.showWinner(null);
      }
    }
  }
}

const gameDisplay = {

  player1: '',
  player2: '',

  showPlayerNames: function () {
    gameDisplay.player1 = prompt('Enter player 1\'s name: ');;
    gameDisplay.player2 = prompt('Enter player 2\'s name: ');;
    document.getElementById('Xname').innerText = gameDisplay.player1;
    document.getElementById('Oname').innerText = gameDisplay.player2;
  },

  showMark: function (e) {
    e.target.innerText = gameState.isXsTurn ? 'X' : 'O';
  },

  showWinner: function (xo, player) {
    if (player) {
      document.getElementById('headline').innerText = player + ' (' + xo + ') is the winner!\n';
      document.getElementById(xo + 'wins').innerText++;
    } else {
      document.getElementById('headline').innerText = 'X and O have tied.\n';
    }
  },

  updateTurn: function () {
    document.getElementById('headline').innerText = 'The game is on!\nIt\'s '
      + (gameState.isXsTurn ? 'X' : 'O') + '\'s turn.';
  },

  clearBoard: function () {
    for (let square of document.getElementsByClassName('square')) {
      square.innerText = '';
    }
  }
}

const handleSquareClick = (e) => {
  if (!gameState.isGameOver && !e.target.innerText) {
    gameState.markSquare(e);
    gameState.checkForWinner(e);
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

document.getElementById('reset-button').addEventListener('click', gameDisplay.clearBoard);



gameDisplay.showPlayerNames();