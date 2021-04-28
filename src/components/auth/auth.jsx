import React, { useState } from "react";
import "./assets/login.css";
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { globalVars } from '../../util/common';
export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        var response = await fetch(globalVars.urls.baseURL + '/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:
                JSON.stringify({ 'email': email, 'password': password })
        })

        var data = await response.json()
        window.localStorage.setItem("firstName", data.firstName)

        if (data.return === 'logged in') {
            history.push('/')
        }
        else {
            alert("Wrong email or password!")
        }
    }

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main className="d-flex justify-content-center align-item-center padding-top">
                    <div className="container">
                        <div></div>
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4 login-heading">Login</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input className="form-control py-4  auth-input" id="inputEmailAddress" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control py-4  auth-input" id="inputPassword" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                                            </div>
                                            <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
                                                <input type="submit" className="btn btn-primary auth-login-btn" value="Submit" />
                                            </div>
                                        </form>
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
export default Login;
