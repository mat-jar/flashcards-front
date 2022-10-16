import React, {useEffect} from "react";

import AuthService from "../services/AuthService";
import { useNavigate} from "react-router-dom";
import { withFormik, Form, Field } from 'formik'



function Login(props) {

  const navigation = useNavigate();
  const { values } = props;

  useEffect(() => {
    if (props.currentUser) {
    const timer = setTimeout(() => {
      navigation("/dashboard");
    }, 1000);
      return () => clearTimeout(timer);
    }

  });


    return (
      <>

      <div className="row justify-content-md-center">
      <div className="col-xl p-2">
        <div className="card card-container p-2 my-3">
          <Form>
          {!values.successful && (
            <div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="text" name="email" className={"form-control"} placeholder="Email" />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
                <Field type="password" name="password" className={"form-control"} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary btn-block my-3"
                disabled={values.loading}>
                {values.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Log in</span>
              </button>
            </div>
          )}
            {values.message && (
              <div className="form-group">
                <div
                  className={
                    values.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {values.message}
                  {(() => { if (props.source === "navbar") {
                  const timer = setTimeout(() => {
                    navigation("/dashboard");
                  }, 1000);
                    return () => clearTimeout(timer);
                  }})()}
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
      </div>
      </>
    );
}


function handleLogin(values, formikBag) {
    const props = formikBag.props
    AuthService.login(values.email, values.password).then(
    response => {
    formikBag.setFieldValue('message', response.data.message, false)
    formikBag.setFieldValue('successful', true, false)
    props.setUser();


  },
  error => {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
      formikBag.setFieldValue('message', resMessage, false)
      formikBag.setFieldValue('loading', false, false)
    });
  }




const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || '',
      password: props.password || '',
      successful: false,
      message: '',
      loading: false
    }
  },
  handleSubmit: (values, formikBag) => {
    handleLogin(values, formikBag)
  }
})(Login)

export default LoginFormik
