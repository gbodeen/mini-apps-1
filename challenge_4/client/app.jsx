import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
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
        <DropArea dropPiece={this.dropPiece} />
        <Board board={this.state.board} />
      </>
    )
  }
}

const InfoArea = ({ message }) => (
  <div>This will be the info display area.</div>
)

const DropArea = ({ dropPiece }) => (
  <Row row={[0, 1, 2, 3, 4, 5, 6]} />
)

const Board = ({ board }) => (
  <div className="board">
    {board.map(row => {
      return <Row row={row} key={Math.random()} />
    })}
  </div>
)

const Row = ({ row }) => (
  <div className="row">
    {row.map(square => {
      return <Square color='blank' key={Math.random()} />;
    })}
  </div>
)

const Square = ({ color }) => (
  <div className='square'><div className={color}></div></div>
)

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
