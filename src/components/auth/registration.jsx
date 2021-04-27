import React from "react"; 
import   "./assets/login.css"; 
import {Link} from "react-router-dom"
export const Registration = () => { 
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
                                        <form>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputFirstName" type="text" placeholder="Enter first name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputLastName" type="text" placeholder="Enter last name" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control py-4 auth-input" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" />
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputPassword" type="password" placeholder="Enter password" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input className="form-control py-4 auth-input" id="inputConfirmPassword" type="password" placeholder="Confirm password" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-4 mb-0 d-flex">
                                            <Link to="/login" className="btn btn-primary auth-login-btn"  >  Create Account </Link> 
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
