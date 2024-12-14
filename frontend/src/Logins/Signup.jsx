import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
        first_Name: '',
        email: '',
        password: '',
        role: ''
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
            const res = await axios.post('http://localhost:8081/api/users/signup', formData); // Adjust URL to match backend route
            alert("Signup successful, please login.");
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'An error occurred');
        }
    };
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
                <input type="text" id="name" placeholder="Enter your name"
                 required 
                  name="first_Name"
                  onChange={handleChange}
                 />
                </div>  
            </div>
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="email">Email</label>
                </div>
                <div className="form-group-input">
                <input type="email" id="email" 
                  onChange={handleChange}
                  name="email"
                placeholder="Enter your email" required />
                </div>
            </div>
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="password">Password</label>
                </div>
                <div className="form-group-input">
                <input type="password" id="password" 
                name="password"
                  onChange={handleChange}
                placeholder="Enter your password" required />
                </div>
            </div>
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="password">Conform Password</label>
                </div>
                <div className="form-group-input">
                <input type="password" id="password" 
                name="confirmPassword"
                onChange={handleConfirmPasswordChange}
                placeholder="Enter your password" required />
                </div>
            </div>
            {/* select role */}
            <div className="form-group">
                <div className="form-group-lable">
                <label htmlFor="role">Role</label>
                </div>
                <div className="form-group-select">
                    <select id="role" 
                    name="role"
                    onChange={handleChange}
                    required>
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
