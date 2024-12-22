// lets/Regist.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Outlethome.css';

function Regist() {
    const [userID, setUserID] = useState('');
    const navigate = useNavigate();

    const [values, setValues] = useState({
        Vehicle_num: '',
        Year: '',
        Vehicle_type: '',
        Fault: '',
        Inspected: '',
        Meter: '',
        Location: '',
        Reference: '',
        Response: '',
        CrossCheckby: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8081/api/users/me', { withCredentials: true })
            .then(response => {
                setUserID(response.data.id);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append form values
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        // Append files
        if (document.getElementById('checklistImage').files[0]) {
            formData.append('checklistImage', document.getElementById('checklistImage').files[0]);
        }
        if (document.getElementById('crosscheckImage').files[0]) {
            formData.append('crosscheckImage', document.getElementById('crosscheckImage').files[0]);
        }

        // Append user ID
        formData.append('userID', userID);

        axios.post('http://localhost:8081/api/logbook/Logbook', formData, { withCredentials: true })
            .then(res => {
                console.log("Logbook entry added successfully");
                navigate('/Home');
            })
            .catch(err => {
                console.error('Error adding logbook entry:', err);
            });
    };

    const handleRadioChange = (e) => {
        setValues({ ...values, Response: e.target.value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected or captured file
        if (file) {
            console.log("File selected or captured:", file);
        }
    };

    return (
        <div className='formContainer'>
            <div className='formTitle'>Register the vehicle</div>
            <form className='form' onSubmit={handleSubmit}>
                <div className='formGroup'>
                    <label className='label'>Vehicle Number</label>
                    <input
                        type='text'
                        name='Vehicle_num'
                        value={values.Vehicle_num}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formGroup'>
                    <label className='label'>Manufacture year</label>
                    <input
                        type='text'
                        name='Year'
                        value={values.Year}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-Reg-rad'>
                    <div className='form-radio'>
                        <label className='label'>TR / Check List</label>
                        <div className='form-Reg-radio'>
                            <div className='radio'>
                                <input
                                    type='radio'
                                    name='Response'
                                    value='Yes'
                                    checked={values.Response === 'Yes'}
                                    onChange={handleRadioChange}
                                    required
                                />
                                <label>Yes</label>
                            </div>
                            <div className='radio'>
                                <input
                                    type='radio'
                                    name='Response'
                                    value='No'
                                    checked={values.Response === 'No'}
                                    onChange={handleRadioChange}
                                    required
                                />
                                <label>No</label>
                            </div>
                        </div>
                    </div>
                    {/* choose files or camera to capture */}
                    <div className='form-Reg-file'>
                        <label className='label'>Image of CheckList</label>
                        <div className='fileInputWrapper'>
                            {/* Dropdown or buttons for selection */}
                            <select
                                onChange={(e) => {
                                    const captureMode = e.target.value;
                                    if (captureMode) {
                                        document.getElementById("checklistImage").setAttribute("capture", captureMode === "capture" ? "environment" : "");
                                        document.getElementById("checklistImage").click();
                                    }
                                }}
                                className="fileModeSelect"
                            >
                                <option value="">Upload Image/file</option>
                                <option value="choose">Choose File</option>
                                <option value="capture">Capture Image</option>
                            </select>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                id="checklistImage"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='formGroup'>
                    <label className='label'>Reference No</label>
                    <input
                        type='text'
                        name='Reference'
                        value={values.Reference}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formGroup'>
                    <label className='label'>Vehicle Type</label>
                    <input
                        type='text'
                        name='Vehicle_type'
                        value={values.Vehicle_type}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formGroup'>
                    <label className='label'>Initial Fault</label>
                    <textarea
                        type='text'
                        name='Fault'
                        value={values.Fault}
                        className='textarea'
                        onChange={handleChange}
                        rows={5}
                        required
                    ></textarea>
                </div>
                <div className='formGroup'>
                    <label className='label'>Inspected By</label>
                    <input
                        type='text'
                        name='Inspected'
                        value={values.Inspected}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formGroup'>
                    <label className='label'>Meter Reading</label>
                    <input
                        type='text'
                        name='Meter'
                        value={values.Meter}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formGroup'>
                    <label className='label'>District (Vehicle From)</label>
                    <input
                        type='text'
                        name='Location'
                        value={values.Location}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='formGroup'>
                    <label className='label'>Logbook CrossChecked By</label>
                    <input
                        type='text'
                        name='CrossCheckby'
                        value={values.CrossCheckby}
                        className='input'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-Reg-filelogbook'>
                    <label className='label'>Image of CrossCheck</label>
                    <div className='fileInputWrapper'>
                        {/* Dropdown or buttons for selection */}
                        <select
                            onChange={(e) => {
                                const captureMode = e.target.value;
                                if (captureMode) {
                                    document.getElementById("crosscheckImage").setAttribute("capture", captureMode === "capture" ? "environment" : "");
                                    document.getElementById("crosscheckImage").click();
                                }
                            }}
                            className="fileModeSelect"
                        >
                            <option value="">Upload Image/file</option>
                            <option value="choose">Choose File</option>
                            <option value="capture">Capture Image</option>
                        </select>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="crosscheckImage"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <button className='submitButton' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Regist;