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
    switch (this.state.page) {
      case 1:
        return React.createElement(F1, null);
      case 2:
        return React.createElement(F2, null);
      case 3:
        return React.createElement(F3, null);
      default:
        return React.createElement(Home, null);
    }
  }
}

class Home extends React.Component {
  // a Checkout button, which when clicked, takes the user to the first of several forms
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { type: "button" },
        "Checkout"
      )
    );
  }
}

class F1 extends React.Component {
  // F1 collects name, email, and password for account creation.
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(
      "div",
      null,
      "Work in progress. This is F1."
    );
  }
}

class F2 extends React.Component {
  // F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(
      "div",
      null,
      "Work in progress. This is F2."
    );
  }
}

class F3 extends React.Component {
  // F3 collects credit card #, expiry date, CVV, and billing zip code.
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(
      "div",
      null,
      "Work in progress. This is F3."
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
