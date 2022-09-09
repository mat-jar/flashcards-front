import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/AuthService";
import { useNavigate} from "react-router-dom";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeRole= this.onChangeRole.bind(this);
    this.onChangeTeacherToken = this.onChangeTeacherToken.bind(this);
    this.onChangeIfToken = this.onChangeIfToken.bind(this);

    this.state = {
      email: "",
      password: "",
      user_name: "",
      role: "student",
      if_token: "no",
      teacher_token: "",
      successful: false,
      message: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeUserName(e) {
    this.setState({
      user_name: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  onChangeTeacherToken(e) {
    this.setState({
      teacher_token: e.target.value
    });
  }

  onChangeIfToken(e) {
    this.setState({
      if_token: e.target.value
    });
  }


  handleRegister(e) {
    const {navigation} = this.props;
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(this.state.email, this.state.password, this.state.user_name, this.state.role, this.state.teacher_token).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          const timer = setTimeout(() => {
            navigation("/login")
          }, 1000);
          return () => clearTimeout(timer);
          ;
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }
  render() {
    return (
      <div className="row justify-content-md-center">
      <div className="col-xl p-2">
        <div className="card card-container p-2 my-3">

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user_name">Your name: (not required)</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="user_name"
                    value={this.state.user_name}
                    onChange={this.onChangeUserName}
                  />
                </div>

                <div className="form-group">
                  <legend className="display-9">Who are you?</legend>
                  <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" id="student" name="role"
                  value="student" onChange={this.onChangeRole} checked={this.state.role === "student"}/>
                  <label htmlFor="student" className="form-check-label">a student</label>
                  </div>
                  <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" id="teacher" name="role"
                  value="teacher" onChange={this.onChangeRole} checked={this.state.role === "teacher"}/>
                  <label htmlFor="teacher" className="form-check-label">a teacher</label>
                  </div>
                </div>

                {this.state.role === "student" && (
                <>
                <div className="form-group">
                  <legend className="display-9">Were you invited by your teacher?</legend>
                  <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" id="yes" name="if_token"
                  value="yes" onChange={this.onChangeIfToken} checked={this.state.if_token === "yes"}/>
                  <label htmlFor="student" className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" id="no" name="if_token"
                  value="no" onChange={this.onChangeIfToken} checked={this.state.if_token === "no"}/>
                  <label htmlFor="teacher" className="form-check-label">No</label>
                  </div>
                </div>

                {this.state.if_token === "yes" && (

                <div className="form-group">
                  <label htmlFor="password">Token from your teacher:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="teacher_token"
                    value={this.state.teacher_token}
                    onChange={this.onChangeTeacherToken}
                  />
                </div>
              )}
                </>
              )}
                <div className="form-group">
                  <button className="btn btn-primary btn-block my-3">Sign up</button>
                </div>
              </div>
            )}
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    </div>
    );
  }
}
export default function SignInWrapper(props) {
  const navigation = useNavigate();

  return <SignUp {...props} navigation={navigation} />;
}
