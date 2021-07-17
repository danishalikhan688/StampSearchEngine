import React, { useState } from "react";
import { useEffect } from "react";
import "./assets/login.css";
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { globalVars } from '../../util/common';
export const Registration = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        const checkAuth = async () => {

            var response = await fetch(globalVars.urls.baseURL + '/checkAuth', {credentials:'include'})
            var data = await response.json()

            if (data.return === 'already authenticated') {
                history.push('/')
            }
        }

        checkAuth()

    }, [])

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (password === confirmedPassword) {

            var response = await fetch(globalVars.urls.baseURL + '/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body:
                    JSON.stringify({ 'email': email, 'firstName': firstName, 'lastName': lastName, 'password': password })

            })

            var data = await response.json()
            if (data.return === 'email already present') {
                alert('Given email is already registered!')
            }
            else {
                alert("Registered!")
                history.push('/login')
            }
        }
        else {
            alert("Passwords do not match!")
        }
    }

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main className="padding-top">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5 ">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4 login-heading">Create Account</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputFirstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter first name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputLastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter last name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control py-4 auth-input" id="inputEmailAddress" type="email" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputPassword" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputConfirmPassword" type="password" value={confirmedPassword} onChange={e => setConfirmedPassword(e.target.value)} placeholder="Confirm password" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-4 mb-0 d-flex">
                                                <input type="submit" className="btn btn-primary auth-login-btn" value="Submit" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center ">
                                        <div className="small">    <Link to="/login" className=" "  >  Have an account? Go to login   </Link> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
export default Registration;
