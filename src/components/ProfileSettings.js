import React, { Component } from "react";
import SignUp from "./SignUp";

export default class ProfileSettings extends Component {

  render() {
    const currentUser = this.props.currentUser;
    return (
    <div>
    {(currentUser && currentUser != "unlogged") ? (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.name}'s Profile</strong>
          </h3>
        </header>
        <SignUp edit='true'/>
            <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
        <strong>Role:</strong>{" "}
          {currentUser.role}
        </p>
        {currentUser.teacher_id && (
          <p>
          <strong>Teacher:</strong>{" "}
          {currentUser.teacher_id}

        </p>

      )}

      </div>
    ) : (
      <h2>Log in to see this page {currentUser}</h2>
    )}
    </div>
    );
  }
}
