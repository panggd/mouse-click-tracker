import React, { Component } from "react";
import axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.queue = [];
  }

  mouseMoveHandler = (e) => {
    e = e || window.event;

    let pageX = e.pageX;
    let pageY = e.pageY;

    // IE 8
    if (pageX === undefined) {
      pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    axios({
      method: 'POST',
      url: 'http://localhost:7000/publish',
      data: {
        data: [{
          x: pageX,
          y: pageY,
          timestamp: + new Date()
        }]
      }
    });
  }

  componentDidMount = () => {
    if (document.attachEvent) {
      document.attachEvent("mousemove", this.mouseMoveHandler);
    } else {
      document.addEventListener("mousemove", this.mouseMoveHandler);
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          Mouse Click Tracker - Master
        </h1>
        <p className="lead text-center">
          This capture the mouse pointer activity and
          publish to Mouse Click Tracker - Replicate.
        </p>
      </div>
    );
  }
}

export default App;
