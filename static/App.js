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
        this.props.bug.id
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
      return React.createElement(BugRow, { key: bug.id, bug: bug });
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
      "Add"
    );
  }
});

var bugData = [{ id: 1, priority: "P1", status: "Open", owner: "Ravan", title: "App crashes on open" }, { id: 2, priority: "P2", status: "New", owner: "Eddie", title: "Misaligned border on panel" }];

var BugList = React.createClass({
  displayName: "BugList",

  getInitialState: function getInitialState() {
    return { bugs: bugData };
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
      React.createElement(
        "button",
        { onClick: this.testNewBug },
        "Test"
      ),
      React.createElement("hr", null),
      React.createElement(BugAdd, null)
    );
  },
  testNewBug: function testNewBug() {
    var nextId = this.state.bugs.length + 1;
    this.addBug({ id: nextId, priority: "P2", status: "New", owner: "Yujin", title: "crash" });
  },
  addBug: function addBug(bug) {
    var bugsModified = this.state.bugs.slice();
    bugsModified.push(bug);
    this.setState({ bugs: bugsModified });
  }
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));