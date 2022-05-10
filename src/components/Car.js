import React, { Component } from "react";
import {useParams} from "react-router-dom"

class Car extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
      page: window.location.pathname.split("/").slice(-1)
    };
  }
  changeColor = () => {
    if (this.state.color=="red") {
      this.setState({color: "blue"});
    }
    else {
      this.setState({color: "red"});
    }

  }

  render() {
    //const id = useParams()
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
          Page: {this.state.page}
        </p>
        <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
      </div>
    );
  }
}

export default Car;
