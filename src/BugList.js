var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var withRouter = require('react-router').withRouter;
var Link = require('react-router').Link;

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>
          <Link to={"/bugs/"+this.props.bug._id}>{this.props.bug._id}</Link>
        </td>
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
    this.loadData();
  },
  getInitialState: function(){
    return {bugs: []};
  },
  componentDidUpdate: function(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.status === newQuery.status) {
      return;
    } else {
      this.loadData();
    }
  },
  loadData: function() {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, status: query.status};

    $.ajax('/api/bugs', {data:filter}).done(function(data){
      this.setState({bugs: data});
    }.bind(this));
  },
  changeFilter: function(newFilter) {
    this.props.router.push({search: '?' + $.param(newFilter)});

  },
  render: function () {
    console.log('Component rendered')
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this.changeFilter} initFilter={this.props.location.query} />
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

module.exports = withRouter(BugList);