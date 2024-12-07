import React from "react";
import "./Auth.css";

const Signup = () => {
  return (
    <div className="loginbody">
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign Up</h1>
        <form className="auth-form">
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="name">Name</label>
                </div>
                <div className="form-group-input">
                <input type="text" id="name" placeholder="Enter your name" required />
                </div>  
            </div>
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="email">Email</label>
                </div>
                <div className="form-group-input">
                <input type="email" id="email" placeholder="Enter your email" required />
                </div>
            </div>
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="password">Password</label>
                </div>
                <div className="form-group-input">
                <input type="password" id="password" placeholder="Enter your password" required />
                </div>
            </div>
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="password">Conform Password</label>
                </div>
                <div className="form-group-input">
                <input type="password" id="password" placeholder="Enter your password" required />
                </div>
            </div>
            {/* select role */}
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="role">Role</label>
                </div>
                <div className="form-group-select">
                    <select id="role" required>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
            </div>
            <div className="form-btn">
                <button type="submit" className="auth-button">Sign Up</button>
            </div>
          <p className="auth-switch">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
