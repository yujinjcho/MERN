
var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./BugList')
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var NoMatch = React.createClass({
  render: function(){
    return (
      <h2>No match for the route</h2>
    );
  }
});


ReactDOM.render(
  (
    <Router>
      <Route path="/bugs" component={BugList} />
      <Redirect from="/" to="/bugs" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);
