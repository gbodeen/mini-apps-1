import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      p2turn: false,
      board: []
    };

    this.dropPiece = this.dropPiece.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
      if (!board[row][col]) {
        board[row][col] = 1 + this.state.p2turn;
        console.log(this.state.p2turn);
        this.setState({
          'board': board,
          'p2turn': !this.state.p2turn
        });
        return;
      }
    }
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
  <div className='message'>This will be the info display area.</div>
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
