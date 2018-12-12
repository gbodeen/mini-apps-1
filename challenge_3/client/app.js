const React = require('react');
const ReactDOM = require('react-dom');

const App = () => React.createElement(
  'div',
  null,
  'Now there\'s React!'
);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
