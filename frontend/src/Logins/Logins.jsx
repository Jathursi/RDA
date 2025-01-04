import React, {useState} from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
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
    // <div className="container mt-2">
    //     <div className="row">
    //         <div className="col-md-5 mx-auto">
    //             <div id="first">
    //                 <div className="myform form">
    //                     <div classNameName="logo mb-3">
    //                         <div className="col-md-12 text-center">
    //                             <h1>Login</h1>
    //                         </div>
    //                     </div>
    //                     <form onSubmit={handleLogin}>
    //                         <div className="form-group">
    //                           <label for="exampleInputEmail1">Email address</label>
    //                           <input type="email" 
    //                                 name="email"  
    //                                 className="form-control" 
    //                                 id="email" 
    //                                 aria-describedby="emailHelp" 
    //                                 placeholder="Enter email"
    //                                 value={email}
    //                                 onChange={(e) => setEmail(e.target.value)}
    //                                 onKeyDown={handleKeyDown}
    //                                 required
    //                             />
    //                         </div>
    //                        <div className="form-group">
    //                           <label for="exampleInputEmail1">Password</label>
    //                           <input 
    //                             type="password" 
    //                             name="password" 
    //                             id="password"  
    //                             className="form-control" 
    //                             aria-describedby="emailHelp" 
    //                             placeholder="Enter Password"
    //                             value={password}
    //                             onChange={(e) => setPassword(e.target.value)}
    //                             onKeyDown={handleKeyDown}
    //                             required
    //                         />
    //                        </div>
    //                        <div className="form-group">
    //                           <p className="" onClick={() => navigate('/forgotpassword')}>Forgot password?</p>
    //                        </div>
    //                        {/* <div className="form-group">
    //                           <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
    //                        </div> */}
    //                        <div className="col-md-12 text-center ">
    //                           <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
    //                        </div>
    //                        <div className="col-md-12 ">
    //                           <div className="login-or">
    //                              <hr className="hr-or"/>
    //                              <span className="span-or">or</span>
    //                           </div>
    //                        </div>
    //                        {/* <div className="col-md-12 mb-3">
    //                           <p className="text-center">
    //                              <a href="javascript:void();" className="google btn mybtn"><i className="fa fa-google-plus">
    //                              </i> Signup using Google
    //                              </a>
    //                           </p>
    //                        </div> */}
    //                        <div className="form-group">
    //                           <p className="text-center">Don't have account? <a className="link" onClick={() => navigate('/signup')}>Sign up here</a></p>
    //                        </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     {/* <div classNameName="">
    //         <h1 className="auth-title">Login</h1>
    //         <form className="auth-form" onSubmit={handleLogin}>
                
    //         <div className="form-group">
    //             <div className="form-group-lable">
    //                 <label htmlFor="email">Email</label>
    //             </div>
    //             <div className="form-group-input">
    //                 <input type="email" id="email" 
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                     onKeyDown={handleKeyDown}
    //                     placeholder="Enter your email" required 
    //                 />
    //             </div>
    //         </div>
    //             <div className="form-group">
    //                 <div className="form-group-lable">
    //                     <label htmlFor="password">Password</label>
    //                 </div>
    //                 <div className="form-group-input">
    //                     <input type="password" id="password" 
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         onKeyDown={handleKeyDown}
    //                         placeholder="Enter your password" required 
    //                     />
    //                 </div>
    //                 <div className="forgot-pass">
    //                     <Link to={'/forgotpassword'}>
    //                         <button className="btn frgt-pass" type="button">Forgot Password?</button>
    //                     </Link>
    //                 </div>
    //             </div>
    //             <div className="form-btn">
    //                 <button type="submit" className="auth-button" >Login</button>
    //             </div>
    //         <p className="auth-switch">
    //             Don't have an account? <a href="/signup">Sign up</a>
    //         </p>
    //         </form>
    //     </div> */}
    // </div>
    <section className="hero-section full-screen gray-light-bg ">
        <div className="container-fluid p-0">
            <div className="row align-items-center justify-content-center p-0">
                <div className="left-bg col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
                    <div className="bg-cover d-flex align-items-center justify-content-center vh-100 ml-n3" >
                        {/* <img src="assets/img/login-bg.jpg" alt="Login" className="img-fluid" /> */}
                        <div className="position-absolute login-signup-content">
                            <div className="content position-relative text-white col-md-12 col-lg7">
                                <h1 className="text-white">
                                    Welcome to <span className="font-weight-bolder">BACK.</span>
                                </h1>
                                <p className="h5">
                                    Now you can login to your account and start Exploring!.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-5 col-lg-6 col-xl-4 px-lg-6 my-5">
                    <div className="login-signup-wrap px-5 p-x-lg-5 my-5">
                        <h1 className="text-center mb-1">
                            Login
                        </h1>
                        <p className="text-center mb-5">
                            Welcome back! Please login to your account.
                        </p>
                        <form className="login-signup-form" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label className="pb-1">Email Address</label>
                                {/* <input type="email" className="form-control" placeholder="  Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    required
                                /> */}
                                <div className="input-group input-group-merge">
                                    <div className="input-icon">
                                        <span className="ti-user color-primary">
                                            <MdOutlineMailOutline />
                                        </span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Enter your email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        required
                                    />
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <div className="d-flex justify-content-between">
                                    <label className="pb-1">Password</label>
                                    <Link to={'/forgotpassword'} className="font-xs color-muted">Forgot Password?</Link>
                                </div>
                                <div className="input-group input-group-merge">
                                    <div className="input-icon">
                                        <span className="ti-lock color-primary">
                                            <MdLockOpen />
                                        </span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Enter your password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" style={{backgroundColor: '#2727b6'}} className="btn solid-btn rounded text-white btn-lg btn-block">
                                Login
                            </button>
                            <div className="text-center">
                                <small className="text-muted text-center">
                                    Don't have an account yet? <Link to={'/signup'}>Sign Up</Link>
                                </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Logins;
