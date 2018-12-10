
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
    document.getElementById('Xname').innerText = gameDisplay.player1;
    document.getElementById('Oname').innerText = gameDisplay.player2;
  },

  showMark: function (e) {
    e.target.innerText = gameState.isXsTurn ? 'X' : 'O';
  },

  showWinner: function (xo, player) {
    if (player) {
      document.getElementById('headline').innerText = player + ' is the winner!\n';
      document.getElementById(xo + 'wins').innerText++;
    } else {
      document.getElementById('headline').innerText = 'X and O have tied.\n';
    }
  },

  updateTurn: function () {
    document.getElementById('headline').innerText = 'The game is on!\nIt\'s '
      + (gameState.isXsTurn ? gameDisplay.player1 : gameDisplay.player2) + '\'s turn.';
  },

  clearBoard: function () {
    for (let square of document.getElementsByClassName('square')) {
      square.innerText = '';
    }
    gameDisplay.updateTurn();
  }
}

const userInput = {
  handleSquareClick: function (e) {
    if (!gameState.isGameOver && !e.target.innerText) {
      gameState.markSquare(e);
      gameState.checkForWinner(e);
    }
  },

  handleReset: function () {
    gameDisplay.clearBoard();
  },

  setListeners: function () {
    for (let square of document.getElementsByClassName('square')) {
      square.addEventListener('click', userInput.handleSquareClick);
    }
    document.getElementById('reset-button').addEventListener('click', userInput.handleReset);
  },

  initialize: function () {
    gameDisplay.player1 = (prompt('Enter player 1\'s name: ') || 'Player 1') + ' (X)';
    gameDisplay.player2 = (prompt('Enter player 2\'s name: ') || 'Player 2') + ' (O)';
    gameDisplay.showPlayerNames();
    userInput.setListeners();
    gameDisplay.updateTurn();
  }
}

setTimeout(userInput.initialize, 100);