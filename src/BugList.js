var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.bug._id}</td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    )
  }
});

var BugTable = React.createClass({
  render: function () {
    var bugRows = this.props.bugs.map(function(bug){
      return <BugRow key={bug._id} bug={bug} />
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </table>
    )
  }
});

var BugList = React.createClass({
  componentDidMount: function() {
    this.loadData({});
  },
  getInitialState: function(){
    return {bugs: []};
  },
  loadData: function(filter) {
    $.ajax('/api/bugs', {data:filter}).done(function(data){
      this.setState({bugs: data});
    }.bind(this));
  },
  render: function () {
    console.log('Component rendered')
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this.loadData} />
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this.addBug}/>
      </div>
    )
  },
  addBug: function(bug) {
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: function(data) {
        var bug = data;
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error adding bug:", err);
      }
    });
  }
});

module.exports = BugList;