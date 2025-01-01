import React, {useState} from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const Logins = () => {
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8081/api/users/login', { email, password });
            
            if (res && res.data) {
                localStorage.setItem('role', res.data.role);
                // Navigate based on the user's role
                if (res.data.role === 'admin' || res.data.role === 'Superadmin') {
                    navigate('/home');
                } else {
                    navigate('/user');
                }
            } else {
                console.error('Login response is undefined or has no data');
                alert('Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            if (err.response && err.response.data) {
                alert(err.response.data.error);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };
  return (
    <div className="container mt-2">
        <div className="row">
            <div className="col-md-5 mx-auto">
                <div id="first">
                    <div className="myform form">
                        <div classNameName="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h1>Login</h1>
                            </div>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                              <label for="exampleInputEmail1">Email address</label>
                              <input type="email" 
                                    name="email"  
                                    className="form-control" 
                                    id="email" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    required
                                />
                            </div>
                           <div className="form-group">
                              <label for="exampleInputEmail1">Password</label>
                              <input 
                                type="password" 
                                name="password" 
                                id="password"  
                                className="form-control" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                required
                            />
                           </div>
                           <div className="form-group">
                              <p className="" onClick={() => navigate('/forgotpassword')}>Forgot password?</p>
                           </div>
                           {/* <div className="form-group">
                              <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                           </div> */}
                           <div className="col-md-12 text-center ">
                              <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                           </div>
                           <div className="col-md-12 ">
                              <div className="login-or">
                                 <hr className="hr-or"/>
                                 <span className="span-or">or</span>
                              </div>
                           </div>
                           {/* <div className="col-md-12 mb-3">
                              <p className="text-center">
                                 <a href="javascript:void();" className="google btn mybtn"><i className="fa fa-google-plus">
                                 </i> Signup using Google
                                 </a>
                              </p>
                           </div> */}
                           <div className="form-group">
                              <p className="text-center">Don't have account? <a className="link" onClick={() => navigate('/signup')}>Sign up here</a></p>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* <div classNameName="">
            <h1 className="auth-title">Login</h1>
            <form className="auth-form" onSubmit={handleLogin}>
                
            <div className="form-group">
                <div className="form-group-lable">
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-group-input">
                    <input type="email" id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your email" required 
                    />
                </div>
            </div>
                <div className="form-group">
                    <div className="form-group-lable">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-group-input">
                        <input type="password" id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your password" required 
                        />
                    </div>
                    <div className="forgot-pass">
                        <Link to={'/forgotpassword'}>
                            <button className="btn frgt-pass" type="button">Forgot Password?</button>
                        </Link>
                    </div>
                </div>
                <div className="form-btn">
                    <button type="submit" className="auth-button" >Login</button>
                </div>
            <p className="auth-switch">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
            </form>
        </div> */}
    </div>
  );
};

export default Logins;
