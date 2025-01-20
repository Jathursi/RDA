import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Auth.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
const Signup = () => {
  const [formData, setFormData] = useState({
    first_Name: '',
    email: '',
    password: '',
    role: '',
    vehicleNumber: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Data being sent:', formData);  // Log the data being sent
      await axios.post('http://localhost:8081/api/users/signup', formData); // Adjust URL to match backend route
      alert("Signup successful, please login.");
      setError(''); // Clear error message on successful signup
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    // <div className="loginbody">
    //   <div className="auth-container">
    //     <div className="auth-box">
    //       <h1 className="auth-title">Sign Up</h1>
    //       <form className="auth-form" onSubmit={handleSubmit}>
    //         <div className="form-group">
    //           <div className="form-group-lable">
    //             <label htmlFor="name">Name</label>
    //           </div>
    //           <div className="form-group-input">
    //             <input type="text" id="name" placeholder="Enter your name"
    //               required
    //               name="first_Name"
    //               onChange={handleChange}
    //             />
    //           </div>
    //         </div>
    //         <div className="form-group">
    //           <div className="form-group-lable">
    //             <label htmlFor="email">Email</label>
    //           </div>
    //           <div className="form-group-input">
    //             <input type="email" id="email"
    //               onChange={handleChange}
    //               name="email"
    //               placeholder="Enter your email" required />
    //           </div>
    //         </div>
    //         <div className="form-group">
    //           <div className="form-group-lable">
    //             <label htmlFor="password">Password</label>
    //           </div>
    //           <div className="form-group-input">
    //             <input type="password" id="password"
    //               name="password"
    //               onChange={handleChange}
    //               placeholder="Enter your password" required />
    //           </div>
    //         </div>
    //         <div className="form-group">
    //           <div className="form-group-lable">
    //             <label htmlFor="password">Confirm Password</label>
    //           </div>
    //           <div className="form-group-input">
    //             <input type="password" id="password"
    //               name="confirmPassword"
    //               onChange={handleConfirmPasswordChange}
    //               placeholder="Enter your password" required />
    //           </div>
    //         </div>
    //         {/* select role */}
    //         <div className="form-group">
    //           <div className="form-group-lable">
    //             <label htmlFor="role">Role</label>
    //           </div>
    //           <div className="form-group-select">
    //             <select id="role"
    //               name="role"
    //               onChange={handleChange}
    //               required>
    //               <option defaultValue="Select Role">Select Role</option>
    //               <option value="admin">Admin</option>
    //               <option value="user">User</option>
    //             </select>
    //           </div>
    //         </div>
    //         {/* vehicle number input */}
    //         {formData.role === 'user' && (
    //           <div className="form-group">
    //             <div className="form-group-lable">
    //               <label htmlFor="vehicleNumber">Vehicle Number</label>
    //             </div>
    //             <div className="form-group-input">
    //               <input type="text" id="vehicleNumber"
    //                 name="vehicleNumber"
    //                 onChange={handleChange}
    //                 placeholder="Enter your vehicle number" required />
    //             </div>
    //           </div>
    //         )}
    //         {error && <p className="error-message">{error}</p>}
    //         <div className="form-btn">
    //           <button type="submit" className="auth-button">Sign Up</button>
    //         </div>
    //         <p className="auth-switch">
    //           Already have an account? <a href="/login">Login</a>
    //         </p>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    // <div className="container mt-2">
    //   <div className="row">
    //     <div className="col-md-5 mx-auto">
    //       <div id="first">
    //         <div className="myform form">
    //           <div classNameName="logo mb-3">
    //             <div className="col-md-12 text-center">
    //               <h1>Signup</h1>
    //             </div>
    //           </div>
    //           <form onSubmit={handleSubmit}>
    //             <div className="form-group">
    //               <label for="name">Full Name</label>
    //               <input type="text"
    //                 name="first_Name"
    //                 className="form-control"
    //                 id="name"
    //                 aria-describedby="emailHelp"
    //                 placeholder="Enter your name"
    //                 value={formData.first_Name}
    //                 onChange={handleChange}
    //                 required
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label for="exampleInputEmail1">Email address</label>
    //               <input type="email"
    //                 name="email"
    //                 className="form-control"
    //                 id="email"
    //                 aria-describedby="emailHelp"
    //                 placeholder="Enter email"
    //                 value={formData.email}
    //                 onChange={handleChange}
    //                 required
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label for="exampleInputEmail1">Password</label>
    //               <input
    //                 type="password"
    //                 name="password"
    //                 id="password"
    //                 className="form-control"
    //                 aria-describedby="emailHelp"
    //                 placeholder="Enter Password"
    //                 value={formData.password}
    //                 onChange={handleChange}
    //                 required
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label for="exampleInputEmail1">Confirm Password</label>
    //               <input
    //                 type="password"
    //                 name="confirmPassword"
    //                 id="confirmPassword"
    //                 className="form-control"
    //                 aria-describedby="emailHelp"
    //                 placeholder="Confirm Password"
    //                 value={confirmPassword}
    //                 onChange={handleConfirmPasswordChange}
    //                 required
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label for="role">Role</label>
    //               <select
    //                 name="role"
    //                 className="form-control"
    //                 id="role"
    //                 aria-describedby="emailHelp"
    //                 value={formData.role}
    //                 onChange={handleChange}
    //                 required
    //               >
    //                 <option value="">Select Role</option>
    //                 <option value="admin">Admin</option>
    //                 <option value="user">User</option>
    //               </select>
    //             </div>
    //             {formData.role === 'user' && (
    //               <div className="form-group">
    //                 <label for="vehicleNumber">Vehicle Number</label>
    //                 <input
    //                   type="text"
    //                   name="vehicleNumber"
    //                   id="vehicleNumber"
    //                   className="form-control"
    //                   aria-describedby="emailHelp"
    //                   placeholder="Enter Vehicle Number"
    //                   value={formData.vehicleNumber}
    //                   onChange={handleChange}
    //                   required
    //                 />
    //               </div>
    //             )}
    //             {error && <p className="error-message">{error}</p>}
    //             <div className="col-md-12 text-center ">
    //               <button type="submit" className="btn btn-block mybtn btn-primary tx-tfm">Signup</button>
    //             </div>
    //           </form>
    //           <div className="col-md-12 ">
    //             <div className="login-or">
    //                 <hr className="hr-or"/>
    //                 <span className="span-or">or</span>
    //             </div>
    //           </div>
    //           <div className="form-group">
    //             <p className="text-center">Already have an account? <a className="link" onClick={() => navigate('/')}>Login here</a></p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section className="hero-section full-screen gray-light-bg ">
        <div className="container-fluid p-0">
            <div className="row min-h-[100vh] h-auto p-0">
                <div className="left-bg col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">
                    <div className="bg-cover d-flex align-items-center justify-content-center vh-100 ml-n3" >
                        {/* <img src="assets/img/login-bg.jpg" alt="Login" className="img-fluid" /> */}
                        <div className="position-absolute login-signup-content">
                            <div className="content2 position-relative text-white col-md-12 col-lg7">
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
                            Signup
                        </h1>
                        <p className="text-center mb-5">
                            Welcome back! Please login to your account.
                        </p>
                        <form className="login-signup-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="pb-1">Full Name</label>
                                <div className="input-group input-group-merge">
                                    <div className="input-icon">
                                        <span className="ti-user color-primary">
                                            <MdOutlineMailOutline />
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Enter your name"
                                        value={formData.first_Name}
                                        name="first_Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="pb-1">Email Address</label>
                                <div className="input-group input-group-merge">
                                    <div className="input-icon">
                                        <span className="ti-user color-primary">
                                            <MdOutlineMailOutline />
                                        </span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Enter your email" 
                                        value={formData.email}
                                        name="email"
                                        onChange={handleChange}
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
                                        value={formData.password}
                                        name="password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="pb-1">Confirm Password</label>
                                <div className="input-group input-group-merge">
                                    <div className="input-icon">
                                        <span className="ti-lock color-primary">
                                            <MdLockOpen />
                                        </span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="Confirm your password" 
                                        value={confirmPassword}
                                        name="confirmPassword"
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="pb-1">Role</label>
                                <div className="input-group input-group-merge">
                                    <div className="input-icon">
                                        <span className="ti-lock color-primary">
                                            <MdLockOpen />
                                        </span>
                                    </div>
                                    <select className="form-control" 
                                        value={formData.role}
                                        name="role"
                                        onChange={handleChange}
                                        required
                                    >
                                        <option defaultValue="Select Role">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                            </div>
                            {formData.role === 'user' && (
                                <div className="form-group">
                                    <label className="pb-1">Vehicle Number</label>
                                    <div className="input-group input-group-merge">
                                        <div className="input-icon">
                                            <span className="ti-lock color-primary">
                                                <MdLockOpen />
                                            </span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Enter your vehicle number" 
                                            value={formData.vehicleNumber}
                                            name="vehicleNumber"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                            {error && <p className="error-message">{error}</p>}

                            <button type="submit" style={{backgroundColor: '#2727b6'}} className="btn solid-btn rounded text-white btn-lg btn-block">
                                Signup
                            </button>
                            <div className="text-center">
                                <small className="text-muted text-center">
                                    Already have an account? <Link to={'/'}>login</Link>
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

export default Signup;