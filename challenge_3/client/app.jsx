// import React from 'react';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }

    this.nextPage = this.nextPage.bind(this);
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1
    })
  }

  render() {
    switch (this.state.page) {
      case (1):
        return <F1 />;
      case (2):
        return <F2 />;
      case (3):
        return <F3 />;
      default:
        return <Home nextPage={this.nextPage} />;
    }
  }
}

const Home = ({ nextPage }) => (
  // a Checkout button, which when clicked, takes the user to the first of several forms
  <div><button type="button" onClick={nextPage}>Checkout</button></div>
)

class F1 extends React.Component {
  // F1 collects name, email, and password for account creation.
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Work in progress. This is F1.</div>;
  }
}

class F2 extends React.Component {
  // F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Work in progress. This is F2.</div>;
  }
}

class F3 extends React.Component {
  // F3 collects credit card #, expiry date, CVV, and billing zip code.
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Work in progress. This is F3.</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
