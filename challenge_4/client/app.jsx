import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: `It's player 1's turn.`,
      winner: 0,
      p2turn: false,
      board: []
    };

    this.dropPiece = this.dropPiece.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setWinner = this.setWinner.bind(this);
  }

  componentDidMount() {
    const board = [];
    for (let row = 0; row < 6; row++) {
      board.push([]);
      for (let col = 0; col < 7; col++) {
        board[row].push(0);
      }
    }
    this.setState({ board });
  }

  dropPiece(e) {
    const board = JSON.parse(JSON.stringify(this.state.board));
    const col = e.target.id.replace('slot', '');
    for (let row = board.length - 1; row >= 0; row--) {
      if (!this.state.winner && !board[row][col]) {
        board[row][col] = 1 + this.state.p2turn;
        this.setState({
          'board': board,
          'p2turn': !this.state.p2turn,
          'message': `It's player ${this.state.p2turn ? 1 : 2}'s turn.`
        }, () => this.checkForWin(this.setWinner));
        return;
      }
    }
  }

  setWinner(winner) {
    this.setState({
      'winner': winner,
      'message': `Player ${winner} (${winner === 1 ? 'Red' : 'Yellow'}) has won!`
    })
  }

  checkForWin(cb) {
    const board = this.state.board;
    let win;
    // checks rows
    for (let row of board) {
      win = this.checkLineFor4(row);
      if (win) cb(win);
    }
    // check cols
    let line;
    for (let i = 0; i < board[0].length; i++) {
      line = [];
      for (let row of board) {
        line.push(row[i]);
      }
      win = this.checkLineFor4(line);
      if (win) cb(win);
    }
    // check Ldiags
    for (let col = 4 - board.length; col < board[0].length - 3; col++) {
      line = [];
      for (let row = 0; row < board.length; row++) {
        if (col + row >= 0 && col + row < board[0].length) {
          line.push(board[row][col + row]);
        }
      }
      win = this.checkLineFor4(line);
      if (win) cb(win);
    }
    // check Rdiags
    for (let col = 3; col < 2 + board[0].length; col++) {
      line = [];
      for (let row = 0; row < board.length; row++) {
        if (col - row >= 0 && col - row < board[0].length) {
          line.push(board[row][col - row]);
        }
      }
      win = this.checkLineFor4(line);
      if (win) cb(win);
    }
  }

  checkLineFor4(line) {
    let ones = 0;
    let twos = 0;
    for (let i = 1; i < line.length; i++) {
      if (line[i] === line[i - 1]) {
        if (line[i] === 1) {
          ones++;
          twos = 0;
          if (ones === 3) return 1;
        } else if (line[i] === 2) {
          twos++;
          ones = 0;
          if (twos === 3) return 2;
        } else {
          ones = 0;
          twos = 0;
        }
      }
    }
    return 0;
  }

  render() {
    return (
      <>
        <InfoArea message={this.state.message} />
        <DropArea turn={this.state.p2turn} dropPiece={this.dropPiece} />
        <Board board={this.state.board} />
      </>
    )
  }
}

const InfoArea = ({ message }) => (
  <div className='message'>{message}</div>
)

const DropArea = ({ turn, dropPiece }) => (
  <div className="droparea"><Row color='blank' turn={turn} row={[0, 1, 2, 3, 4, 5, 6]} click={dropPiece} /></div>
)

const Board = ({ board }) => (
  <div className="board">
    {board.map((row, idx) => {
      return <div className="row" key={'row' + idx}><Row row={row} key={Math.random()} turn='' click={() => { }} /></div>;
    })}
  </div>
)

const Row = ({ row, turn, click }) => (
  <>
    {row.map((square, idx) => {
      return <div className='square' key={'square' + idx}><Square idx={idx} color={['blank', 'red', 'yellow'][square] || 'blank'} key={Math.random()} turn={turn} click={click} /></div>;
    })}
  </>
)

const Square = ({ color, turn, click, idx }) => (
  <div id={'slot' + idx} className={color + ' ' + (turn ? 'drop-yellow' : 'drop-red')} onClick={click}></div>
)

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
