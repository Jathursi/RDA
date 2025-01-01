import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

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
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form">
              <div classNameName="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Signup</h1>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="name">Full Name</label>
                  <input type="text"
                    name="first_Name"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter your name"
                    value={formData.first_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="role">Role</label>
                  <select
                    name="role"
                    className="form-control"
                    id="role"
                    aria-describedby="emailHelp"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                {formData.role === 'user' && (
                  <div className="form-group">
                    <label for="vehicleNumber">Vehicle Number</label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      id="vehicleNumber"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter Vehicle Number"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                {error && <p className="error-message">{error}</p>}
                <div className="col-md-12 text-center ">
                  <button type="submit" className="btn btn-block mybtn btn-primary tx-tfm">Signup</button>
                </div>
              </form>
              <div className="col-md-12 ">
                <div className="login-or">
                    <hr className="hr-or"/>
                    <span className="span-or">or</span>
                </div>
              </div>
              <div className="form-group">
                <p className="text-center">Already have an account? <a className="link" onClick={() => navigate('/')}>Login here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;