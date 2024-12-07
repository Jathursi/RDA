import React from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Logins = () => {
    const navigate = useNavigate();
  return (
    <div className="loginbody">
        <div className="auth-container">
        <div className="auth-box">
            <h1 className="auth-title">Login</h1>
            <form className="auth-form">
                
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
                <div className="form-btn">
                    <button type="submit" className="auth-button" onClick={() => navigate('/home') }>Login</button>
                </div>
            <p className="auth-switch">
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
            </form>
        </div>
        </div>
    </div>
  );
};

export default Logins;
