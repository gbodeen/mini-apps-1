// import React from 'react';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      name: '',
      email: '',
      password: ''
    }

    this.nextPage = this.nextPage.bind(this);
    this.setAppState = this.setAppState.bind(this);
  }

  nextPage() {
    this.setState({
      page: this.state.page + 1
    })
  }

  setAppState(state) {
    this.setState(state);
  }

  render() {
    switch (this.state.page) {
      case (1):
        return <F1 nextPage={this.nextPage} setAppState={this.setAppState} />;
      case (2):
        return <F2 nextPage={this.nextPage} setAppState={this.setAppState} />;
      case (3):
        return <F3 nextPage={this.nextPage} setAppState={this.setAppState} />;
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
    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleInput(e) {
    const state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  }

  handleNext() {
    this.props.setAppState(this.state);
    this.props.nextPage();
  }

  render() {
    let { name, email, password } = this.state;

    return (
      <form>
        Name: <input type="text" id="name" onChange={this.handleInput} value={name} />
        Email: <input type="text" id="email" onChange={this.handleInput} value={email} />
        Password: <input type="text" id="password" onChange={this.handleInput} value={password} />
        <button type="button" id="next" onClick={this.handleNext}>Next Page</button>
      </form>
    )
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
