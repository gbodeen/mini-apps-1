// import React from 'react';
// import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      name: '',
      email: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: null,
      phone: '',
      cc: null,
      expiry: '',
      cvv: null,
      billzip: null
    }

    this.nextPage = this.nextPage.bind(this);
    this.setAppState = this.setAppState.bind(this);
  }

  nextPage() {
    this.setState({
      page: (this.state.page + 1) % 5
    })
  }

  setAppState(state) {
    this.setState(state);
  }

  render() {
    switch (this.state.page) {
      case (0):
        return <Home nextPage={this.nextPage} />;
      case (1):
        return <F1 nextPage={this.nextPage} setAppState={this.setAppState} />;
      case (2):
        return <F2 nextPage={this.nextPage} setAppState={this.setAppState} />;
      case (3):
        return <F3 nextPage={this.nextPage} setAppState={this.setAppState} />;
      case (4):
        return <Confirm nextPage={this.nextPage} state={this.state} />
      default:
        return <Home nextPage={this.nextPage} />;
    }
  }
}

const Home = ({ nextPage }) => (
  // a Checkout button, which when clicked, takes the user to the first of several forms
  <div><button type="button" onClick={nextPage}>Checkout</button></div>
)

const Confirm = ({ state, nextPage }) => (
  // a confirmation page which summarizes the data collected in the prior three steps. 
  // This page contains a Purchase button that completes the purchase. When the purchase 
  // is complete, the user is returned to the homepage.
  <div>
    Thanks for your order!  Please confirm these details: <br />
    Name: {state.name} <br />
    Email: {state.email} <br />
    Password: {state.password.split('').map(c => '•').join('')} <br />
    Address (line 1): {state.address1} <br />
    Address (line 2): {state.address2} <br />
    City: {state.city} <br />
    State: {state.state} <br />
    ZIP code: {state.zip} <br />
    Phone number: {state.phone} <br />
    Credit card number: {state.cc.slice(0, -4).split('').map(c => '•').join('') + state.cc.slice(-4)} <br />
    Expiration date: {state.expiry} <br />
    CVV: {state.cvv} <br />
    Billing ZIP code: {state.billzip} <br />
    <button type="button" onClick={nextPage}>Confirm purchase</button>
  </div>
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
        Name: <input type="text" id="name" onChange={this.handleInput} value={name} /><br />
        Email: <input type="text" id="email" onChange={this.handleInput} value={email} /><br />
        Password: <input type="password" id="password" onChange={this.handleInput} value={password} /><br />
        <button type="button" id="next" onClick={this.handleNext}>Next Page</button>
      </form>
    )
  }
}

class F2 extends React.Component {
  // F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
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
    let { address1, address2, city, state, zip, phone } = this.state;

    return (
      <form>
        Address (line 1): <input type="text" id="address1" onChange={this.handleInput} value={address1} /><br />
        Address (line 2): <input type="text" id="address2" onChange={this.handleInput} value={address2} /><br />
        City: <input type="text" id="city" onChange={this.handleInput} value={city} /><br />
        State: <input type="text" id="state" onChange={this.handleInput} value={state} /><br />
        ZIP code: <input type="text" id="zip" onChange={this.handleInput} value={zip} /><br />
        Phone number: <input type="text" id="phone" onChange={this.handleInput} value={phone} /><br />
        <button type="button" id="next" onClick={this.handleNext}>Next Page</button>
      </form>
    );
  }
}

class F3 extends React.Component {
  // F3 collects credit card #, expiry date, CVV, and billing zip code.
  constructor(props) {
    super(props);
    this.state = {
      cc: '',
      expiry: '',
      cvv: '',
      billzip: ''
    }

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
    let { cc, expiry, cvv, billzip } = this.state;

    return (
      <form>
        Credit card number: <input type="text" id="cc" onChange={this.handleInput} value={cc} /><br />
        Expiration date: <input type="text" id="expiry" onChange={this.handleInput} value={expiry} /><br />
        CVV: <input type="text" id="cvv" onChange={this.handleInput} value={cvv} /><br />
        Billing ZIP code: <input type="text" id="billzip" onChange={this.handleInput} value={billzip} /><br />
        <button type="button" id="next" onClick={this.handleNext}>Next Page</button>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
