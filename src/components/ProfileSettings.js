import React, { Component } from "react";

export default class ProfileSettings extends Component {
  
  render() {
    const currentUser = this.props.currentUser;
    return (
    <div>
    {currentUser ? (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.name}'s Profile</strong>
          </h3>
        </header>
            <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Role:</strong>{" "}
          {currentUser.role}
      </div>
    ) : (
      <h2>Log in to see this page {currentUser}</h2>
    )}
    </div>
    );
  }
}
