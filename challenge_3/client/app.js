// import React from 'react';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  render() {
    return React.createElement(
      'div',
      null,
      'Now there\'s React with state and props!'
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
