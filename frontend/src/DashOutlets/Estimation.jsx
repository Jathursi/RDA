import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import EstNav from '../EstCat/EstNav';
function Estimation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({ Date: '', Estimated: '', EstID: '' });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isInitialSubmission, setIsInitialSubmission] = useState(true);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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

    useEffect(() => {
    const fetchEstimate = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`http://localhost:8081/api/est/Estselect/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status !== 200) {
                throw new Error(`Error fetching estimate: ${response.statusText}`);
            }

            const { Date, Estimated } = response.data.estimate;

            // Convert the date to "YYYY-MM-DD" format
            const formattedDate = Date.split('T')[0]; // Split at "T" and take the first part

            setValues({ EstID: id, Date: formattedDate, Estimated });
            setIsInitialSubmission(false); // Switch to update mode
        } catch (error) {
            console.error('Error fetching estimate:', error);
            alert(error.message);
        }
    };

    fetchEstimate();
}, [id]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        selectedFiles.forEach((file) => formData.append('images', file));

        const token = localStorage.getItem('token');
        const url = isInitialSubmission
            ? `http://localhost:8081/api/est/Estinsert/${id}`
            : `http://localhost:8081/api/est/Estupdate/${id}`;
        const method = isInitialSubmission ? 'post' : 'put';

        try {
            await axios({
                method,
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(
                isInitialSubmission
                    ? 'Estimate created successfully'
                    : 'Estimate updated successfully'
            );
            navigate('/home');
        } catch (err) {
            console.error('Error submitting estimation:', err.response?.data || err.message);
            alert(err.response?.data?.error || err.message);
        }
    };

    return (
        <div className="template d-flex align-items-center 100-w sm:w-100">
            <div className="w-100 p-2 mx-1 sm:px-5 mx-5">
                <form onSubmit={handleSubmit}>
                    <h2 className="formTitle pb-2 sm:pb-5">Estimation</h2>
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
                            <input
                                type="text"
                                className="form-control"
                                name="Estimated"
                                value={values.Estimated}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Quotation Images:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="file" multiple onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            {isInitialSubmission ? 'Submit' : 'Update'}
                        </button>
                    </div>
                </form>
                {values.EstID && <EstNav values = {{EstID: values.EstID}} />}
            </div>
        </div>
    );
}

export default Estimation;
