import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
// import './Outlethome.css';

function Regist({ onClose }) {
    const [userID, setUserID] = useState('');
    const navigate = useNavigate();
    const [isFormChanged, setIsFormChanged] = useState(false);

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

    const [checklistImages, setChecklistImages] = useState([]);
    const [crosscheckImages, setCrosscheckImages] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8081/api/users/me', { withCredentials: true })
            .then(response => {
                setUserID(response.data.id);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        axios
            .get('http://localhost:8081/api/drop/names', { withCredentials: true })
            .then(response => {
                const { uniqueNames } = response.data;
                const nameOptions = uniqueNames.map(name => ({ value: name, label: name }));
                setOptions(nameOptions);
            })
            .catch(error => {
                console.error('Error fetching names:', error);
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
        checklistImages.forEach((image, index) => {
            formData.append(`checklistImage`, image);
        });
        crosscheckImages.forEach((image, index) => {
            formData.append(`crosscheckImage`, image);
        });

        // Append user ID
        formData.append('userID', userID);

        axios
            .post('http://localhost:8081/api/logbook/Logbook', formData, { withCredentials: true })
            .then(() => {
                console.log("Logbook entry added successfully");
                navigate('/Home');
            })
            .catch(err => {
                console.error('Error adding logbook entry:', err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        setIsFormChanged(true);
    };

    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        setValues(prevState => ({
            ...prevState,
            [name]: selectedOption ? selectedOption.value : ''
        }));
        setIsFormChanged(true);
    };

    const handleFileChange = (e, setFiles) => {
        const files = Array.from(e.target.files);
        setFiles(files);
        setIsFormChanged(true);
    };

    const handleRadioChange = (e) => {
        setValues({ ...values, Response: e.target.value });
        setIsFormChanged(true);
    };

    const handleClose = () => {
        if (isFormChanged) {
            const confirmLeave = window.confirm('You have unsaved changes. Do you really want to leave?');
            if (confirmLeave) {
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <div className="template d-flex align-items-center 100-w sm:w-100">
            <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
                <form onSubmit={handleSubmit}>
                    <h2 className="formTitle pb-2 sm:pb-5">Register the vehicle</h2>
                    <div className="mb-3 row">
                        <label htmlFor="Vehicle_num" className="col-sm-4 col-form-label">Vehicle Number</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="Vehicle_num"
                                value={values.Vehicle_num}
                                className="form-control"
                                placeholder="Enter Vehicle Number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-2 row">
                        <label htmlFor="Vehicle_type" className="col-sm-4 col-form-label">Vehicle Type</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="Vehicle_type"
                                value={values.Vehicle_type}
                                className="form-control"
                                placeholder="Enter Vehicle Type"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Year" className="col-sm-4 col-form-label">Manufacture Year</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="Year"
                                value={values.Year}
                                className="form-control"
                                placeholder="Enter Manufacture Year"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Response" className="col-sm-4 col-form-label">TR/CheckList</label>
                        <div className="col-sm-8 d-flex align-items-center">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="inlineRadio1"
                                    value="Yes"
                                    checked={values.Response === 'Yes'}
                                    onChange={handleRadioChange}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="inlineRadio2"
                                    value="No"
                                    checked={values.Response === 'No'}
                                    onChange={handleRadioChange}
                                />
                                <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="checklistImage" className="col-sm-4 col-form-label">Checklist Image</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="file"
                                id="checklistImage"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleFileChange(e, setChecklistImages)}
                            />
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label htmlFor="Reference" className="col-sm-4 col-form-label">Reference</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="Reference"
                                value={values.Reference}
                                className="form-control"
                                placeholder="Enter Reference"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Fault" className="col-sm-4 col-form-label">Fault</label>
                        <div className="col-sm-8">
                            <textarea
                                name="Fault"
                                value={values.Fault}
                                rows="5"
                                className="form-control"
                                placeholder="Enter Fault"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Inspected" className="col-sm-4 col-form-label">Inspected By</label>
                        <div className="col-sm-8">
                            <CreatableSelect
                                name="Inspected"
                                value={options.find(option => option.value === values.Inspected)}
                                onChange={handleSelectChange}
                                options={options}
                                isClearable
                                isSearchable
                                placeholder="Select or type to add"
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Meter" className="col-sm-4 col-form-label">Meter Reading</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="Meter"
                                value={values.Meter}
                                className="form-control"
                                placeholder="Enter Meter Reading"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Location" className="col-sm-4 col-form-label">Division</label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                name="Location"
                                value={values.Location}
                                className="form-control"
                                placeholder="Enter Location"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="CrossCheckby" className="col-sm-4 col-form-label">CrossCheck By</label>
                        <div className="col-sm-8">
                            <CreatableSelect
                                name="CrossCheckby"
                                value={options.find(option => option.value === values.CrossCheckby)}
                                onChange={handleSelectChange}
                                options={options}
                                isClearable
                                isSearchable
                                placeholder="Select or type to add"
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="crosscheckImage" className="col-sm-4 col-form-label">CrossCheck Image</label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                type="file"
                                id="crosscheckImage"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleFileChange(e, setCrosscheckImages)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-secondary col-6" onClick={handleClose}>
                            cancel
                        </button>
                        <button type="submit" className="btn btn-primary col-6">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Regist;