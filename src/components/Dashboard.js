import React, {useState} from "react";
import { useNavigate} from "react-router-dom";
import {displayCorners} from '../Utils'
import axios from "axios";
import authHeader from '../services/authHeader';

const API_URL = process.env.REACT_APP_API_URL + '/api/v1';


export default function Dashboard(props) {

  const currentUser = props.currentUser;
  const [lastToken, setLastToken] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [dashboardMode, setDashboardMode] = useState('welcome');


  function generateToken(e) {
    e.preventDefault();
    return axios
    .post(API_URL + "/teacher_tokens", {}, { headers: authHeader() })
    .then(response => {
      setLastToken(response.data);
      return response;
      },
      error => {
        setResponseMessage(error.response.data.message);
      return error;
      });
  }

  const navigation = useNavigate();

  return(
  <>
  {(currentUser && currentUser != "unlogged")  ? (

  <div className="row">
  <div className={"col-md-6 bg-primary p-4 " + displayCorners("left")}>
  {currentUser.role === "student" ? (
    <div>
    <p className="display-9 text-center my-4">Student Dashboard</p>
    <div>
    <button className="btn btn-secondary btn-block my-3"
    onClick={(e) => {
      e.preventDefault();
      navigation("/flashcard_sets/new");
      }}
      >Create new set</button>
      </div>
    </div>
  ) : (
    <div>
    <p className="display-9 text-center my-4">Teacher Dashboard</p>
    <div>
    <button className="btn btn-secondary btn-block my-3"
    onClick={generateToken}
    >Generate Token</button>
    {lastToken && (
    <div>
    Your last token: {lastToken}
    </div>
    )}
    {responseMessage && (
    <div>
    Message: {responseMessage}
    </div>
    )}
    </div>
    </div>
)}
  </div>
  <div className={"col-md-6 bg-secondary p-4 " + displayCorners("right")}>
    {dashboardMode === "welcome" && (
    <div className="row h-100 flex-column">

    <p className="display-9 text-center my-4">Practise recently studied sets...</p>
      <div className="col-md-6 mw-100 bg-danger">Recently studied</div>
      <p className="display-9 text-center my-4">...or check out other exercices</p>
      <div className="col-md-6 mw-100">
      <button className="btn btn-primary btn-block my-3"
      onClick={(e) => {
        e.preventDefault();
        navigation("/exercices");
        }}
      >Exercices</button>
      </div>

    </div>
    )}

    {dashboardMode === "create_new_set" && (
    <div className="row h-100 flex-column">

    <p className="display-9 text-center my-4">Practise recently studied sets...</p>
      <div className="col-md-6 mw-100 bg-danger">Recently studied</div>
      <p className="display-9 text-center my-4">...or check out other exercices</p>

    </div>
    )}
    </div>
    </div>

  ) : (
    <div className="row">
    <div className={"col-md-6 bg-primary p-4 " + displayCorners("left")}>
    </div>
    <div className={"col-md-6 bg-secondary p-4 " + displayCorners("right")}>

    <div className="row h-100 flex-column">
    <p className="display-9 text-center my-4">Log in to see the dashboard</p>
    </div>
    </div>
    </div>

  )
  }
  </>
  );
}
