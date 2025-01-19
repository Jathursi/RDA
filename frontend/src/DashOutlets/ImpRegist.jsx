import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './dashout.css';
import CreatableSelect from 'react-select/creatable';

function ImpRegist({ onClose }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFormChanged, setIsFormChanged] = useState(false);

    const [values, setValues] = useState({
        Start_Date: '',
        Job_Assigned: '',
        Req_date: '',
        Req_off: '',
        Auth: '',
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isInitialSubmission, setIsInitialSubmission] = useState(true);
    const [implementMatData, setImplementMatData] = useState([]);
    const [options, setOptions] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const url = isInitialSubmission
            ? `http://localhost:8081/api/imp/Iminsert/${id}`
            : `http://localhost:8081/api/imp/Imput/${id}`;

        const method = isInitialSubmission ? 'post' : 'put';

        const formData = new FormData();
        formData.append('Start_Date', values.Start_Date);
        formData.append('Job_Assigned', values.Job_Assigned);
        formData.append('Req_date', values.Req_date);
        formData.append('Req_off', values.Req_off);
        formData.append('Auth', values.Auth);
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        axios({
            method,
            url,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(
                    isInitialSubmission
                        ? 'Logbook entry submitted successfully'
                        : 'Logbook entry updated successfully'
                );
                setIsInitialSubmission(false);
                fetchImplementMatData(); // Fetch the updated implementmat data
                navigate('/home');
                alert('Implement data submitted successfully');
            })
            .catch((err) => {
                console.error('Error with logbook entry:', err.message);
                alert(err.response?.data?.error || err.message);
            });
    };

    const fetchImplementMatData = useCallback(async () => {
        const token = localStorage.getItem('token');
        const url = `http://localhost:8081/api/imp/implementmat/${id}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, { headers });
            const data = response.data;

            // Group data by supplier
            const groupedData = data.reduce((acc, item) => {
                const { supplier } = item;
                if (!acc[supplier]) {
                    acc[supplier] = [];
                }
                acc[supplier].push(item);
                return acc;
            }, {});

            setImplementMatData(groupedData);
        } catch (error) {
            console.error('Error fetching implementmat data:', error.message);
        }
    }, [id]);

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

    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        setValues(prevState => ({
            ...prevState,
            [name]: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleIssuedChange = async (event, itemId) => {
        const { value } = event.target;
        const token = localStorage.getItem('token');
        const url = `http://localhost:8081/api/imp/updateIssued/${itemId}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            await axios.put(url, { issued: value }, { headers });
            fetchImplementMatData(); // Refresh the data after updating
        } catch (error) {
            console.error('Error updating issued value:', error.message);
        }
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

    useEffect(() => {
        const fetchImplement = async () => {
            const token = localStorage.getItem('token');
            const url = `http://localhost:8081/api/imp/Imget/${id}`;
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await axios.get(url, { headers });

                const { Start_Date, Job_Assigned, Req_date, Req_off, Auth } = response.data;

                const formattedDate = Start_Date.split('T')[0];
                const formattedDatereq = Req_date.split('T')[0];

                setValues({
                    Start_Date: formattedDate,
                    Job_Assigned,
                    Req_date: formattedDatereq,
                    Req_off,
                    Auth,
                });
                setIsInitialSubmission(false);
            } catch (error) {
                console.error('Error fetching implement:', error.message);
            }
        };

        fetchImplement();
        fetchImplementMatData(); // Fetch the implementmat data on component mount
    }, [id, fetchImplementMatData]);
  return (
    <div className='table-responsive mt-4 overflow-x-hidden'>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3 row'>
                                <label className='col-sm-2 col-form-label'>Start Date:</label>
                                <div className='col-sm-10'>
                                    <input
                                        type='date'
                                        className='form-control'
                                        name='Start_Date'
                                        value={values.Start_Date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='mb-3 row'>
                                <label className='col-sm-2 col-form-label'>Job Assigned:</label>
                                <div className='col-sm-10'>
                                    <CreatableSelect
                                        type='text'
                                        className='form-control-select'
                                        name='Job_Assigned'
                                        value={options.find(option => option.value === values.Job_Assigned)}
                                        onChange={handleSelectChange}
                                        options={options}
                                    />
                                </div>
                            </div>
                            <div className='mb-3 row'>
                                <label className='col-sm-2 col-form-label'>Requested Date:</label>
                                <div className='col-sm-10'>
                                    <input
                                        type='date'
                                        className='form-control'
                                        name='Req_date'
                                        value={values.Req_date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='mb-3 row'>
                                <label className='col-sm-2 col-form-label'>Requested Officer:</label>
                                <div className='col-sm-10'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Req_off'
                                        value={values.Req_off}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='mb-3 row'>
                                <label className='col-sm-2 col-form-label'>Authorized:</label>
                                <div className='col-sm-10'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Auth'
                                        value={values.Auth}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='mb-3 row'>
                                <label className='col-sm-2 col-form-label'>Images:</label>
                                <div className='col-sm-10'>
                                    <input className='form-control' type='file' multiple onChange={handleFileChange} />
                                </div>
                            </div>
                            {/* <div className='d-grid'>
                                
                            </div> */}
                            <div className="row">
                                <button type="button" className="btn btn-secondary col-6" onClick={handleClose}>
                                    cancel
                                </button>
                                <button type='submit' className='btn btn-primary'>
                                    {isInitialSubmission ? 'Submit' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
  )
}

export default ImpRegist