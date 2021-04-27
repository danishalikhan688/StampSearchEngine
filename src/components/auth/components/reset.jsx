import CountryCodes from "./country-codes";
import React, { useState, useContext } from "react";
import { Col, Form, Button, Spinner, Row } from "react-bootstrap"; 
import { firebaseAuth } from "../../../provider/authprovider";
import generateHash from "../../../helpers/hash";
import LoginActions from "../actions/form-actions";
import sendEmail from "../../../helpers/email/email";
import registrationTemplate from "../../../templates/registration";
import { Firestore } from "../../../dao/firebase/firebase-firestore";
import { Auth } from "../../../dao/auth/auth";
import {validate} from "../../../helpers/validation/form-validation"
import Context from "../../../context/Context";
var temp = {};
const ResetPasswordForm = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleChange = (e) => {
    temp[e.target.name] = e.target.value; 
  };
  const { 
    colors
  } = useContext(Context);
  const handleResetPassword = (e) => {
    e.preventDefault();
    if ( validate(temp.email)) {
      console.log("this is temp ", temp, temp.email)
      Auth.resetpassword(temp.email);
      //   Firestore.dataWithCondition("users","email","==",temp.email,function(user){
      // console.log("reset password DATA  db", JSON.stringify(user.data.email));
      //   })
      LoginActions.showAlert(
        "Reset link Has been Sent to your Email",
        setAlertMsg,
        setShowAlert
      );
    } else {
      LoginActions.showAlert("Please  enter Email", setAlertMsg, setShowAlert);
    }
  }; 
  return (
    <div className="auth-body">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {showAlert ? (
          <div
            style={{ backgroundColor: "red", color: "white", width: "100%" }}
            className="alert alert-danger d-flex align-self-center justify-content-center  "
            role="alert"
          >
            <strong>{alertMsg} </strong>
          </div>
        ) : (
          ""
        )}
        <Col md={12}>
          <Form.Group>
            <Form.Control
              required
              type="email"
              name="email"
              onChange={handleChange}
              className="auth-input"
              placeholder="Email"
              isValid
            />
          </Form.Group>
        </Col>
        <div className="auth-footer">
          <button
            type="button"
            className="auth-login-btn  "
            style={{ color: colors.primary }}
            onClick={handleResetPassword}
          >
            Reset
          </button>{" "}
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
