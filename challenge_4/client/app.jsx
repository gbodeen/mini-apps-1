import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      p1turn: true,
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

  dropPiece() {
    console.log('This should drop a piece.')
  }

  render() {
    return (
      <>
        <InfoArea message={this.state.message} />
        <DropArea turn={this.state.p1turn} dropPiece={this.dropPiece} />
        <Board board={this.state.board} />
      </>
    )
  }
}

const InfoArea = ({ message }) => (
  <div className='message'>This will be the info display area.</div>
)

const DropArea = ({ turn, dropPiece }) => (
  <div className="droparea"><Row color='blank' turn={turn} row={[0, 1, 2, 3, 4, 5, 6]} /></div>
)

const Board = ({ board }) => (
  <div className="board">
    {board.map(row => {
      return <Row row={row} key={Math.random()} turn='' />
    })}
  </div>
)

const Row = ({ row, turn }) => (
  <div className="row">
    {row.map(square => {
      return <Square color='blank' key={Math.random()} turn={turn} />;
    })}
  </div>
)

const Square = ({ color, turn }) => (
  <div className='square'><div className={color + ' ' + (turn ? 'drop-red' : 'drop-yellow')}></div></div>
)

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
