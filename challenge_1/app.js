
let game = true;
let player1 = true;

const handleCellClick = (e) => {
  if (!game) return;
  if (e.target.innerText) return;

  e.target.innerText = player1 ? 'X' : 'O';
  player1 = !player1;
  document.getElementById('winner-area').innerText = 'The game is on!\nIt\'s '
    + (player1 ? 'X' : 'O') + '\'s turn.';

  let winLine;
  for (let cellClass of e.target.classList) {
    winLine = [];
    for (let cell of document.getElementsByClassName(cellClass)) {
      winLine.push(cell.innerText || null);
    }
    if (winLine.every(s => s === 'X')) {
      setWinner('X');
    }
    else if (winLine.every(s => s === 'O')) {
      setWinner('O');
    }
    else if (cellClass === 'cell' && winLine.every(s => s)) {
      setWinner(null);
    }
  }
}

const setWinner = (outcome) => {
  game = false;
  if (outcome) {
    document.getElementById('winner-area').innerText = outcome + ' is the winner!\n';
    document.getElementById(outcome + 'wins').innerText++;
  } else {
    document.getElementById('winner-area').innerText = 'X and O have tied.\n';
  }
}

const handleReset = () => {
  game = true;
  for (let cell of document.getElementsByClassName('cell')) {
    cell.innerText = '';
  }
  document.getElementById('winner-area').innerText = 'The game is on!\nIt\'s '
    + (player1 ? 'X' : 'O') + '\'s turn.';
}



const cells = document.getElementsByClassName('cell');

for (let cell of cells) {
  cell.addEventListener('click', handleCellClick);
}

document.getElementById('reset-button').addEventListener('click', handleReset);

const setPlayerNames = () => {
  let Xname = prompt('Enter player 1\'s name: ');;
  let Oname = prompt('Enter player 2\'s name: ');;
  document.getElementById('Xname').innerText = Xname;
  document.getElementById('Oname').innerText = Oname;
}

setPlayerNames();