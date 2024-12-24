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
        <div className='template d-flex align-items-center 100-w  sm:w-100 '>
            <div className='w-100 p-2 mx-1 sm:px-5 mx-5'>
            <form className='' onSubmit={handleSubmit}>
                <h2 className='formTitle pb-2 sm:pb-5'>Register the vehicle</h2>
                <div className='mb-3 row'>
                    <label htmlFor='Vehicle_num' className="col-sm-2 col-form-label">Vehicle Number</label>
                    <div className="col-sm-10">
                        <input
                            type='text'
                            name='Vehicle_num'
                            value={values.Vehicle_num}
                            className='form-control'
                            placeholder='Enter Vehicle Number'
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='mb-2 row'>
                    <label htmlFor='Vehicle_type' className="col-sm-2 col-form-label">Vehicle Type</label>
                    <div className="col-sm-10">
                    <input
                        type='text'
                        name='Vehicle_type'
                        value={values.Vehicle_type}
                        className='form-control'
                        placeholder='Enter Vehicle Type'
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='Year' className="col-sm-2 col-form-label">Manufacture year</label>
                    <div className="col-sm-10">
                    <input
                        type='text'
                        name='Year'
                        value={values.Year}
                        className='form-control'
                        placeholder='Enter Manufacture Year'
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='Response' className="col-sm-2 col-form-label">TR/CheckList</label>
                    <div className="col-sm-10 d-flex align-items-center">
                        <div className="form-check form-check-inline ">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                            checked={values.Response === 'Yes'}
                            onChange={handleRadioChange}
                            value="Yes"/>
                            <label className="form-check-label" for="inlineCheckbox1">Yes</label>
                        </div>
                        <div className="form-check form-check-inline ">
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                            checked={values.Response === 'No'}
                            onChange={handleRadioChange}
                            value="No"/>
                            <label className="form-check-label" for="inlineCheckbox2">No</label>
                        </div>
                    </div>
                    
                    {/* <div className='row g-0'>
                        <input
                            type='radio'
                            name='Response'
                            value='No'
                            checked={values.Response === 'No'}
                            onChange={handleRadioChange}
                            required
                        />
                        <label>No</label>
                    </div> */}
                    {/* choose files or camera to capture */}
                    {/* <div className='form-Reg-file'>
                        <label className='label'>Image of CheckList</label>
                        <div className='fileInputWrapper'>
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

                            <input
                                type="file"
                                id="checklistImage"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div> */}
                </div>
                <div className='mb-3 row'>
                        <label htmlFor='checklistImage' className="col-sm-2 col-form-label">CrossCheck Image</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="file" id="crosscheckImage"  onClick={handleFileChange} multiple/>
                        </div>
                </div>
                <div className='mb-2 row'>
                    <label htmlFor='Reference' className="col-sm-2 col-form-label">Reference</label>
                    <div className="col-sm-10">
                    <input
                        type='text'
                        name='Reference'
                        value={values.Reference}
                        className='form-control'
                        placeholder='Enter Reference'
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                
                <div className='mb-3 row'>
                    <label htmlFor='Fault' className="col-sm-2 col-form-label">Fault</label>
                    <div className="col-sm-10">
                    <textarea
                        type='text'
                        name='Fault'
                        value={values.Fault}
                        rows="5"
                        className='form-control'
                        placeholder='Enter Fault'
                        onChange={handleChange}
                        required
                    ></textarea>
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='Inspected' className="col-sm-2 col-form-label">Inspected By</label>
                    <div className="col-sm-10">
                    <input
                        type='text'
                        name='Inspected'
                        value={values.Inspected}
                        className='form-control'
                        placeholder='Enter Inspected By'
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='Meter' className="col-sm-2 col-form-label">Meter Reading</label>
                    <div className="col-sm-10">
                    <input
                        type='text'
                        name='Meter'
                        value={values.Meter}
                        className='form-control'
                        placeholder='Enter Meter Reading'
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='Location' className="col-sm-2 col-form-label">Location</label>
                    <div className="col-sm-10">
                    <input
                        type='text'
                        name='Location'
                        value={values.Location}
                        className='form-control'
                        placeholder='Enter Location'
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='CrossCheckby' className="col-sm-2 col-form-label">CrossCheck By</label>
                    <div className="col-sm-10">
                    <input
                        type='text'
                        name='CrossCheckby'
                        value={values.CrossCheckby}
                        className='form-control'
                        placeholder='Enter CrossCheck By'
                        onChange={handleChange}
                        required
                    />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor='CrossCheckImage' className="col-sm-2 col-form-label">CrossCheck Image</label>
                    <div className="col-sm-10">
                        <input class="form-control" type="file" id="crosscheckImage"  onClick={handleFileChange} multiple/>
                    </div>
                </div>
                <div className='d-grid mt-4'>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default Regist;