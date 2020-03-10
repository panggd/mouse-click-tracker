import React, { Component } from "react";
// import WebSocket from "ws";

class App extends Component {

  constructor(props) {
    super(props);
  }

  initWS = () => {
    const ws = new WebSocket("ws://localhost:7000/stream");
    ws.onopen = (event) => {
      console.log("Connected to websocket server");
    };
    ws.onmessage = (event) => {
      let payload = event.data;
      payload = JSON.parse(payload);
      payload = payload.value;
      payload = JSON.parse(payload);
      payload.data.forEach((point) => {
        document.getElementById("cursor").style.left = point.x + "px";
        document.getElementById("cursor").style.top = point.y + "px";
      });

    };
  }

  componentDidMount = () => {
    this.initWS();
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          Mouse Click Tracker - Replicate
        </h1>
        <p className="lead text-center">
          This show the mouse pointer activity
          from the Mouse Click Tracker - Master.
        </p>
      </div>
    );
  }
}

export default App;
