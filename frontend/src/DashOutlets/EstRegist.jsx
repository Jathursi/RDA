import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

function EstRegist({ onClose, estimate }) {
    const { id: logbookID } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({ Date: '', Estimated: '', EstID: '' });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [options, setOptions] = useState([]);
    const [isFormChanged, setIsFormChanged] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8081/api/drop/names', { withCredentials: true })
            .then(response => {
                const { uniqueNames } = response.data;
                const nameOptions = uniqueNames.map(name => ({ value: name, label: name }));
                setOptions(nameOptions);
            })
            .catch(error => {
                console.error('Error fetching names:', error);
            });
    }, []);

    useEffect(() => {
        if (estimate) {
            setValues({
                Date: estimate.Date.split('T')[0],
                Estimated: estimate.Estimated,
                EstID: estimate.id
            });
        }
    }, [estimate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        selectedFiles.forEach((file) => formData.append('images', file));

        const token = localStorage.getItem('token');
        const url = estimate
            ? `http://localhost:8081/api/est/Estupdate/${estimate.id}`
            : `http://localhost:8081/api/est/Estinsert/${logbookID}`;

        try {
            await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(`Estimate ${estimate ? 'updated' : 'created'} successfully`);
            navigate('/home');
        } catch (err) {
            console.error('Error submitting estimation:', err.response?.data || err.message);
            alert(err.response?.data?.error || err.message);
        }
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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(
            (file) => file.size <= 100 * 1024 * 1024 && file.type.startsWith('image/')
        );
        if (validFiles.length !== files.length) {
            alert('Some files are invalid (too large or not an image).');
        }
        setSelectedFiles(validFiles);
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
                    <h2 className="formTitle pb-2 sm:pb-5">Estimation {values.EstID}</h2>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Date:</label>
                        <div className="col-sm-10">
                            <input
                                type="date"
                                className="form-control"
                                name="Date"
                                value={values.Date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Estimated by:</label>
                        <div className="col-sm-10">
                            <CreatableSelect
                                name="Estimated"
                                value={options.find(option => option.value === values.Estimated)}
                                onChange={handleSelectChange}
                                options={options}
                                isClearable
                                isSearchable
                                className='input'
                                placeholder="Select or type to add"
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Vehicle condition Images:</label>
                        <div className="col-sm-10">
                            <input className="input" type="file" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-secondary col-6" onClick={handleClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary col-6">
                            {estimate ? 'Update' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EstRegist;