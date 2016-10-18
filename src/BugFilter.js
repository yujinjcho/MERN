var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
  render: function () {
    return (
      <button onClick={this.submit}>Filter</button>
    )
  },
  submit: function(e){
    this.props.submitHandler({priority:"P1"});
  }
});

module.exports = BugFilter;