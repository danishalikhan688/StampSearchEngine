import React from "react"; 
import   "./assets/login.css"; 
import {Link} from "react-router-dom"
export const Login = () => { 
  return (
    <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main   className="d-flex justify-content-center align-item-center padding-top">
            <div className="container">
              <div></div>
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4 login-heading">Login</h3></div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group"> 
                                        <input className="form-control py-4  auth-input" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control py-4  auth-input" id="inputPassword" type="password" placeholder="Enter password" />
                                    </div> 
                                    <div className="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
                                          <Link to="/" className="btn btn-primary auth-login-btn"  > Login </Link> 
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
