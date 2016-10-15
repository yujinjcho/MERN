"use strict";

var BugRow = React.createClass({
  displayName: "BugRow",

  render: function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        this.props.bug._id
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.status
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.priority
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.owner
      ),
      React.createElement(
        "td",
        null,
        this.props.bug.title
      )
    );
  }
});

var BugFilter = React.createClass({
  displayName: "BugFilter",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Filter "
    );
  }
});

var BugTable = React.createClass({
  displayName: "BugTable",

  render: function render() {
    var bugRows = this.props.bugs.map(function (bug) {
      return React.createElement(BugRow, { key: bug._id, bug: bug });
    });

    return React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Id"
          ),
          React.createElement(
            "th",
            null,
            "Status"
          ),
          React.createElement(
            "th",
            null,
            "Priority"
          ),
          React.createElement(
            "th",
            null,
            "Owner"
          ),
          React.createElement(
            "th",
            null,
            "Title"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        bugRows
      )
    );
  }
});

var BugAdd = React.createClass({
  displayName: "BugAdd",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { name: "bugAdd" },
        React.createElement("input", { type: "text", name: "owner", placeholder: "Owner" }),
        React.createElement("input", { type: "text", name: "title", placeholder: "Title" }),
        React.createElement(
          "button",
          { onClick: this.handleSubmit },
          "Add Bug"
        )
      )
    );
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({ owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1' });
    form.owner.value = "";
    form.title.value = "";
  }
});

var BugList = React.createClass({
  displayName: "BugList",

  componentDidMount: function componentDidMount() {
    $.ajax('/api/bugs').done((function (data) {
      this.setState({ bugs: data });
    }).bind(this));
  },
  getInitialState: function getInitialState() {
    return { bugs: [] };
  },
  render: function render() {
    console.log('Component rendered');
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Bug Tracker"
      ),
      React.createElement(BugFilter, null),
      React.createElement("hr", null),
      React.createElement(BugTable, { bugs: this.state.bugs }),
      React.createElement("hr", null),
      React.createElement(BugAdd, { addBug: this.addBug })
    );
  },
  addBug: function addBug(bug) {
    $.ajax({
      type: 'POST', url: '/api/bugs', contentType: 'application/json',
      data: JSON.stringify(bug),
      success: (function (data) {
        var bug = data;
        var bugsModified = this.state.bugs.concat(bug);
        this.setState({ bugs: bugsModified });
      }).bind(this),
      error: function error(xhr, status, err) {
        console.log("Error adding bug:", err);
      }
    });
  }
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));