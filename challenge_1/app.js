const gameState = {

  isGameOver: false,
  isXsTurn: true,
  boardSize: 3,
  isRotateOn: false,
  turnsSoFar: 0,

  markSquare: function (e) {
    if (gameState.isGameOver) return;

    let row = parseInt(e.target.classList[1].slice(3));
    let col = parseInt(e.target.classList[2].slice(3));
    if (gameState.board[row][col]) return;

    gameState.board[row][col] = (gameState.isXsTurn ? 'X' : 'O');
    gameDisplay.showBoard(gameState.board);
    gameState.isXsTurn = !gameState.isXsTurn;
    if (gameState.isRotateOn) {
      gameState.board = gameState.rotateBoard(gameState.board);
    }
    gameDisplay.updateTurn();
    gameState.turnsSoFar++;
  },

  rotateBoard: function (board) {
    const newBoard = gameState.makeBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        newBoard[board.length - j - 1][i] = board[i][j];
      }
    }
    return newBoard;
  },

  gravitateBoard: function () {
    const board = gameState.board;
    for (let k = 0; k < board.length - 1; k++) { // repeat so a mark can fall from top to bottom
      for (let i = 0; i < board.length - 1; i++) { // row
        setTimeout(() => {
          for (let j = 0; j < board.length; j++) { // col
            if (board[i][j] && !board[i + 1][j]) { // if square is full and below it is empty
              board[i + 1][j] = board[i][j];
              board[i][j] = '';
              gameDisplay.gravitateSquare(i, j);
              setTimeout(() => {
                gameDisplay.showBoard(board);
                gameDisplay.gravitateSquare(i, j)
              }, 149);
            }
          }
        }, 150 * (i + k * board.length));
      }
    }

  },

  checkBoardForWinOrTie: function (board) {
    let winner = null;
    let rotatedBoard = gameState.rotateBoard(board);
    diags = [[], []];

    for (let i = 0; i < board.length; i++) {
      winner = winner || gameState.checkLineForWinner(board[i]);
      winner = winner || gameState.checkLineForWinner(rotatedBoard[i]);
      diags[0][i] = board[i][i];
      diags[1][i] = rotatedBoard[i][i];
    }
    winner = winner || gameState.checkLineForWinner(diags[0]);
    winner = winner || gameState.checkLineForWinner(diags[1]);

    if (winner) {
      gameState.isGameOver = true;
      gameDisplay.showWinner(winner);
    } else if (gameState.turnsSoFar >= gameState.boardSize ** 2) {
      gameState.isGameOver = true;
      gameDisplay.showWinner(winner);
    }
  },

  checkLineForWinner: function (line) {
    return line.reduce((winner, square) => {
      return winner === square ? square : null;
    });
  },

  makeBoard: function (size = gameState.boardSize) {
    const newBoard = [];
    for (let i = 0; i < size; i++) {
      newBoard.push([]);
      for (let j = 0; j < size; j++) {
        newBoard[i].push('');
      }
    }
    return newBoard;
  }
}


const gameDisplay = {

  player1: '',
  player2: '',

  showPlayerNames: function () {
    document.getElementById('Xname').innerText = gameDisplay.player1;
    document.getElementById('Oname').innerText = gameDisplay.player2;
  },

  showBoard: function (board) {
    let i = 0;
    for (let row of board) {
      for (let square of row) {
        document.getElementById('square' + i).innerText = square;
        i++;
      }
    }
  },

  showWinner: function (xo) {
    if (xo === 'X') player = gameDisplay.player1;
    if (xo === 'O') player = gameDisplay.player2;
    if (xo) {
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
    gameState.board = gameState.makeBoard();
    gameState.isGameOver = false;
    gameState.turnsSoFar = 0;
    gameDisplay.updateTurn();
  },

  rotateBoard: function (toggle) {
    document.getElementById('board').classList.toggle('slowtransform');
    document.getElementById('board').classList.toggle('clockwise');
  },

  rotateSquares: function () {
    let squares = document.getElementsByClassName('square');
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.toggle('slowtransform');
      squares[i].classList.toggle('delaytransform');
      squares[i].classList.toggle('counterclockwise');
    }
  },

  gravitateSquare: function (row, col) {
    document.getElementById('square' + (row * gameState.boardSize + col)).classList.toggle('droplinear');
    document.getElementById('square' + (row * gameState.boardSize + col)).classList.toggle('drop');
  }
}

const userInput = {
  handleSquareClick: function (e) {
    if (!gameState.isGameOver && !e.target.innerText) {
      gameState.markSquare(e);
      gameState.checkBoardForWinOrTie(gameState.board);
      gameDisplay.rotateBoard();
      gameDisplay.rotateSquares();
      setTimeout(() => {
        gameState.board = gameState.rotateBoard(gameState.board);
        gameDisplay.showBoard(gameState.board);
        gameDisplay.rotateBoard();
        gameDisplay.rotateSquares();
      }, 1000);
      setTimeout(() => {
        gameState.gravitateBoard();
      }, 1010);
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
    gameState.board = gameState.makeBoard();
    gameDisplay.player1 = (prompt('Enter player 1\'s name: ') || 'Player 1') + ' (X)';
    gameDisplay.player2 = (prompt('Enter player 2\'s name: ') || 'Player 2') + ' (O)';
    gameDisplay.showPlayerNames();
    userInput.setListeners();
    gameDisplay.updateTurn();
  }
}

setTimeout(userInput.initialize, 100); // asks only after page has loaded